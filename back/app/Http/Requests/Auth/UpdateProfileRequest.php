<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'                  => ['sometimes', 'string', 'max:255'],
            'email'                 => ['sometimes', 'email', 'max:255', 'unique:users,email,' . $this->user()->id],
            'current_password'      => ['required_with:password', 'string'],
            'password'              => ['nullable', 'confirmed', Password::min(8)],
            'password_confirmation' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.max'                   => 'Le nom ne peut pas dépasser 255 caractères.',
            'email.email'                => 'L\'adresse e-mail n\'est pas valide.',
            'email.unique'               => 'Cette adresse e-mail est déjà utilisée.',
            'current_password.required_with' => 'Le mot de passe actuel est requis pour en définir un nouveau.',
            'password.min'               => 'Le nouveau mot de passe doit contenir au moins 8 caractères.',
            'password.confirmed'         => 'La confirmation du mot de passe ne correspond pas.',
        ];
    }
}
