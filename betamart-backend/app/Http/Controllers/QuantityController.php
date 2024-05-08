<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuantityController extends Controller
{
    public function updateQuantity(Request $request, $productId)
    {
        $product = Product::findOrFail($productId);
        $action = $request->input('action');
        $quantity = $request->session()->get("quantity.{$productId}", 1); // Initialize with 1 if not set

        if ($action === 'increment') {
            $quantity++;
        } elseif ($action === 'decrement') {
            if ($quantity > 1) {
                $quantity--;
            }
        }

        $request->session()->put("quantity.{$productId}", $quantity);

        return response()->json([
            'quantity' => $quantity,
            'total_price' => $product->price * $quantity
        ]);
    }
}
