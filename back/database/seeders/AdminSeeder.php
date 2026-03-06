<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@amazone.fr'],
            [
                'name'     => 'Administrateur',
                'password' => 'admin1234',
                'role'     => UserRole::Admin,
            ]
        );
    }
}
