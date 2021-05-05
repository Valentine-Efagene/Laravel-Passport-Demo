<?php

use App\Http\Controllers\Auth_api\AuthController;
use App\Http\Controllers\DummyAPI;
use App\Http\Controllers\PostController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("get/{id}", [DummyAPI::class, 'get']);
Route::post('store', [DummyAPI::class, 'store']);

Route::apiResource('posts', PostController::class);


// create a user
Route::get('/user-create', function (Request $request) {
    User::create([
        'name' => 'Valentyne',
        'email' => 'efagenevalentine@gmail.com',
        'password' => Hash::make('#Valentyne101')
    ]);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// log in a user

// log out a user

// Chris On Code's setup
// monokai.pro
// cascadia code