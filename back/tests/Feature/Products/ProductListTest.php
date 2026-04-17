<?php

namespace Tests\Feature\Products;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductListTest extends TestCase
{
    use RefreshDatabase;

    private string $url = '/api/products';

    public function test_liste_retourne_200_avec_structure_paginee(): void
    {
        Product::factory()->count(3)->create();

        $response = $this->getJson($this->url);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'slug', 'price', 'category', 'image', 'rating', 'reviews_count', 'description', 'features', 'is_new', 'stock'],
                ],
                'current_page',
                'last_page',
                'per_page',
                'total',
            ]);
    }

    public function test_liste_retourne_tous_les_produits(): void
    {
        Product::factory()->count(5)->create();

        $response = $this->getJson($this->url);

        $response->assertJsonPath('total', 5);
    }

    public function test_filtre_par_categorie_retourne_uniquement_les_produits_de_la_categorie(): void
    {
        Product::factory()->count(3)->inCategory('Audio')->create();
        Product::factory()->count(2)->inCategory('Ordinateurs')->create();

        $response = $this->getJson("{$this->url}?category=Audio");

        $response->assertStatus(200);

        foreach ($response->json('data') as $product) {
            $this->assertEquals('Audio', $product['category']);
        }

        $this->assertEquals(3, $response->json('total'));
    }

    public function test_filtre_par_categorie_inexistante_retourne_liste_vide(): void
    {
        Product::factory()->count(3)->inCategory('Audio')->create();

        $response = $this->getJson("{$this->url}?category=Inexistante");

        $response->assertStatus(200)
            ->assertJsonPath('total', 0);
    }

    public function test_recherche_retourne_les_produits_correspondants(): void
    {
        Product::factory()->create(['name' => 'Sony WH-1000XM5']);
        Product::factory()->create(['name' => 'Bose QuietComfort Ultra']);
        Product::factory()->create(['name' => 'Apple AirPods Pro']);

        $response = $this->getJson("{$this->url}?search=sony");

        $response->assertStatus(200)
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.name', 'Sony WH-1000XM5');
    }

    public function test_recherche_est_insensible_a_la_casse(): void
    {
        Product::factory()->create(['name' => 'Sony WH-1000XM5']);
        Product::factory()->count(2)->create();

        $response = $this->getJson("{$this->url}?search=SONY");

        $response->assertStatus(200)
            ->assertJsonPath('total', 1);
    }

    public function test_recherche_sans_resultat_retourne_liste_vide(): void
    {
        Product::factory()->count(3)->create();

        $response = $this->getJson("{$this->url}?search=produit-inexistant-xyz");

        $response->assertStatus(200)
            ->assertJsonPath('total', 0);
    }

    public function test_filtre_new_retourne_uniquement_les_nouveautes(): void
    {
        Product::factory()->count(3)->isNew()->create();
        Product::factory()->count(4)->create(['is_new' => false]);

        $response = $this->getJson("{$this->url}?new=true");

        $response->assertStatus(200)
            ->assertJsonPath('total', 3);

        foreach ($response->json('data') as $product) {
            $this->assertTrue($product['is_new']);
        }
    }

    public function test_per_page_limite_le_nombre_de_resultats(): void
    {
        Product::factory()->count(10)->create();

        $response = $this->getJson("{$this->url}?per_page=3");

        $response->assertStatus(200);
        $this->assertCount(3, $response->json('data'));
        $this->assertEquals(3, $response->json('per_page'));
    }

    public function test_pagination_par_defaut_est_12(): void
    {
        Product::factory()->count(20)->create();

        $response = $this->getJson($this->url);

        $response->assertStatus(200);
        $this->assertCount(12, $response->json('data'));
        $this->assertEquals(12, $response->json('per_page'));
    }

    public function test_combinaison_search_et_categorie(): void
    {
        Product::factory()->create(['name' => 'Sony WH-1000XM5', 'category' => 'Audio']);
        Product::factory()->create(['name' => 'Sony Xperia 1 V',  'category' => 'Smartphones']);
        Product::factory()->count(2)->inCategory('Audio')->create();

        $response = $this->getJson("{$this->url}?search=sony&category=Audio");

        $response->assertStatus(200)
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.name', 'Sony WH-1000XM5');
    }
}
