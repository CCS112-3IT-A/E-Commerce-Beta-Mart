<?php

namespace App\Http\Controllers;
use App\Models\webuser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    

    function login(Request $req)
    {

        $password = $req->input('password');
        $user= webuser::where('email', $req->email)->first();
      
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404); // User not found
        }

       if ($password !== $user->password) {
            return response()->json(['error' => 'Wrong password'], 401);
        }
    

        return $user;
    }
}
