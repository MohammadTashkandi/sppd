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
Route::get('getProjectInfo','ProjectController@getProjectInfo');
Route::get('countSeverityForProject','ProjectController@countSeverityForProject'); //this function will receive request contain 'Pid' (Project id)
Route::get('getDuration','ProjectController@getDuration'); //this function will receive request contain 'Pid' (Project id)
Route::post('closeProject','ProjectController@closeProject'); //this function will receive request contain 'Pid' (Project id)
Route::get('checkClosed','ProjectController@checkClosed'); //this function will receive request contain 'Pid' (Project id)
Route::get('getFailedTasksForProject','ProjectController@getFailedTasksForProject'); //this function will receive request contain 'Pid' (Project id)
Route::get('getProgress','ProjectController@getProgress'); //this function will receive request contain 'Pid' (Project id)
Route::get('countStatusForProject','ProjectController@countStatusForProject'); //this function will receive request contain 'Pid' (Project id)


Route::get('findProgrammer','ProgrammerController@findProgrammer'); //for searching
Route::get('autocompleteSearch','ProgrammerController@autocompleteSearch'); //for searching for programmer in create task
Route::get('findEmployee','ProgrammerController@findEmployee'); //for assign task function
Route::get('getProgrammerProjects','ProgrammerController@getProgrammerProjects'); //gets projects for the programmer
Route::get('getProgrammerTasks','ProgrammerController@getProgrammerTasks'); //gets tasks for the programmer
Route::get('getProgrammerInfo','ProgrammerController@getProgrammerInfo'); //for view statistics page
Route::post('assignEmployee','ProgrammerController@assignEmployee');
Route::get('findTaskProgrammer','ProgrammerController@findTaskProgrammer'); // this function will receive request contain 'id'
Route::get('countSeverityForProgrammer','ProgrammerController@countSeverityForProgrammer'); //this function will receive request contain 'PrId' (Programmer id)
Route::get('countSeverityForProgrammerInProject','ProgrammerController@countSeverityForProgrammerInProject'); //this function will receive request contain 'PrId' (Programmer id) and 'Pid' (Project id)
Route::get('getFailedTasksForProgrammer','ProgrammerController@getFailedTasksForProgrammer'); //this function will receive request contain 'PrId' (Programmer id)
Route::get('getFailedTasksForProgrammerInProject','ProgrammerController@getFailedTasksForProgrammerInProject'); //this function will receive request contain 'PrId' (Programmer id) and 'Pid' (Project id)
Route::get('calculateProgrammerProductivity','ProgrammerController@calculateProgrammerProductivity'); //this function will receive request contain 'PrId' (Programmer id)
Route::get('getSkillGap','ProgrammerController@getSkillGap'); //this function will receive request contain 'PrId' (Programmer id)
Route::get('getMaxMinDeviation','ProgrammerController@getMaxMinDeviation'); //this function will receive request contain 'PrId' (Programmer id)
Route::get('countStatusForProgrammerInProject','ProgrammerController@countStatusForProgrammerInProject'); //this function will receive request contain 'PrId' (Programmer id) and 'Pid' (Project id)
Route::get('countStatusForProgrammer','ProgrammerController@countStatusForProgrammer'); //this function will receive request contain 'PrId' (Programmer id)


Route::post('addTask','TaskController@store');
Route::get('getTasks','TaskController@getTasks');
Route::get('getTaskInfo','TaskController@getTaskInfo');
Route::post('changeTaskStatus','TaskController@changeTaskStatus');
Route::post('setTaskStatusToClose','TaskController@setTaskStatusToClose'); // this function will receive request contain 'id'
Route::post('setTaskStatusToReOpened','TaskController@setTaskStatusToReOpened'); // this function will receive request contain 'id'
Route::post('rateTask','TaskController@rateTask'); // this function will receive request contain 'Tid' (task id)




//Route::post('register','UserController@getAuthenticatedUser');




Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

