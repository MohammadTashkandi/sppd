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
Route::get('getProgrammerProjects','ProgrammerController@getProgrammerProjects'); //gets projects for the programmer
Route::get('getProgrammerTasks','ProgrammerController@getProgrammerTasks'); //gets tasks for the programmer
Route::get('getProgrammerInfo','ProgrammerController@getProgrammerInfo'); //for view statistics page

Route::post('addTask','TaskController@store');
Route::get('getTasks','TaskController@getTasks');
Route::get('getTaskInfo','TaskController@getTaskInfo');

Route::post('assignEmployee','ProgrammerController@assignEmployee');


//Route::post('register','UserController@getAuthenticatedUser');

Route::get('getProgrammerProjects','ProgrammerController@getProgrammerProjects');
Route::get('getProgrammerInfo','ProgrammerController@getProgrammerInfo');
Route::post('changeTaskStatus','TaskController@changeTaskStatus');



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
