<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->words(3, true);

        return [
            'name'          => ucfirst($name),
            'slug'          => Str::slug($name),
            'price'         => fake()->randomFloat(2, 9.99, 2499.99),
            'category'      => fake()->randomElement(['Audio', 'Ordinateurs', 'Accessoires', 'Smartphones', 'Tablettes', 'Écrans']),
            'image'         => fake()->imageUrl(640, 480, 'technics'),
            'rating'        => fake()->randomFloat(1, 1.0, 5.0),
            'reviews_count' => fake()->numberBetween(0, 5000),
            'description'   => fake()->paragraph(),
            'features'      => ['Feature A', 'Feature B', 'Feature C'],
            'is_new'        => false,
            'stock'         => fake()->numberBetween(1, 100),
        ];
    }

    public function isNew(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_new' => true,
        ]);
    }

    public function outOfStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock' => 0,
        ]);
    }

    public function inCategory(string $category): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => $category,
        ]);
    }
}
