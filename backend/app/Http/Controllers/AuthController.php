<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // return response()->json($request->all());

        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if (!Auth::attempt($request->only('email', 'password'))) {
                throw ValidationException::withMessages([
                    'email' => ['Invalid credentials.'],
                ]);
            }

            $user = $request->user();
            $userData = [
                'user_id' => $user->id,
                'role_id' => $user->role_id,
            ];

            $token = $user->createToken('perms', ['*'], now()->addWeek());

            return response()->json([
                'token' => $token->plainTextToken,
                'user' => $userData,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Login failed.' . $e], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
