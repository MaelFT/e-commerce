<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'admin' => \App\Http\Middleware\EnsureIsAdmin::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        $exceptions->render(function (Throwable $e, Request $request) {
            if (! $request->expectsJson()) {
                return null;
            }

            return match (true) {

                $e instanceof ValidationException => response()->json([
                    'message' => 'Les données envoyées sont invalides.',
                    'errors'  => $e->errors(),
                ], 422),

                $e instanceof AuthenticationException => response()->json([
                    'message' => 'Non authentifié. Veuillez vous connecter.',
                ], 401),

                $e instanceof NotFoundHttpException => response()->json([
                    'message' => 'La ressource demandée est introuvable.',
                ], 404),

                $e instanceof MethodNotAllowedHttpException => response()->json([
                    'message' => 'Méthode HTTP non autorisée sur cette route.',
                ], 405),

                $e instanceof HttpException => response()->json([
                    'message' => $e->getMessage() ?: 'Erreur HTTP.',
                ], $e->getStatusCode()),

                default => response()->json([
                    'message' => app()->isProduction()
                        ? 'Une erreur interne est survenue.'
                        : $e->getMessage(),
                ], 500),
            };
        });

    })->create();
