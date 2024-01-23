<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    //getAllMessages, postMessage
    public function create(Request $request)
    {
        return response()->json(['message' => 'Message sent successfully']);

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
            // Log exception
            \Illuminate\Support\Facades\Log::error('Exception: ' . $exception->getMessage());
    
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }        
}
