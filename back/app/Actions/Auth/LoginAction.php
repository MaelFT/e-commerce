<?php

namespace App\Actions\Auth;

use App\Exceptions\AccountDisabledException;
use App\Exceptions\InvalidCredentialsException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginAction
{
    public function __invoke(array $credentials): array
    {
        $user = User::where('email', $credentials['email'])->first();

        throw_if(
            ! $user || ! Hash::check($credentials['password'], $user->password),
            InvalidCredentialsException::class
        );

        throw_if(! $user->is_active, AccountDisabledException::class);

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user'  => $user,
            'token' => $token,
        ];
    }
}
