<?php

use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/chat', [ChatbotController::class, 'index'])->name('chat');
    Route::post('/chat', [ChatbotController::class, 'store']);
});

Route::middleware(['auth'])->group(function () {
    Route::post('/chats/create', [ChatController::class, 'create']);
    Route::get('/chats/{chat}', [ChatController::class, 'show']);
    Route::post('/chat', [ChatController::class, 'sendMessage']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
