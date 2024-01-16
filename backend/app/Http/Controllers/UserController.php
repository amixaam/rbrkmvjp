<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function GetAllUsers()
    {
        // $csrf = csrf_token();
        // return response()->json(["token" => $csrf]);

        $users = User::all();
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
            // Validation
            $request->validate([
                'role_id' => 'nullable|exists:roles,id',
                'name' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6',
            ]);

            $user = new User([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => bcrypt($request->input('password')),
            ]);

            $user->role_id = $request->input('role_id', 3);;

            $user->save();

            return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }
    }


    public function UpdateUser(Request $request, $user_id)
    {
        try {
            // Validation
            $request->validate([
                'role_id' => 'nullable|integer|exists:roles,id',
                'name' => 'nullable|string',
                'email' => 'nullable|email|unique:users,email,' . $user_id,
                'password' => 'nullable|string|min:6', // password validation
            ]);

            $user = User::find($user_id);

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            // update foreign keys
            if ($request->has('role_id')) {
                $user->role_id = $request->input('role_id');
            }

            // Update other
            $user->update([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => bcrypt($request->input('password')),
            ]);

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

    public function ValidateLogin(Request $request)
    {
        // validācija
        $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
        ]);

        if (!filter_var($request->input('login'), FILTER_VALIDATE_EMAIL)) {
            return response()->json(['message' => 'Invalid email address'], 400);
        }


        $credentials = [
            'email' => $request->input('login'),
            'password' => $request->input('password'),
        ];

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json(['message' => 'Login successful', 'user' => $user]);
        } else {
            return response()->json(['message' => 'Invalid login credentials'], 401);
        }
    }
}
