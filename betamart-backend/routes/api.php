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
Route::post('register',[UserController::class,'register']);
Route::get('userList',[UserController::class,'userList']);
Route::put('/updateUser/{id}', [UserController::class, 'updateUser']);
Route::delete('/removeUser/{id}', [UserController::class, 'removeUser']);



Route::post('addproduct',[ProductController::class,'addProduct']);
Route::get('list',[ProductController::class,'list']);
Route::get('product/{productId}',[ProductController::class,'getProduct']);
//Route::put('/products/{productId}/quantity', [QuantityController::class, 'updateQuantity']);

Route::put('/updateProduct/{id}', [ProductController::class, 'updateProduct']);
Route::delete('/removeProduct/{id}', [ProductController::class, 'removeProduct']);