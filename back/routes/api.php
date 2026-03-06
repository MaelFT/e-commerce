<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/hello', fn () => response()->json([
    'message' => 'Hello World depuis Laravel 12 !',
    'status'  => 'ok',
    'db'      => 'PostgreSQL',
]));

/*
|--------------------------------------------------------------------------
| Routes admin — protégées par auth:sanctum + middleware admin
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Exemple : Route::get('/users', [UserController::class, 'index']);
});

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me',      [AuthController::class, 'me']);
    });
});
