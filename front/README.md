docker-compose up -d

npm run install 

npm run dev 

docker exec -it ecommerce-app bash

php artisan migrate:fresh --seed

php artisan make:filament-resource Product --generate 2>&1