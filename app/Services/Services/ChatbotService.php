<?php

namespace App\Services\Services;

use App\Http\Requests\ChatbotRequest;
use App\Http\Resources\ChatbotResource;
use App\Models\Message;
use App\Services\Constructors\ChatbotConstructor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class ChatbotService implements ChatbotConstructor
{
    private $apiKey;
    private $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    public function __construct()
    {
        $this->apiKey = env('GEMINI_API_KEY');
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
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($this->baseUrl . '?key=' . $this->apiKey, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $input]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.7,
                    'maxOutputTokens' => 500,
                ]
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return $data['candidates'][0]['content']['parts'][0]['text'] ??
                       'I apologize, but I encountered an error processing your request.';
            }

            Log::error('Gemini API Error: ' . $response->body());
            return 'I apologize, but I encountered an error. Please try again later.';
        } catch (\Exception $e) {
            Log::error('Gemini Error: ' . $e->getMessage());
            return 'I apologize, but I encountered an error. Please try again later.';
        }
    }
}
