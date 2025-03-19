<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class ChatbotController extends Controller
{
    public function index()
    {
        return inertia('Chatbot', [
            'messages' => Message::where('user_id', Auth::id())->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['message' => 'required|string']);

        $user = Auth::user();
        $response = $this->generateResponse($request->message);

        $message = Message::create([
            'user_id' => $user->id,
            'sender' => 'User',
            'text' => $request->message,
            'response' => $response
        ]);

        Message::create([
            'user_id' => $user->id,
            'sender' => 'Bot',
            'text' => $response,
            'response' => null
        ]);

        return redirect('/chat');
    }

    private function generateResponse($input)
    {
        if (str_contains(strtolower($input), 'hello')) {
            return 'Hello! How can I assist you today?';
        }
        return 'I am just a simple bot. Try asking me something!';
    }
}
