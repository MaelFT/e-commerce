<?php

namespace Tests\Feature\Products;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductShowTest extends TestCase
{
    use RefreshDatabase;

    public function test_show_retourne_200_avec_le_produit(): void
    {
        $product = Product::factory()->create([
            'name'     => 'Sony WH-1000XM5',
            'price'    => 349.99,
            'category' => 'Audio',
        ]);

        $response = $this->getJson("/api/products/{$product->id}");

        $response->assertStatus(200)
            ->assertJsonStructure(['id', 'name', 'slug', 'price', 'category', 'image', 'rating', 'reviews_count', 'description', 'features', 'is_new', 'stock'])
            ->assertJsonPath('id',       $product->id)
            ->assertJsonPath('name',     'Sony WH-1000XM5')
            ->assertJsonPath('price',    349.99)
            ->assertJsonPath('category', 'Audio');
    }

    public function test_show_retourne_les_features_en_tableau_de_strings(): void
    {
        $product = Product::factory()->create([
            'features' => ['ANC', 'Bluetooth 5.2', '30h autonomie'],
        ]);

        $response = $this->getJson("/api/products/{$product->id}");

        $response->assertStatus(200)
            ->assertJsonPath('features', ['ANC', 'Bluetooth 5.2', '30h autonomie']);
    }

    public function test_show_retourne_404_si_produit_inexistant(): void
    {
        $response = $this->getJson('/api/products/99999');

        $response->assertStatus(404);
    }

    public function test_show_retourne_is_new_en_boolean(): void
    {
        $product = Product::factory()->isNew()->create();

        $response = $this->getJson("/api/products/{$product->id}");

        $response->assertStatus(200)
            ->assertJsonPath('is_new', true);
    }
}
