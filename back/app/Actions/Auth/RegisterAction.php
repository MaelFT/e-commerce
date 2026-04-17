<?php

namespace App\Actions\Auth;

use App\Enums\UserRole;
use App\Models\User;

class RegisterAction
{
    public function __invoke(array $data): array
    {
        $user  = User::create([...$data, 'role' => UserRole::User, 'is_active' => true]);
        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user'  => $user,
            'token' => $token,
        ];
    }
}
