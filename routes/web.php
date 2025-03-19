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
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
