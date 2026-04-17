import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react'
import PublicLayout from '../components/PublicLayout'
import AddressAutocomplete from '../components/AddressAutocomplete'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { checkoutApi } from '../api/checkout'
import { addressFromUser, isAddressEmpty } from '../hooks/useAddress'

interface ShippingForm {
  shipping_address: string
  shipping_city: string
  shipping_postal_code: string
  shipping_country: string
}

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart()
  const { user } = useAuth()
  const savedAddress  = addressFromUser(user ?? null)
  const addressIsEmpty = isAddressEmpty(savedAddress)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAddress, setShowAddress] = useState(false)
  const [addressForm, setAddressForm] = useState<ShippingForm>({
    shipping_address:     addressIsEmpty ? '' : savedAddress.address,
    shipping_city:        addressIsEmpty ? '' : savedAddress.city,
    shipping_postal_code: addressIsEmpty ? '' : savedAddress.postal_code,
    shipping_country:     addressIsEmpty ? 'France' : savedAddress.country,
  })

  const shipping = subtotal > 100 ? 0 : 15
  const total = subtotal + shipping

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    // Show address form first
    if (!showAddress) {
      setShowAddress(true)
      return
    }

    // Validate address
    if (!addressForm.shipping_address.trim() || !addressForm.shipping_city.trim() || !addressForm.shipping_postal_code.trim() || !addressForm.shipping_country.trim()) {
      setError('Veuillez remplir tous les champs de livraison.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { url } = await checkoutApi.createSession({
        items: items.map(i => ({ product_id: i.product.id, quantity: i.quantity })),
        ...addressForm,
      })
      window.location.href = url
    } catch (err: unknown) {
      const maybeMessage = (err as { message?: unknown } | null | undefined)?.message
      setError(typeof maybeMessage === 'string' && maybeMessage.trim().length > 0
        ? maybeMessage
        : 'Une erreur est survenue lors du paiement.'
      )
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <PublicLayout>
        <div className="flex-grow flex flex-col items-center justify-center py-32 px-4 text-center">
          <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-8">
            <svg className="w-10 h-10 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-black mb-4">Votre panier est vide</h2>
          <p className="text-zinc-500 mb-8 max-w-sm">
            On dirait que vous n'avez encore rien ajouté. Découvrez notre collection premium.
          </p>
          <Link
            to="/products"
            className="px-8 py-4 bg-black text-white text-sm font-medium rounded-xl hover:bg-zinc-800 transition-colors"
          >
            Découvrir nos produits
          </Link>
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div className="flex-grow">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-12">Mon Panier</h1>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

            {/* Articles */}
            <div className="w-full lg:w-3/5">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-zinc-200 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                <div className="col-span-6">Produit</div>
                <div className="col-span-3 text-center">Quantité</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              <div className="divide-y divide-zinc-200">
                {items.map((item) => (
                  <div key={item.product.id} className="py-8 flex flex-col md:grid md:grid-cols-12 gap-6 items-start md:items-center">

                    <div className="col-span-6 flex gap-6 w-full">
                      <Link to={`/products/${item.product.id}`} className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-zinc-100 rounded-xl overflow-hidden">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </Link>
                      <div className="flex flex-col justify-center">
                        <Link to={`/products/${item.product.id}`} className="text-base font-medium text-black hover:text-zinc-600 transition-colors mb-1 line-clamp-2">
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-zinc-500 mb-4">{item.product.price.toFixed(2)} €</p>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-xs text-zinc-400 hover:text-red-500 transition-colors flex items-center w-fit"
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Supprimer
                        </button>
                      </div>
                    </div>

                    <div className="col-span-3 flex justify-between md:justify-center w-full md:w-auto items-center">
                      <span className="md:hidden text-sm text-zinc-500 font-medium">Quantité</span>
                      <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-lg px-1 h-10">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-black rounded-md transition-colors"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-black rounded-md transition-colors"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="col-span-3 flex justify-between md:justify-end w-full md:w-auto items-center">
                      <span className="md:hidden text-sm text-zinc-500 font-medium">Total</span>
                      <span className="text-lg font-medium text-black">
                        {(item.product.price * item.quantity).toFixed(2)} €
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Récapitulatif */}
            <div className="w-full lg:w-2/5">
              <div className="bg-zinc-50 rounded-3xl p-8 lg:p-10 sticky top-24">
                <h2 className="text-xl font-bold text-black mb-8">Récapitulatif</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm text-zinc-600">
                    <span>Sous-total</span>
                    <span className="text-black font-medium">{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-sm text-zinc-600">
                    <span>Livraison</span>
                    <span className="text-black font-medium">{shipping === 0 ? 'Gratuit' : `${shipping.toFixed(2)} €`}</span>
                  </div>
                </div>

                <div className="border-t border-zinc-200 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-base font-medium text-black">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-black">{total.toFixed(2)} €</span>
                      <p className="text-[10px] text-zinc-500 mt-1">EUR TTC</p>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    {error}
                  </div>
                )}

                {showAddress && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-base font-bold text-black">Adresse de livraison</h3>
                      {!addressIsEmpty && (
                        <span className="text-[11px] font-medium text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full">
                          Pré-remplie depuis votre compte
                        </span>
                      )}
                    </div>
                    <div className="space-y-4">
                      <AddressAutocomplete
                        onSelect={({ address, city, postalCode, country }) => {
                          setAddressForm({
                            shipping_address: address,
                            shipping_city: city,
                            shipping_postal_code: postalCode,
                            shipping_country: country,
                          })
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Adresse"
                        value={addressForm.shipping_address}
                        onChange={e => setAddressForm(prev => ({ ...prev, shipping_address: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm bg-white"
                      />
                      <div className="grid grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="Ville"
                          value={addressForm.shipping_city}
                          onChange={e => setAddressForm(prev => ({ ...prev, shipping_city: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Code postal"
                          value={addressForm.shipping_postal_code}
                          onChange={e => setAddressForm(prev => ({ ...prev, shipping_postal_code: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Pays"
                          value={addressForm.shipping_country}
                          onChange={e => setAddressForm(prev => ({ ...prev, shipping_country: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-4 bg-black text-white text-base font-medium rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center mb-6 hover:scale-[1.02] active:scale-[0.98] duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : showAddress ? (
                    <>Confirmer et payer <ArrowRight className="w-4 h-4 ml-2" /></>
                  ) : (
                    <>Procéder au paiement <ArrowRight className="w-4 h-4 ml-2" /></>
                  )}
                </button>

                <div className="flex items-center justify-center text-xs text-zinc-500">
                  <ShieldCheck className="w-4 h-4 mr-1.5" />
                  Paiement sécurisé et chiffré
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
