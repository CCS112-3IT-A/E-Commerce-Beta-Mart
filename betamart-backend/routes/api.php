<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\QuantityController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('login',[UserController::class,'login']);
Route::post('addproduct',[ProductController::class,'addProduct']);
Route::get('list',[ProductController::class,'list']);
Route::get('product/{productId}',[ProductController::class,'getProduct']);
// routes/api.php

Route::put('/products/{productId}/quantity', [QuantityController::class, 'updateQuantity']);