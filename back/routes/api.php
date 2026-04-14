<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;

Route::get('/products',       [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

// Stripe webhook (no auth — verified via signature)
Route::post('/stripe/webhook', [CheckoutController::class, 'webhook']);

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
        Route::post('/logout',  [AuthController::class, 'logout']);
        Route::get('/me',       [AuthController::class, 'me']);
        Route::patch('/me',     [AuthController::class, 'updateProfile']);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/checkout/session', [CheckoutController::class, 'createSession']);
    Route::get('/orders',            [OrderController::class, 'index']);
    Route::get('/orders/{order}',    [OrderController::class, 'show']);
});
