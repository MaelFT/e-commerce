<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class AccountDisabledException extends Exception
{
    public function render(): JsonResponse
    {
        return response()->json([
            'message' => 'Votre compte a été désactivé. Contactez le support.',
        ], 403);
    }
}
