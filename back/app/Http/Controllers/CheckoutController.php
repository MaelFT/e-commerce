<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Stripe\StripeClient;
use Stripe\Webhook;

class CheckoutController extends Controller
{
    private StripeClient $stripe;

    public function __construct()
    {
        $this->stripe = new StripeClient(config('services.stripe.secret'));
    }

    public function createSession(Request $request): JsonResponse
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1|max:10',
            'shipping_address' => 'required|string|max:255',
            'shipping_city' => 'required|string|max:255',
            'shipping_postal_code' => 'required|string|max:20',
            'shipping_country' => 'required|string|max:255',
        ]);

        $items = $request->input('items');
        $productIds = collect($items)->pluck('product_id');
        $products = Product::whereIn('id', $productIds)->get()->keyBy('id');

        // Verify stock
        foreach ($items as $item) {
            $product = $products[$item['product_id']] ?? null;
            if (!$product || $product->stock < $item['quantity']) {
                return response()->json([
                    'message' => "Stock insuffisant pour « {$product?->name} ».",
                ], 422);
            }
        }

        $lineItems = [];
        $subtotalCents = 0;

        foreach ($items as $item) {
            $product = $products[$item['product_id']];
            $unitAmount = (int) round($product->price * 100);
            $subtotalCents += $unitAmount * $item['quantity'];

            $lineItems[] = [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $product->name,
                    ],
                    'unit_amount' => $unitAmount,
                ],
                'quantity' => $item['quantity'],
            ];
        }

        $shippingCents = $subtotalCents > 10000 ? 0 : 1500; // Free above 100€

        $cartPayload = collect($items)->map(fn($i) => [
            'p' => $i['product_id'],
            'q' => $i['quantity'],
        ])->toJson();

        $addressPayload = json_encode([
            'address' => $request->input('shipping_address'),
            'city' => $request->input('shipping_city'),
            'postal_code' => $request->input('shipping_postal_code'),
            'country' => $request->input('shipping_country'),
        ]);

        $session = $this->stripe->checkout->sessions->create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => config('services.stripe.frontend_url') . '/checkout/success?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => config('services.stripe.frontend_url') . '/cart',
            'customer_email' => $request->user()->email,
            'metadata' => [
                'user_id' => (string) $request->user()->id,
                'cart' => $cartPayload,
                'shipping' => $addressPayload,
            ],
            'shipping_options' => [
                [
                    'shipping_rate_data' => [
                        'type' => 'fixed_amount',
                        'fixed_amount' => [
                            'amount' => $shippingCents,
                            'currency' => 'eur',
                        ],
                        'display_name' => $shippingCents === 0 ? 'Livraison gratuite' : 'Livraison standard',
                    ],
                ],
            ],
        ]);

        return response()->json(['url' => $session->url]);
    }

    public function webhook(Request $request): JsonResponse
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $webhookSecret = config('services.stripe.webhook_secret');

        if ($webhookSecret) {
            try {
                $event = Webhook::constructEvent($payload, $sigHeader, $webhookSecret);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Invalid signature'], 400);
            }
        } else {
            $event = json_decode($payload);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;
            $this->fulfillOrder($session);
        }

        return response()->json(['status' => 'ok']);
    }

    private function fulfillOrder(object $session): void
    {
        // Avoid duplicate processing
        if (Order::where('stripe_session_id', $session->id)->exists()) {
            return;
        }

        $metadata = $session->metadata;

        // Handle metadata access (works for both StripeObject and stdClass)
        $cartRaw = is_object($metadata) && method_exists($metadata, 'offsetGet')
            ? $metadata->cart
            : ($metadata->cart ?? $metadata['cart'] ?? '[]');
        $cart = json_decode(is_string($cartRaw) ? $cartRaw : json_encode($cartRaw), true);

        $userId = is_object($metadata) && method_exists($metadata, 'offsetGet')
            ? $metadata->user_id
            : ($metadata->user_id ?? $metadata['user_id'] ?? null);

        $shippingRaw = is_object($metadata) && method_exists($metadata, 'offsetGet')
            ? ($metadata->shipping ?? null)
            : ($metadata->shipping ?? $metadata['shipping'] ?? null);

        $productIds = collect($cart)->pluck('p');
        $products = Product::whereIn('id', $productIds)->get()->keyBy('id');

        $subtotalCents = 0;
        $orderItems = [];

        foreach ($cart as $item) {
            $product = $products[$item['p']];
            $unitCents = (int) round($product->price * 100);
            $qty = $item['q'];
            $subtotalCents += $unitCents * $qty;

            $orderItems[] = [
                'product_id' => $product->id,
                'product_name' => $product->name,
                'unit_price' => $unitCents,
                'quantity' => $qty,
            ];

            // Decrement stock
            $product->decrement('stock', $qty);
        }

        $shippingCents = $session->total_details->amount_shipping ?? 0;

        // Extract shipping address from metadata
        $shippingData = [];
        if ($shippingRaw) {
            $shippingJson = is_string($shippingRaw) ? $shippingRaw : json_encode($shippingRaw);
            $shippingData = json_decode($shippingJson, true) ?? [];
        }

        $order = Order::create([
            'user_id' => $userId,
            'stripe_session_id' => $session->id,
            'stripe_payment_intent' => $session->payment_intent,
            'status' => 'paid',
            'subtotal' => $subtotalCents,
            'shipping' => $shippingCents,
            'total' => $session->amount_total,
            'shipping_address' => $shippingData['address'] ?? null,
            'shipping_city' => $shippingData['city'] ?? null,
            'shipping_postal_code' => $shippingData['postal_code'] ?? null,
            'shipping_country' => $shippingData['country'] ?? null,
        ]);

        foreach ($orderItems as $item) {
            $order->items()->create($item);
        }
    }

    /**
     * Confirm a checkout session (fallback for dev without webhooks).
     * The frontend calls this after Stripe redirects back.
     */
    public function confirmSession(Request $request): JsonResponse
    {
        $request->validate([
            'session_id' => 'required|string',
        ]);

        $sessionId = $request->input('session_id');

        // Check if already processed
        $existing = Order::where('stripe_session_id', $sessionId)->with('items')->first();
        if ($existing) {
            return response()->json(['order' => $existing]);
        }

        try {
            $session = $this->stripe->checkout->sessions->retrieve($sessionId, ['expand' => ['total_details']]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Session Stripe introuvable.'], 404);
        }

        if (!in_array($session->payment_status, ['paid', 'no_payment_required'])) {
            return response()->json(['message' => 'Le paiement n\'est pas encore confirmé.'], 422);
        }

        // Verify user ownership
        $metaUserId = $session->metadata?->user_id ?? ($session->metadata['user_id'] ?? null);
        if ((string) $metaUserId !== (string) $request->user()->id) {
            return response()->json(['message' => 'Non autorisé.'], 403);
        }

        try {
            $this->fulfillOrder($session);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('fulfillOrder failed: ' . $e->getMessage(), [
                'session_id' => $sessionId,
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['message' => 'Erreur lors de la création de la commande.'], 500);
        }

        $order = Order::where('stripe_session_id', $sessionId)->with('items')->first();

        return response()->json(['order' => $order]);
    }
}
