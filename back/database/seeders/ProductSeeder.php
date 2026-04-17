<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::truncate();

        $products = [

            // ----------------------------------------------------------------
            // AUDIO
            // ----------------------------------------------------------------
            [
                'name'          => 'Sony WH-1000XM5',
                'price'         => 349.99,
                'category'      => 'Audio',
                'image'         => 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.8,
                'reviews_count' => 2847,
                'description'   => 'Le casque à réduction de bruit la plus avancée de Sony. Profitez d\'un son exceptionnel avec les nouveaux pilotes 30 mm et d\'une autonomie de 30 heures pour une immersion totale.',
                'features'      => ['Réduction de bruit HD', '30h d\'autonomie', 'Bluetooth 5.2', 'Charge rapide 3 min = 3h', 'Appels mains libres multi-points'],
                'is_new'        => false,
                'stock'         => 45,
            ],
            [
                'name'          => 'Bose QuietComfort Ultra',
                'price'         => 399.00,
                'category'      => 'Audio',
                'image'         => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.7,
                'reviews_count' => 1563,
                'description'   => 'Le casque over-ear premium de Bose avec immersion sonore 3D et réduction de bruit Quiet Comfort. Confort exceptionnel toute la journée grâce aux coussinets en mousse à mémoire.',
                'features'      => ['Immersion sonore 3D', 'ANC Quiet Comfort', '24h d\'autonomie', 'Mode transparence', 'Multipoint Bluetooth'],
                'is_new'        => true,
                'stock'         => 30,
            ],
            [
                'name'          => 'Apple AirPods Pro 2',
                'price'         => 279.00,
                'category'      => 'Audio',
                'image'         => 'https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.6,
                'reviews_count' => 4523,
                'description'   => 'Les AirPods Pro de 2e génération avec la puce H2 offrent une réduction de bruit 2x plus efficace, un audio spatial personnalisé et une autonomie totale de 30h avec le boîtier.',
                'features'      => ['Réduction de bruit H2', 'Audio spatial personnalisé', '30h autonomie avec boîtier', 'Résistance eau IPX4', 'Charge MagSafe & USB-C'],
                'is_new'        => false,
                'stock'         => 55,
            ],
            [
                'name'          => 'Sennheiser Momentum 4',
                'price'         => 299.95,
                'category'      => 'Audio',
                'image'         => 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.5,
                'reviews_count' => 987,
                'description'   => 'Casque audiophile sans fil avec 60 heures d\'autonomie record et ANC adaptatif. Le son Sennheiser légendaire dans un design minimaliste et léger.',
                'features'      => ['60h d\'autonomie record', 'ANC adaptatif', 'Son Sennheiser haute fidélité', 'Design pliant ultra-léger', 'App Sound Check'],
                'is_new'        => false,
                'stock'         => 28,
            ],
            [
                'name'          => 'Sonos Era 100',
                'price'         => 279.00,
                'category'      => 'Audio',
                'image'         => 'https://images.unsplash.com/photo-1545454675-3531b543be5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.3,
                'reviews_count' => 432,
                'description'   => 'Enceinte connectée stéréo avec son spatial et basses profondes. Profitez de votre musique en Wi-Fi, Bluetooth ou AirPlay 2 partout dans votre maison.',
                'features'      => ['Son stéréo spatial', 'Wi-Fi, Bluetooth & AirPlay 2', 'Assistant vocal intégré', 'Multi-room audio', 'Contrôle par application'],
                'is_new'        => false,
                'stock'         => 35,
            ],
            [
                'name'          => 'JBL Charge 5',
                'price'         => 179.99,
                'category'      => 'Audio',
                'image'         => 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.4,
                'reviews_count' => 3102,
                'description'   => 'Enceinte Bluetooth portable avec 20h d\'autonomie, résistance IP67 à l\'eau et à la poussière, et une banque d\'alimentation intégrée pour charger vos appareils.',
                'features'      => ['20h d\'autonomie', 'Résistance IP67', 'Banque d\'alimentation USB', 'JBL PartyBoost', 'Basses profondes radiateur passif'],
                'is_new'        => false,
                'stock'         => 70,
            ],

            // ----------------------------------------------------------------
            // ORDINATEURS
            // ----------------------------------------------------------------
            [
                'name'          => 'Apple MacBook Pro 14" M3 Pro',
                'price'         => 2199.00,
                'category'      => 'Ordinateurs',
                'image'         => 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.9,
                'reviews_count' => 1203,
                'description'   => 'Le MacBook Pro 14 pouces propulsé par la puce M3 Pro offre des performances exceptionnelles pour les créatifs et les développeurs. Écran Liquid Retina XDR, autonomie de 18h.',
                'features'      => ['Puce Apple M3 Pro', 'Écran Liquid Retina XDR 14"', '18 Go RAM unifiée', '512 Go SSD', '18h d\'autonomie'],
                'is_new'        => true,
                'stock'         => 20,
            ],
            [
                'name'          => 'Dell XPS 15 9530',
                'price'         => 1899.00,
                'category'      => 'Ordinateurs',
                'image'         => 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.6,
                'reviews_count' => 743,
                'description'   => 'Le XPS 15 combine puissance et élégance avec son écran OLED 3,5K et son processeur Intel Core i7 de 13e génération. Idéal pour les professionnels créatifs sous Windows.',
                'features'      => ['Intel Core i7-13700H', 'Écran OLED 3.5K 15.6"', 'NVIDIA RTX 4060', '16 Go DDR5', '512 Go NVMe SSD'],
                'is_new'        => false,
                'stock'         => 15,
            ],
            [
                'name'          => 'ASUS ROG Zephyrus G14',
                'price'         => 1599.00,
                'category'      => 'Ordinateurs',
                'image'         => 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.7,
                'reviews_count' => 891,
                'description'   => 'Laptop gaming ultra-compact de 14 pouces propulsé par AMD Ryzen 9 et NVIDIA RTX 4070. Le meilleur rapport puissance/portabilité du marché pour les gamers nomades.',
                'features'      => ['AMD Ryzen 9 8945HS', 'NVIDIA RTX 4070 8 Go', 'Écran QHD 165 Hz', '32 Go LPDDR5', 'Autonomie 10h jeu léger'],
                'is_new'        => true,
                'stock'         => 12,
            ],
            [
                'name'          => 'Microsoft Surface Laptop 5',
                'price'         => 1299.00,
                'category'      => 'Ordinateurs',
                'image'         => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.4,
                'reviews_count' => 512,
                'description'   => 'Le Surface Laptop 5 allie style et performance avec son écran PixelSense tactile et son processeur Intel Core i5. Léger, élégant, parfait pour une utilisation professionnelle quotidienne.',
                'features'      => ['Intel Core i5-1245U', 'Écran PixelSense 13.5" tactile', '8 Go LPDDR5X', '512 Go SSD', '18h d\'autonomie'],
                'is_new'        => false,
                'stock'         => 22,
            ],

            // ----------------------------------------------------------------
            // ACCESSOIRES
            // ----------------------------------------------------------------
            [
                'name'          => 'Keychron Q1 Pro',
                'price'         => 199.00,
                'category'      => 'Accessoires',
                'image'         => 'https://images.unsplash.com/photo-1595044426077-d36d9236d44a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.7,
                'reviews_count' => 876,
                'description'   => 'Clavier mécanique sans fil haut de gamme avec boîtier en aluminium CNC et switches hot-swap. Compatible Mac et Windows avec rétroéclairage RGB personnalisable.',
                'features'      => ['Boîtier aluminium CNC', 'Switches hot-swap', 'Sans fil Bluetooth 5.1', 'Rétroéclairage RGB', 'Compatible Mac & Windows'],
                'is_new'        => false,
                'stock'         => 60,
            ],
            [
                'name'          => 'Logitech MX Master 3S',
                'price'         => 109.99,
                'category'      => 'Accessoires',
                'image'         => 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.8,
                'reviews_count' => 3241,
                'description'   => 'La souris de référence pour les professionnels. Capteur 8000 DPI ultra-précis, roue magnétique MagSpeed, et compatible avec jusqu\'à 3 appareils simultanément.',
                'features'      => ['Capteur 8000 DPI', 'Roue MagSpeed magnétique', 'Multi-appareils (3)', '70j d\'autonomie', 'Charge USB-C'],
                'is_new'        => false,
                'stock'         => 80,
            ],
            [
                'name'          => 'Elgato Stream Deck MK.2',
                'price'         => 149.99,
                'category'      => 'Accessoires',
                'image'         => 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.6,
                'reviews_count' => 1087,
                'description'   => 'Contrôleur de studio avec 15 touches LCD personnalisables pour automatiser vos workflows, contrôler vos streams et booster votre productivité en un seul clic.',
                'features'      => ['15 touches LCD personnalisables', 'Intégration OBS, Twitch, YouTube', 'Profils multi-applications', 'Câble USB détachable', 'Compatible Mac & Windows'],
                'is_new'        => false,
                'stock'         => 42,
            ],
            [
                'name'          => 'Razer DeathAdder V3 Pro',
                'price'         => 149.99,
                'category'      => 'Accessoires',
                'image'         => 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
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
            [
                'name'          => 'Apple Magic Keyboard Touch ID',
                'price'         => 109.00,
                'category'      => 'Accessoires',
                'image'         => 'https://images.unsplash.com/photo-1541140532154-b174497cd992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.5,
                'reviews_count' => 1874,
                'description'   => 'Le clavier sans fil d\'Apple avec Touch ID intégré pour une connexion sécurisée et rapide. Compatible avec Mac, iPad et iPhone via Bluetooth ou Lightning.',
                'features'      => ['Touch ID intégré', 'Touches ciseaux silencieuses', 'Bluetooth & Lightning', 'Batterie rechargeable 1 mois', 'Compatible Mac, iPad & iPhone'],
                'is_new'        => false,
                'stock'         => 65,
            ],

            // ----------------------------------------------------------------
            // SMARTPHONES
            // ----------------------------------------------------------------
            [
                'name'          => 'Apple iPhone 15 Pro',
                'price'         => 1229.00,
                'category'      => 'Smartphones',
                'image'         => 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.8,
                'reviews_count' => 5124,
                'description'   => 'L\'iPhone 15 Pro en titane, avec la puce A17 Pro et la caméra 48 Mpx avec zoom optique 3x. Le premier iPhone avec bouton Action personnalisable et port USB-C.',
                'features'      => ['Puce A17 Pro', 'Titane aérospatial', 'Caméra 48 Mpx + zoom 3x', 'Bouton Action', 'USB-C 3.0 (10 Gb/s)'],
                'is_new'        => true,
                'stock'         => 40,
            ],
            [
                'name'          => 'Samsung Galaxy S24 Ultra',
                'price'         => 1329.00,
                'category'      => 'Smartphones',
                'image'         => 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.7,
                'reviews_count' => 2156,
                'description'   => 'Le smartphone ultime de Samsung avec le S Pen intégré, un zoom optique 10x et une intelligence artificielle avancée pour la photographie et la productivité.',
                'features'      => ['S Pen intégré', 'Zoom optique 10x', 'Écran Dynamic AMOLED 6.8"', 'Snapdragon 8 Gen 3', 'Batterie 5000 mAh'],
                'is_new'        => true,
                'stock'         => 25,
            ],
            [
                'name'          => 'Google Pixel 8 Pro',
                'price'         => 1099.00,
                'category'      => 'Smartphones',
                'image'         => 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.6,
                'reviews_count' => 1342,
                'description'   => 'Le Pixel 8 Pro propulsé par la puce Tensor G3 de Google offre les meilleures photos de nuit du marché et 7 ans de mises à jour Android garantis.',
                'features'      => ['Puce Google Tensor G3', 'Caméra 50 Mpx + zoom 5x', 'Magic Eraser & Photo Unblur', '7 ans de mises à jour Android', 'Thermomètre intégré'],
                'is_new'        => false,
                'stock'         => 33,
            ],
            [
                'name'          => 'OnePlus 12',
                'price'         => 899.00,
                'category'      => 'Smartphones',
                'image'         => 'https://images.unsplash.com/photo-1591337676887-a217a8e71a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.5,
                'reviews_count' => 876,
                'description'   => 'Le flagship killer de OnePlus avec Snapdragon 8 Gen 3, charge ultra-rapide 100W SUPERVOOC et une triple caméra Hasselblad. Performances haut de gamme à prix compétitif.',
                'features'      => ['Snapdragon 8 Gen 3', 'Charge 100W SUPERVOOC', 'Triple caméra Hasselblad', 'Écran AMOLED 120 Hz', 'Batterie 5400 mAh'],
                'is_new'        => true,
                'stock'         => 50,
            ],

            // ----------------------------------------------------------------
            // TABLETTES
            // ----------------------------------------------------------------
            [
                'name'          => 'iPad Pro 13" M4',
                'price'         => 1299.00,
                'category'      => 'Tablettes',
                'image'         => 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.9,
                'reviews_count' => 891,
                'description'   => 'L\'iPad Pro le plus fin jamais conçu. Propulsé par la puce M4, il offre une puissance de traitement inégalée dans un design ultra-fin de seulement 5,1 mm.',
                'features'      => ['Puce Apple M4', 'Écran Ultra Retina XDR 13"', 'Design 5.1 mm ultra-fin', 'Apple Pencil Pro compatible', 'Wi-Fi 6E & Bluetooth 5.3'],
                'is_new'        => true,
                'stock'         => 30,
            ],
            [
                'name'          => 'Samsung Galaxy Tab S9 Ultra',
                'price'         => 1199.00,
                'category'      => 'Tablettes',
                'image'         => 'https://images.unsplash.com/photo-1561154464-82e9adf32764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.7,
                'reviews_count' => 634,
                'description'   => 'La tablette Android premium de Samsung avec son immense écran Dynamic AMOLED 14,6 pouces, la puce Snapdragon 8 Gen 2 et le S Pen inclus pour une créativité sans limites.',
                'features'      => ['Écran Dynamic AMOLED 14.6"', 'Snapdragon 8 Gen 2', 'S Pen inclus', '12 Go RAM', 'DeX Mode bureau complet'],
                'is_new'        => false,
                'stock'         => 18,
            ],
            [
                'name'          => 'iPad Air 11" M2',
                'price'         => 799.00,
                'category'      => 'Tablettes',
                'image'         => 'https://images.unsplash.com/photo-1580910051074-3eb694886505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.6,
                'reviews_count' => 1245,
                'description'   => 'L\'iPad Air avec la puce M2 est le point d\'entrée idéal dans l\'écosystème iPad Pro. Compatibilité Apple Pencil Pro et Magic Keyboard pour une productivité maximale.',
                'features'      => ['Puce Apple M2', 'Écran Liquid Retina 11"', 'Apple Pencil Pro compatible', 'Magic Keyboard compatible', 'Wi-Fi 6E'],
                'is_new'        => true,
                'stock'         => 45,
            ],

            // ----------------------------------------------------------------
            // ÉCRANS
            // ----------------------------------------------------------------
            [
                'name'          => 'LG UltraWide 34" WQHD',
                'price'         => 649.00,
                'category'      => 'Écrans',
                'image'         => 'https://images.unsplash.com/photo-1527443224154-c4a573d5b6b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.5,
                'reviews_count' => 654,
                'description'   => 'Moniteur incurvé 34 pouces WQHD avec dalle IPS Nano pour une précision des couleurs exceptionnelle. Idéal pour la productivité et les créatifs.',
                'features'      => ['34" WQHD 3440×1440', 'Dalle IPS Nano couleur', '160 Hz', 'AMD FreeSync Premium', 'USB-C 96W Power Delivery'],
                'is_new'        => false,
                'stock'         => 18,
            ],
            [
                'name'          => 'Samsung Odyssey G7 32"',
                'price'         => 699.00,
                'category'      => 'Écrans',
                'image'         => 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.6,
                'reviews_count' => 823,
                'description'   => 'Moniteur gaming incurvé 32 pouces QHD 240 Hz avec dalle VA et courbure 1000R immersive. HDR600 et G-Sync Compatible pour des sessions gaming ultimes.',
                'features'      => ['32" QHD 2560×1440', '240 Hz taux de rafraîchissement', 'Courbure 1000R', 'HDR600', 'G-Sync & FreeSync Premium Pro'],
                'is_new'        => false,
                'stock'         => 14,
            ],
            [
                'name'          => 'Dell U2723QE 27" 4K',
                'price'         => 599.00,
                'category'      => 'Écrans',
                'image'         => 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.7,
                'reviews_count' => 498,
                'description'   => 'Moniteur professionnel 27 pouces 4K IPS Black avec une précision des couleurs Delta E < 2 et une luminosité de 2000:1 grâce à la dalle IPS Black. Certifié Thunderbolt 4.',
                'features'      => ['27" 4K UHD 3840×2160', 'Dalle IPS Black', 'Delta E < 2', 'Thunderbolt 4 90W', 'Hub USB-C intégré'],
                'is_new'        => true,
                'stock'         => 20,
            ],
            [
                'name'          => 'BenQ PD2706UA 27" 4K',
                'price'         => 729.00,
                'category'      => 'Écrans',
                'image'         => 'https://images.unsplash.com/photo-1547082299-de196ea013d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
                'rating'        => 4.6,
                'reviews_count' => 312,
                'description'   => 'Moniteur de designer 27 pouces 4K avec calibration colorimétrique intégrée et certification Pantone. Compatible KVM pour travailler sur plusieurs machines depuis un seul écran.',
                'features'      => ['27" 4K IPS 100% sRGB', 'Calibration auto intégrée', 'Certification Pantone Validated', 'Switch KVM intégré', 'USB-C 96W + Thunderbolt 3'],
                'is_new'        => false,
                'stock'         => 10,
            ],
        ];

        foreach ($products as $data) {
            $data['slug'] = Str::slug($data['name']);
            Product::create($data);
        }
    }
}
