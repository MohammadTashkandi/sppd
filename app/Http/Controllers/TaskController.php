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
//        dd(Input::get('Stress'));


        $PrId = $request['PrID'] ;
        $Pid =$request['Pid'];

        $p = new Programmer();
        $p = $p->find($PrId);

        $project = new Project();
        $project = $project->find($Pid);

        if($project == null){
            return response()->json(['No project with this ID '], 404);
        }

        if ($p  == null) {
            return response()->json(['No Programmer with this ID '], 404);
        }


        $task = Task::create([
            'title' => $request['title'],
            'PrID' => $request['PrID'],
            'Pid' => $request['Pid'],
            'severity' => $request['severity'],
            'tStr' => $request['tStr'],
            'tJud' => $request['tJud'],
            'tCu' => $request['tCu'],
            'tTech' => $request['tTech'],
            'Open_state' => Carbon::now(),
        ]);

        $task->save();

        return response()->json(['Task Added Successfully '], 200);


//        $PrId = $request['PrId'] ;
//        $Pid =$request['Pid'];
//
//        if (Programmer::where('id', '=', $PrId) == null) {
//            return response()->json(['No Programmer with this ID '], 404);
//        }
//
//        if (Project::where('id', '=', $Pid) == null) {
//            return response()->json(['No project with this ID '], 404);
//        }
//
//
//        $task = Task::create([
//            'title' => $request['title'],
//            'PrId' => $request['PrId'],
//            'Pid' => $request['Pid'],
//            'severity' => $request['severity'],
//            'tStr' => $request['tStr'],
//            'tJud' => $request['tJud'],
//            'tCu' => $request['tCu'],
//            'tTech' => $request['tTech'],
//            'Open_state' => Carbon::now(),
//        ]);
//
//        $task->save();
//
//        return response()->json(['Task Added Successfully '], 200);
//



//        $task = new Task();
//        $task->PrId     =$request['PrId'];
//        $task->Pid      =$request['Pid'];
//        $task->title    =$request['title'];
//        $task->severity =$request['severity'];
//        $task->tStr     =$request['tStr'];
//        $task->tJud     =$request['tJud'];
//        $task->tCu      =$request['tCu'];
//        $task->tTech    =$request['tTech'];
//        $task->Open_state = Carbon::now();
//
//        $task->save();
//
//        return response()->json('task');

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
}
