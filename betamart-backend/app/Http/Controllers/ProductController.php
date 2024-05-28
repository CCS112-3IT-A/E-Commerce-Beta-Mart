<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    function addProduct(Request $req)
    {
        $product = new Product;
        $product->productName=$req->input('productName');
        $product->productPrice=$req->input('productPrice');
        $product->productDesc=$req->input('productDesc');
        $product->save();
        return $product;
    }

    function list()
    {
        return Product::all();
    }



    function updateProduct(Request $req, $id) {
        $product = Product::find($id);
    
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        } else {
            $product->productName = $req->input('productName');
            $product->productPrice = $req->input('productPrice');
            $product->productDesc = $req->input('productDesc');
            $product->save();
    
            return response()->json($product);
        }
    }


    public function removeProduct($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
        $product->delete();

        return response()->json(null, 204);
    }
    
}

