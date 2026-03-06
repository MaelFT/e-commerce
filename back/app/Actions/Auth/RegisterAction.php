<?php

namespace App\Actions\Auth;

use App\Enums\UserRole;
use App\Models\User;

class RegisterAction
{
    public function __invoke(array $data): array
    {
        $user  = User::create([...$data, 'role' => UserRole::User]);
        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user'  => $user,
            'token' => $token,
        ];
    }
}
