<?php

namespace App\Services\Services;

use App\Http\Requests\ChatbotRequest;
use App\Http\Resources\ChatbotResource;
use App\Models\Message;
use App\Services\Constructors\ChatbotConstructor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use OpenAI\Client;
use OpenAI;

class ChatbotService implements ChatbotConstructor
{
    private $client;

    public function __construct()
    {
        $this->client = OpenAI::client(env('OPENAI_API_KEY'));
    }

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
        try {
            $response = $this->client->chat()->create([
                'model' => 'gpt-4',
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $input
                    ]
                ],
                'temperature' => 0.7,
                'max_tokens' => 500
            ]);

            return $response->choices[0]->message->content;
        } catch (\Exception $e) {
            Log::error('OpenAI Error: ' . $e->getMessage());
            return 'I apologize, but I encountered an error. Please try again later.';
        }
    }
}
