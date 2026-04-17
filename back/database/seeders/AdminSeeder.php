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
                'name'      => 'Administrateur',
                'password'  => 'password123',
                'role'      => UserRole::Admin,
                'is_active' => true,
            ]
        );
        User::updateOrCreate(
            ['email' => 'test@test.fr'],
            [
                'name'      => 'Utilisateur',
                'password'  => 'password123',
                'role'      => UserRole::User,
                'is_active' => true,
            ]
        );
    }
}
