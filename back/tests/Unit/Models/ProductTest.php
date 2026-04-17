<?php

namespace Tests\Unit\Models;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    // -------------------------------------------------------------------------
    // Slug automatique
    // -------------------------------------------------------------------------

    public function test_slug_est_genere_automatiquement_a_la_creation(): void
    {
        $product = Product::factory()->create(['name' => 'Sony WH-1000XM5', 'slug' => '']);

        $this->assertEquals('sony-wh-1000xm5', $product->fresh()->slug);
    }

    public function test_slug_nest_pas_ecrase_si_deja_defini(): void
    {
        $product = Product::factory()->create([
            'name' => 'Sony WH-1000XM5',
            'slug' => 'mon-slug-custom',
        ]);

        $this->assertEquals('mon-slug-custom', $product->slug);
    }

    // -------------------------------------------------------------------------
    // Accessor getFeaturesAttribute
    // -------------------------------------------------------------------------

    public function test_features_retourne_un_tableau_de_strings_depuis_un_tableau_plat(): void
    {
        $product = Product::factory()->make([
            'features' => ['Feature A', 'Feature B', 'Feature C'],
        ]);

        $this->assertEquals(['Feature A', 'Feature B', 'Feature C'], $product->features);
    }

    public function test_features_normalise_le_format_filament_repeater(): void
    {
        $product = Product::factory()->make();

        $filamentFormat = [
            ['feature' => 'Bluetooth 5.2'],
            ['feature' => '30h autonomie'],
            ['feature' => 'Charge rapide'],
        ];

        $features = $product->getFeaturesAttribute($filamentFormat);

        $this->assertEquals(['Bluetooth 5.2', '30h autonomie', 'Charge rapide'], $features);
    }

    public function test_features_decode_une_string_json(): void
    {
        $product = Product::factory()->make();
        $json    = json_encode(['ANC', 'USB-C', 'Multipoint']);

        $features = $product->getFeaturesAttribute($json);

        $this->assertEquals(['ANC', 'USB-C', 'Multipoint'], $features);
    }

    public function test_features_retourne_tableau_vide_si_valeur_vide(): void
    {
        $product  = Product::factory()->make();
        $features = $product->getFeaturesAttribute(null);

        $this->assertEquals([], $features);
    }

    // -------------------------------------------------------------------------
    // Mutator setFeaturesAttribute
    // -------------------------------------------------------------------------

    public function test_features_est_stocke_et_relu_correctement(): void
    {
        $product = Product::factory()->create([
            'features' => ['ANC', 'Bluetooth', 'USB-C'],
        ]);

        // On recharge depuis la DB pour s'assurer que le mutator a bien persisté
        $this->assertEquals(['ANC', 'Bluetooth', 'USB-C'], $product->fresh()->features);
    }

    // -------------------------------------------------------------------------
    // Casts
    // -------------------------------------------------------------------------

    public function test_price_est_caste_en_float(): void
    {
        $product = Product::factory()->create(['price' => 349.99]);

        $this->assertIsFloat($product->fresh()->price);
        $this->assertEquals(349.99, $product->fresh()->price);
    }

    public function test_rating_est_caste_en_float(): void
    {
        $product = Product::factory()->create(['rating' => 4.8]);

        $this->assertIsFloat($product->fresh()->rating);
        $this->assertEquals(4.8, $product->fresh()->rating);
    }

    public function test_is_new_est_caste_en_boolean(): void
    {
        $product = Product::factory()->isNew()->create();

        $this->assertIsBool($product->fresh()->is_new);
        $this->assertTrue($product->fresh()->is_new);
    }
}
