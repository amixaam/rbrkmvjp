<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// users

Route::group(
    ['prefix' => 'users'],
    function () {
        Route::get('/', [UserController::class, 'GetAllUsers']);
        Route::put('/{user_id}', [UserController::class, 'UpdateUser']);
        Route::get('/{user_id}', [UserController::class, 'GetUser']);
        Route::post('/', [UserController::class, 'CreateUser']);
        Route::delete('/{user_id}', [UserController::class, 'DeleteUser']);
        Route::post('/login', [UserController::class, 'ValidateLogin']);
    }
);
