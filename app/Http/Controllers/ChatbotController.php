<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChatbotRequest;
use Illuminate\Http\Request;
use App\Models\Message;
use App\Services\Facades\ChatbotFacade;
use Illuminate\Support\Facades\Auth;

class ChatbotController extends Controller
{
    public function index()
    {
        $messages = ChatbotFacade::index();
        return inertia('Chatbot', compact('messages'));
    }

    public function store(ChatbotRequest $request)
    {
        ChatbotFacade::store($request);

        return redirect('/chat');
    }

}
