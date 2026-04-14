<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UpdateProfileAction
{
    public function __invoke(User $user, array $data): User
    {
        if (isset($data['password'])) {
            if (! Hash::check($data['current_password'], $user->password)) {
                throw ValidationException::withMessages([
                    'current_password' => ['Le mot de passe actuel est incorrect.'],
                ]);
            }

            $data['password'] = Hash::make($data['password']);
        }

        unset($data['current_password'], $data['password_confirmation']);

        $user->update($data);

        return $user->fresh();
    }
}
