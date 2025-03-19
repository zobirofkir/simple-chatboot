<?php

namespace App\Services\Constructors;

use App\Http\Requests\ChatbotRequest;
use Illuminate\Http\Request;

interface ChatbotConstructor
{
    public function index();


    public function store(ChatbotRequest $request);
}
