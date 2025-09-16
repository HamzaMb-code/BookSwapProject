<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\RequestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signUp', [StudentController::class, "signUp"]);
Route::post('/login', [StudentController::class, "login"]);

// Book routes
Route::get('/books', [BookController::class, "index"]);
Route::get('/books/{id}', [BookController::class, "show"]);
Route::delete('/books/{id}', [BookController::class, "destroy"]);

// Exchange request routes
Route::get('/books/{id}/exchange-count', [RequestController::class, 'getExchangeCount']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/books', [BookController::class, 'store']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Protected exchange request routes
    Route::post('/exchange-requests', [RequestController::class, 'store']);
    Route::get('/exchange-requests', [RequestController::class, 'index']);
    Route::put('/exchange-requests/{exchangeRequest}', [RequestController::class, 'updateStatus']);
});

// Route::middleware(['auth:sanctum'])->group(function () {
//     Route::apiResource('books', BookController::class);
// });
