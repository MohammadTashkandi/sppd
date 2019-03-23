<?php

namespace App\Http\Controllers;

use App\Programmer;
use App\ProjectManager;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

 use Tymon\JWTAuth\Facades\JWTAuth;
 use Tymon\JWTAuth\Facades\JWTFactory;
 use Tymon\JWTAuth\Exceptions\JWTException;
 use Tymon\JWTAuth\Contracts\JWTSubject;
 use Tymon\JWTAuth\JWTManager as JWT;
   use Tymon\JWTAuth\PayloadFactory;

   class UserController extends Controller {

     public function register(Request $request){   
    
      $email = $request['email'];
      
      if(!(filter_var($email, FILTER_VALIDATE_EMAIL))) {
        return response()->json(['Incorrect email format entered!'], 401);
      }

      if (Programmer::where('email', '=', $email)->exists() || User::where('email', '=', $email)->exists()) {
             return response()->json(['Email already used'], 401);
      }

      $pass = $request['password'];

      if(strlen($pass) < 6) {
        return response()->json(['Password must be at least 6 characters'], 400);
      }

       $user = User::create([
        'name' => $request->json()->get('name'),
        'email' => $request->json()->get('email'),
        'password' => Hash::make($request->json()->get('password')),
        'nationality' => $request->json()->get('nationality'),
        'age' => $request->json()->get('age'),
        'phone_number' => $request->json()->get('phone_number'),


       ]);

      $token = JWTAuth::fromUser($user);

      return response()->json(compact('user', 'token'),201);
     }





     public function addProgrammer(Request $request){   
    
      $email = $request['email'];
      
      if(!(filter_var($email, FILTER_VALIDATE_EMAIL))) {
        return response()->json(['Incorrect email format entered!'], 401);
      }

      if (Programmer::where('email', '=', $email)->exists()  || User::where('email', '=', $email)->exists() ) {
             return response()->json(['Email already used'], 401);
      }

      $pass = $request['password'];

      if(strlen($pass) < 6) {
        return response()->json(['Password must be at least 6 characters'], 400);
      }

       $programmer = Programmer::create([
        'first_name' => $request->json()->get('first_name'),
        'last_name' => $request->json()->get('last_name'),
        'email' => $request->json()->get('email'),
        'password' => Hash::make($request->json()->get('password')),
        'nationality' => $request->json()->get('nationality'),
        'age' => $request->json()->get('age'),
        'pStr' => $request->json()->get('pStr'),
        'pJud' => $request->json()->get('pJud'),
        'pCu' => $request->json()->get('pCu'),
        'pTech' => $request->json()->get('pTech'),
        'PMid' => $request->json()->get('PMid'),
       ]);

      $token = JWTAuth::fromUser($programmer);

      return response()->json(compact('programmer', 'token'),201);
     }







     public function login(Request $request){
          $email = $request['email'];
      if(Programmer::where('email', '=' ,$email )->first()!= null ){

        // $credentials = $request->json()->all();

        // try{
          
        //   if(! $token = JWTAuth::attempt($credentials)){
        //     return response()->json(['error' => 'invalid credentials'], 400);
        //   }
        // }catch(JWTException $e){
        //   return response()->json(['error' => 'could_not_create_token'], 500);
        // }
        
 
        // $PM = User::where('email',$request['email'])->first();
        // $Programmer = Programmer::where('email',$request['email'])->first();
 
 
        
        // if( $PM  != null){
        //   $id = $PM->id;
        //  return response()->json(compact('token','id'),201);
        // }
        
        // else if( $prpgrammer != null){
        //  $id = $programmer->id;
        //  return response()->json(compact('token','id'),200);
 
        // }



      }elseif(User::where('email', '=' ,$email )->first()!= null){
        
        $credentials = $request->json()->all();

        try{
          
          if(! $token = JWTAuth::attempt($credentials)){
            return response()->json(['error' => 'invalid credentials'], 400);
          }
        }catch(JWTException $e){
          return response()->json(['error' => 'could_not_create_token'], 500);
        }
        
 
        $PM = User::where('email',$request['email'])->first();
        $Programmer = Programmer::where('email',$request['email'])->first();
 
 
        
        if( $PM  != null){
          $id = $PM->id;
         return response()->json(compact('token','id'),201);
        }
        
        else if( $prpgrammer != null){
         $id = $programmer->id;
         return response()->json(compact('token','id'),200);
 
        }

      }
      return response()->json(['error' => 'Wrong user '], 500);

<<<<<<< HEAD




       
=======
         if(! $token = JWTAuth::attempt($credentials)){
           return response()->json(['error' => 'invalid credentials'], 400);
         }
       }catch(JWTException $e){
         return response()->json(['error' => 'could_not_create_token'], 500);
       }
       

       $PMid = User::where('email',$request['email']) -> first() ->id;
       $Pid = Programmer::where('email',$request['email']) -> first() ->id;



       if( $PMid  != null){
        return response()->json(compact('token','PMid'),201);
       }
       
       else if( $Pid != null){
        return response()->json(compact('token','Pid'),200);

       }
>>>>>>> 3c6df9dfed1b8e27ceca92896a76e9c8a1a1b60f

       


     }
     public function getAuthenticatedUser(){

       try{

         if(!User == JWTAuth::parseToken()->Authenticatae()){

           return response()->json(['user_not_found'], 404);

         }
       }catch(Tymon\JWTAuth\Exceptions\TokenExpiredException $e){
         return response()->json(['token_expired'],$e->getStatusCode());
       } catch(Tymon\JWTAuth\Exceptions\TokenInvalidException $e){
         return response()->json(['token_invalid'],$e->getStatusCode());
       }catch(Tymon\JWTAuth\Exceptions\JWTException $e){
         return response()->json(['token_absent'],$e->getStatusCode());
       }
       return response()->json(compact('user'));
     }

   }