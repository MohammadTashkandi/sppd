<?php

namespace App\Http\Controllers;

use App\Programmer;
use App\Project;
use App\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return view('Task.add_task');

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //

        $PrId = $request['PrId'];
        $Pid = $request['Pid'];

        $p = new Programmer();
        $p = $p->find($PrId);

        $project = new Project();
        $project = $project->find($Pid);

        if ($project == null) {
            return response()->json(['No project with this ID '], 400);
        }
//
        if ($p == null) {
            return response()->json(['No Programmer with this ID '], 400);
        }


        $task = Task::create([
            'title' => $request['title'],
            'PrID' => $request['PrId'],
            'Pid' => $request['Pid'],
            'severity' => $request['severity'],
            'tStr' => $request['tStr'],
            'tJud' => $request['tJud'],
            'tCu' => $request['tCu'],
            'tTech' => $request['tTech'],
            'Open_state' => Carbon::now(),
        ]);

        $task->save();
        $id = $task['id'];

        return response()->json(['Task Added Successfully', $id], 200);

    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Task $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Task $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Task $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Task $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        //
    }


    public function getTasks(Request $request)
    {

        $Pid = $request['Pid'];

        $tasks = Task::where('Pid', '=', $Pid)->get();

        if (count($tasks) > 0) {
            return response()->json($tasks, 200);
        } else {
            return response()->json('There is No Task', 404);
        }
    }


}
