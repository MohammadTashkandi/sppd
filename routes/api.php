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

Route::get('findProgrammer','ProgrammerController@findProgrammer');
Route::get('findEmployee','ProgrammerController@findEmployee');
Route::post('addProgrammer','ProgrammerController@store');

Route::post('addTask','TaskController@store');
Route::get('getTasks','TaskController@getTasks');

//Route::post('assignEmployee','Works_OnController@store'); im not sure where the controller for works on is so please fix this


//Route::post('register','UserController@getAuthenticatedUser');



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
