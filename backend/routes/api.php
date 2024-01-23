<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', [UserController::class, 'GetAllUsers']);
Route::put('/{user_id}', [UserController::class, 'UpdateUser']);
Route::get('/{user_id}', [UserController::class, 'GetUser']);
Route::post('/', [UserController::class, 'CreateUser']);
Route::delete('/{user_id}', [UserController::class, 'DeleteUser']);
Route::post('/login', [UserController::class, 'ValidateLogin']);
Route::post('/messages', [MessageController::class, 'create']);
