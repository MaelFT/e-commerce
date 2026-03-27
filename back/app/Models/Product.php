<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'price',
        'category',
        'image',
        'rating',
        'reviews_count',
        'description',
        'features',
        'is_new',
        'stock',
    ];

    protected $casts = [
        'is_new' => 'boolean',
        'price'  => 'float',
        'rating' => 'float',
    ];

    /**
     * Filament Repeater stocke les features comme [['feature' => '...'], ...]
     * L'API et le front attendent ['...', '...']
     * On normalise à la lecture pour toujours exposer un tableau de strings.
     */
    public function getFeaturesAttribute(mixed $value): array
    {
        // Cast manuel si on reçoit une string JSON brute
        if (is_string($value)) {
            $value = json_decode($value, true) ?? [];
        }

        if (empty($value)) return [];

        // Déjà un tableau de strings → format API/front
        if (isset($value[0]) && is_string($value[0])) {
            return $value;
        }

        // Format Repeater [['feature' => '...'], ...]
        return array_values(array_filter(array_column($value, 'feature')));
    }

    /**
     * Avant de sauvegarder, on s'assure de toujours stocker un tableau de strings JSON.
     */
    public function setFeaturesAttribute(mixed $value): void
    {
        if (is_string($value)) {
            $value = json_decode($value, true) ?? [];
        }

        $this->attributes['features'] = json_encode(array_values($value ?? []));
    }

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Product $product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });
    }
}
