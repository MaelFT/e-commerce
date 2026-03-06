<?php

namespace App\Enums;

enum UserRole: string
{
    case User  = 'user';
    case Admin = 'admin';

    public function label(): string
    {
        return match ($this) {
            UserRole::User  => 'Utilisateur',
            UserRole::Admin => 'Administrateur',
        };
    }
}
