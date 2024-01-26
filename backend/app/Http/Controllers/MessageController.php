<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    //getAllMessages, postMessage
    public function create(Request $request)
    {
        // return response()->json($request);

        try {
            // Validate the request data
            $request->validate([
                'from_user_id' => 'required|exists:users,id',
                'to_user_id' => 'required|exists:users,id|different:from_user_id',
                'title' => 'required|string',
                'content' => 'required|string',
            ]);

            // Create a new message
            Message::create([
                'from_user_id' => $request->input('from_user_id'),
                'to_user_id' => $request->input('to_user_id'),
                'title' => $request->input('title'),
                'content' => $request->input('content'),
            ]);

            return response()->json(['message' => 'Message sent successfully']);
        } catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }
    public function GetAllMessages($user_id)
    {
        // Retrieve messages with the username of the sender and format created_at
        $matchingMessages = Message::where('to_user_id', $user_id)
            ->leftJoin('users', 'messages.from_user_id', '=', 'users.id')
            ->select(
                'messages.*',
                'users.username as from_username',
                DB::raw("DATE_FORMAT(messages.created_at, '%d-%m-%Y') as formatted_created_at")
            )
            ->get();

        return response()->json($matchingMessages);
    }

    public function GetUsernameOptions()
    {
        // Get the current authenticated user
        $currentUser = Auth::user();

        // Get all users with roles greater than or equal to 2
        $users = User::with('role')
            ->where('role_id', '>=', 2)
            ->where('id', '!=', $currentUser->id) // Exclude the current user
            ->get();

        // Format the results as {"user_id": "username"}
        $formattedUsers = $users->pluck('username', 'id');

        return response()->json($formattedUsers);
    }
}
