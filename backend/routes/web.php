<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoreOriginalBooks;


Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__ . '/auth.php';


// Route::get('/create-owner', function () {
//     \App\Models\Student::create([
//         'name' => 'Admin',
//         'email' => 'admin@bookswap.com',
//         'password' => bcrypt('adminpassword'),
//         'role' => 'admin',
//     ]);
// });
// http://localhost:8000/create-owner



Route::get('/store-books', [StoreOriginalBooks::class, 'StoreOriginalBooks']);
