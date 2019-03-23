<?php

use Illuminate\Http\Request;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('register','UserController@register');
Route::post('login','UserController@login');

Route::post('storeProject','ProjectController@store');
Route::get('findProject','ProjectController@findProject');

<<<<<<< HEAD
Route::get('findProgrammer','ProgrammerController@findProgrammer');
Route::get('findEmployee','ProgrammerController@findEmployee');
Route::post('addProgrammer','UserController@addProgrammer');
=======
Route::get('findProgrammer','ProgrammerController@findProgrammer'); //for searching
Route::get('autocompleteSearch','ProgrammerController@autocompleteSearch'); //for searching for programmer in create task
Route::get('findEmployee','ProgrammerController@findEmployee'); //for assign task function
Route::post('addProgrammer','ProgrammerController@store');
>>>>>>> 3c6df9dfed1b8e27ceca92896a76e9c8a1a1b60f

Route::post('addTask','TaskController@store');
Route::get('getTasks','TaskController@getTasks');

Route::post('assignEmployee','ProgrammerController@assignEmployee');


//Route::post('register','UserController@getAuthenticatedUser');



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
