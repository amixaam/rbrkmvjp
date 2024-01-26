<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{


    public function GetAllUsers()
    {
        $users = User::with('role')->get();
        return response()->json($users);
    }

    public function GetUser($user_id)
    {
        $user = User::find($user_id);

        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function CreateUser(Request $request)
    {
        try {
            $request->validate([
                'role_id' => 'nullable|exists:roles,id',
                'email' => 'required|email|unique:users,email',
                'username' => 'required|string',
                'password' => 'required|min:6',
            ]);

            User::create([
                'username' => $request->input('username'),
                'role_id' => $request->input('role_id'),
                'email' => $request->input('email'),
                'password' => bcrypt($request->input('password')),
            ]);



            return response()->json(['message' => "User created successfully!"], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'User creation failed.' . $e], 500);
        }
    }

    public function UpdateUser(Request $request, $user_id)
    {
        // return response()->json(request()->all());
        try {
            // Validation
            $request->validate([
                'role_id' => 'nullable|integer|exists:roles,id',
                'email' => 'nullable|email|unique:users,email,' . $user_id,
                'username' => 'required|string',
                'password' => 'nullable|string|min:6', // password validation
            ]);

            $user = User::find($user_id);

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            // Update other

            if ($request->input('password')) {
                $user->update([
                    'role_id' => $request->input('role_id'),
                    'username' => $request->input('username'),
                    'email' => $request->input('email'),
                    'password' => bcrypt($request->input('password')),
                ]);
            } else {
                $user->update([
                    'role_id' => $request->input('role_id'),
                    'username' => $request->input('username'),
                    'email' => $request->input('email'),
                ]);
            }

            return response()->json(['message' => 'User updated successfully']);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }
    }


    public function DeleteUser($user_id)
    {
        $user = User::find($user_id);

        if ($user) {
            $user->delete();

            return response()->json(['message' => 'User deleted successfully']);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}
