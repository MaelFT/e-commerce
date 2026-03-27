<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name'          => 'Sony WH-1000XM5',
                'price'         => 349.99,
                'category'      => 'Audio',
                'image'         => 'https://images.unsplash.com/photo-1624564039739-035817ba4098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.8,
                'reviews_count' => 2847,
                'description'   => 'Le casque à réduction de bruit la plus avancée de Sony. Profitez d\'un son exceptionnel avec les nouveaux pilotes 30 mm et d\'une autonomie de 30 heures pour une immersion totale.',
                'features'      => ['Réduction de bruit HD', '30h d\'autonomie', 'Bluetooth 5.2', 'Charge rapide 3 min = 3h', 'Appels mains libres multi-points'],
                'is_new'        => false,
                'stock'         => 45,
            ],
            [
                'name'          => 'Apple MacBook Pro 14" M3',
                'price'         => 2199.00,
                'category'      => 'Ordinateurs',
                'image'         => 'https://images.unsplash.com/photo-1614630536369-2516d7c0a58c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.9,
                'reviews_count' => 1203,
                'description'   => 'Le MacBook Pro 14 pouces propulsé par la puce M3 offre des performances exceptionnelles pour les créatifs et les développeurs. Écran Liquid Retina XDR, autonomie de 22h.',
                'features'      => ['Puce Apple M3', 'Écran Liquid Retina XDR 14"', '18 Go RAM unifiée', '512 Go SSD', '22h d\'autonomie'],
                'is_new'        => true,
                'stock'         => 20,
            ],
            [
                'name'          => 'Keychron Q1 Pro',
                'price'         => 199.00,
                'category'      => 'Accessoires',
                'image'         => 'https://images.unsplash.com/photo-1626958390898-162d3577f293?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.7,
                'reviews_count' => 876,
                'description'   => 'Clavier mécanique sans fil haut de gamme avec boîtier en aluminium CNC et switches hot-swap. Compatible Mac et Windows avec rétroéclairage RGB personnalisable.',
                'features'      => ['Boîtier aluminium CNC', 'Switches hot-swap', 'Sans fil Bluetooth 5.1', 'Rétroéclairage RGB', 'Compatible Mac & Windows'],
                'is_new'        => false,
                'stock'         => 60,
            ],
            [
                'name'          => 'Sonos Era 100',
                'price'         => 279.00,
                'category'      => 'Audio',
                'image'         => 'https://images.unsplash.com/photo-1570652279453-c17e3580126c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.1,
                'reviews_count' => 432,
                'description'   => 'Enceinte connectée stéréo avec son spatial et basses profondes. Profitez de votre musique préférée en Wi-Fi, Bluetooth ou AirPlay 2 dans chaque pièce.',
                'features'      => ['Son stéréo spatial', 'Wi-Fi, Bluetooth & AirPlay 2', 'Assistant vocal intégré', 'Multi-room audio', 'Contrôle par application'],
                'is_new'        => false,
                'stock'         => 35,
            ],
            [
                'name'          => 'Logitech MX Master 3S',
                'price'         => 109.99,
                'category'      => 'Accessoires',
                'image'         => 'https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 3,
                'reviews_count' => 3241,
                'description'   => 'La souris de référence pour les professionnels. Capteur 8000 DPI ultra-précis, roue magnétique MagSpeed, et compatible avec jusqu\'à 3 appareils simultanément.',
                'features'      => ['Capteur 8000 DPI', 'Roue MagSpeed magnétique', 'Multi-appareils (3)', '70j d\'autonomie', 'Charge USB-C'],
                'is_new'        => false,
                'stock'         => 80,
            ],
            [
                'name'          => 'LG UltraWide 34" WQHD',
                'price'         => 649.00,
                'category'      => 'Écrans',
                'image'         => 'https://images.unsplash.com/photo-1567167680325-2203584962b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 2,
                'reviews_count' => 654,
                'description'   => 'Moniteur incurvé 34 pouces WQHD avec dalle IPS Nano pour une précision des couleurs exceptionnelle. Idéal pour la productivité et les créatifs.',
                'features'      => ['34" WQHD 3440×1440', 'Dalle IPS Nano couleur', '160 Hz taux de rafraîchissement', 'AMD FreeSync Premium', 'USB-C 96W Power Delivery'],
                'is_new'        => false,
                'stock'         => 18,
            ],
            [
                'name'          => 'iPad Pro 13" M4',
                'price'         => 1299.00,
                'category'      => 'Tablettes',
                'image'         => 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.9,
                'reviews_count' => 891,
                'description'   => 'L\'iPad Pro le plus fin jamais conçu. Propulsé par la puce M4, il offre une puissance de traitement inégalée dans un design ultra-léger de seulement 5,1 mm.',
                'features'      => ['Puce Apple M4', 'Écran Ultra Retina XDR 13"', 'Design 5,1 mm ultra-fin', 'Apple Pencil Pro compatible', 'Wi-Fi 6E & Bluetooth 5.3'],
                'is_new'        => true,
                'stock'         => 30,
            ],
            [
                'name'          => 'Samsung Galaxy S24 Ultra',
                'price'         => 1329.00,
                'category'      => 'Smartphones',
                'image'         => 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.7,
                'reviews_count' => 2156,
                'description'   => 'Le smartphone ultime de Samsung avec le S Pen intégré, un zoom optique 10x et une intelligence artificielle avancée pour la photographie et la productivité.',
                'features'      => ['S Pen intégré', 'Zoom optique 10x', 'Écran Dynamic AMOLED 6,8"', 'Snapdragon 8 Gen 3', '5000 mAh batterie'],
                'is_new'        => true,
                'stock'         => 25,
            ],
            [
                'name'          => 'Apple AirPods Pro 2',
                'price'         => 279.00,
                'category'      => 'Audio',
                'image'         => 'https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 1.0,
                'reviews_count' => 4523,
                'description'   => 'Les AirPods Pro de 2e génération avec la puce H2 offrent une réduction de bruit 2x plus efficace, un audio spatial personnalisé et une autonomie totale de 30h avec le boîtier.',
                'features'      => ['Réduction de bruit H2', 'Audio spatial personnalisé', '30h autonomie avec boîtier', 'Résistance eau IPX4', 'Charge MagSafe & USB-C'],
                'is_new'        => false,
                'stock'         => 55,
            ],
            [
                'name'          => 'Elgato Stream Deck MK.2',
                'price'         => 149.99,
                'category'      => 'Accessoires',
                'image'         => 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.6,
                'reviews_count' => 1087,
                'description'   => 'Contrôleur de studio avec 15 touches LCD personnalisables pour automatiser vos workflows, contrôler vos streams et booster votre productivité en un seul clic.',
                'features'      => ['15 touches LCD personnalisables', 'Intégration logiciels (OBS, Twitch…)', 'Profils multi-applications', 'Câble USB détachable', 'Compatible Mac & Windows'],
                'is_new'        => false,
                'stock'         => 42,
            ],
            [
                'name'          => 'Razer DeathAdder V3 Pro',
                'price'         => 149.99,
                'category'      => 'Accessoires',
                'image'         => 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.7,
                'reviews_count' => 1432,
                'description'   => 'Souris gaming sans fil légère à l\'extrême (63g) avec le capteur Focus Pro 30K. Conçue pour les compétiteurs qui exigent précision et réactivité maximales.',
                'features'      => ['Capteur Focus Pro 30K DPI', 'Poids plume 63g', 'Sans fil HyperSpeed', '90h autonomie', 'Switches optiques Gen-3'],
                'is_new'        => true,
                'stock'         => 38,
            ],
            [
                'name'          => 'Anker 737 GaNPrime 120W',
                'price'         => 89.99,
                'category'      => 'Accessoires',
                'image'         => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.5,
                'reviews_count' => 2341,
                'description'   => 'Chargeur compact 120W avec technologie GaN pour charger simultanément un laptop, une tablette et un smartphone à pleine puissance depuis une seule prise.',
                'features'      => ['120W puissance totale', 'Technologie GaN III', '3 ports (2 USB-C + 1 USB-A)', 'Charge laptop MacBook & PC', 'Format voyage compact'],
                'is_new'        => false,
                'stock'         => 100,
            ],
        ];

        foreach ($products as $data) {
            $data['slug'] = Str::slug($data['name']);
            Product::create($data);
        }
    }
}
