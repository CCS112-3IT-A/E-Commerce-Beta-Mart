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



    function register(Request $req){

        $user= new webuser;
        $user -> email = $req->input('email');
        $user -> password = $req->input('password');
        $user->save();

        return $user;
    }

    function userList(){

        return webuser::all();

    }



    function updateUser(Request $req, $id) {
        
        $user = webuser::find($id);
    
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        } else {
            $user -> email = $req->input('email');
            $user -> password = $req->input('password');
            
            $user->save();
    
            return response()->json($user);
        }
    }



    public function removeUser($id)
    {
        $user = webuser::find($id);


        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->delete();
        
        return response()->json(null, 204);
    }


}