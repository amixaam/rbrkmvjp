<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


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


// login
Route::post('/login', [AuthController::class, 'login']);

// api endpointus, ko var lietot, ja ir ielogojies
// GANDRĪZ VISIEM ENDPOINTIEM VAJADZĒTU BŪT ŠEIT
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // USERS
    Route::prefix('/users')->group(function () {
        // /users/"x"
        // PIEMĒRS: '/{user_id} = users/{user_id}'
        Route::get('/', [UserController::class, 'GetAllUsers']);
        Route::post('/', [UserController::class, 'CreateUser']);
        Route::put('/{user_id}', [UserController::class, 'UpdateUser']);
        Route::get('/{user_id}', [UserController::class, 'GetUser']);
        Route::delete('/{user_id}', [UserController::class, 'DeleteUser']);
    });

    // PRODUCTS
    Route::prefix('/products')->group(function () {
        // /products/"x"
        Route::get('/', [ProductController::class, 'getAllProducts']);
        Route::post('/', [ProductController::class, 'createProduct']);
        Route::put('/', [ProductController::class, 'updateProduct']);
        Route::get('/unassigned', [ProductController::class, 'getUnassignedProducts']);
        Route::get('/{product_id}', [ProductController::class, 'getProduct']);
        Route::get('/assigned/{user_id}', [ProductController::class, 'getAssignedProducts']);
        Route::delete('/{user_id}', [ProductController::class, 'DeleteProduct']);
    });


    // mesages
    Route::prefix('/messages')->group(function () {
        // /mesages/"x"
        Route::get('/options', [MessageController::class, 'GetUsernameOptions']);
        Route::get('/{user_id}', [MessageController::class, 'GetAllMessages']);
        Route::post('/', [MessageController::class, 'create']);
    });

    Route::prefix('/reports')->group(function () {
        // Route::get('/', [ReportController::class, 'getAllReports']);
        Route::post('/admin', [ReportController::class, 'createAdminReport']);
        Route::post('/manager', [ReportController::class, 'createManagerReport']);
        Route::post('/worker', [ReportController::class, 'createWorkerReport']);
    });

    Route::get('/storage/{path}', [ReportController::class, 'show'])->where('path', '.*');
    Route::get('/options', [ProductController::class, 'GetDropdownOptions']);
});
