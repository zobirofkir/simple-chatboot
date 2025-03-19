<?php

namespace App\Services\Services;

use App\Http\Requests\ChatbotRequest;
use App\Http\Resources\ChatbotResource;
use App\Models\Message;
use App\Services\Constructors\ChatbotConstructor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatbotService implements ChatbotConstructor
{
    public function index()
    {
        $messages = Message::where('user_id', Auth::id())->get();
        return ChatbotResource::collection($messages);
    }

    public function store(ChatbotRequest $request)
    {
        $validated = $request->validated();

        $user = Auth::user();
        $response = $this->generateResponse($validated['message']);

        $userMessage = Message::create([
            'user_id' => $user->id,
            'sender' => 'User',
            'text' => $validated['message'],
            'response' => $response
        ]);

        $botMessage = Message::create([
            'user_id' => $user->id,
            'sender' => 'Bot',
            'text' => $response,
            'response' => null
        ]);

        return [$userMessage, $botMessage];
    }

    private function generateResponse($input)
    {
        if (str_contains(strtolower($input), 'hello')) {
            return 'Hello! How can I assist you today?';
        }
        return 'I am just a simple bot. Try asking me something!';
    }

}
