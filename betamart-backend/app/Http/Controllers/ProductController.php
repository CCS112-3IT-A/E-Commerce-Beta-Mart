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


    function delete($productId)
    {

        return $productId;
    }

    function getProduct($productId)
    {
        return Product::find($productId);

    }


    
}


