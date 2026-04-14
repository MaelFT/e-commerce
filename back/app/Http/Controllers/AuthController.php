<?php

namespace App\Http\Controllers;

use App\Actions\Auth\LoginAction;
use App\Actions\Auth\LogoutAction;
use App\Actions\Auth\RegisterAction;
use App\Actions\Auth\UpdateProfileAction;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\UpdateProfileRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(RegisterRequest $request, RegisterAction $action): JsonResponse
    {
        $result = $action($request->validated());

        return response()->json($result, 201);
    }

    public function login(LoginRequest $request, LoginAction $action): JsonResponse
    {
        $result = $action($request->validated());

        return response()->json($result);
    }

    public function logout(Request $request, LogoutAction $action): JsonResponse
    {
        $action($request->user());

        return response()->json(['message' => 'Déconnecté avec succès.']);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }

    public function updateProfile(UpdateProfileRequest $request, UpdateProfileAction $action): JsonResponse
    {
        $user = $action($request->user(), $request->validated());

        return response()->json($user);
    }
}
