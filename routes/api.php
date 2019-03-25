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
Route::post('addProgrammer','UserController@addProgrammer');

Route::post('storeProject','ProjectController@store');
Route::get('findProject','ProjectController@findProject');

Route::get('findProgrammer','ProgrammerController@findProgrammer'); //for searching
Route::get('autocompleteSearch','ProgrammerController@autocompleteSearch'); //for searching for programmer in create task
Route::get('findEmployee','ProgrammerController@findEmployee'); //for assign task function

Route::post('addTask','TaskController@store');
Route::get('getTasks','TaskController@getTasks');

Route::post('assignEmployee','ProgrammerController@assignEmployee');


//Route::post('register','UserController@getAuthenticatedUser');

Route::get('getProgrammerProjects','ProgrammerController@getProgrammerProjects');
Route::get('getProgrammerInfo','ProgrammerController@getProgrammerInfo');



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
