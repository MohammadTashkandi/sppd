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
            'Assigned_state' => Carbon::now(),
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


    public function getDurationTasks(Request $request){

       //  $Pid= $request['Pid'];
       //  $getTask = Task::where('id',$Pid)->pluck('Open_state','Assigned_state');
        
       //  $openSt = $task['Open_state'];
        // $assingedSt = $task['Assigned_state'];
        // $theDiff =  $openSt
         //->diff($assingedSt)
         //->format('%H:%I:%S');

       //  $theDiff = preg_replace("/^([\d]{1,2})\:([\d]{2})$/", "00:$1:$2", $theDiff);
       //  sscanf($theDiff, "%d:%d:%d", $hours, $minutes, $seconds);
        // $theDiff_sec = $hours * 3600 + $minutes * 60 + $seconds;


    }



    public function changeTaskStatus(Request$request){


        $number = $request['number'];

        $task = Task::where('id', $request['id'])->first();
        if ($task == null) {
            return response()->json('ERROR', 404);
        }

        if ($task->status == 'New-assigned') {
            $task->status = 2;
            $assignTime = $task->Assigned_state;
            $time = Carbon::now();
            $task->inProgress_state = $time;
            $assignTime = Carbon::parse($assignTime);
            $task->AssignedDuration = $assignTime->diffInMinutes($time);
            $task->save();
            return response()->json('Progress', 200);


        } elseif ($task->status == 'inProgress_state') {
            $task->status = 3;
            $progressTime = $task->inProgress_state;
            $time = Carbon::now();
            $task->Resolved_state = $time;

            $progressTime = Carbon::parse($progressTime);
            $task->inProgressDuration = $progressTime->diffInMinutes($time);
            $task->save();
            return response()->json('Resolved', 200);


        } elseif ($task->status == 'Resolved_state' && $number == 1) {
            $task->status = 4;
            $ResolvedTime = $task->Resolved_state;
            $time = Carbon::now();
            $task->Closed_state = $time;
            $ResolvedTime = Carbon::parse($ResolvedTime);
            $task->ResolvedDuration = $ResolvedTime->diffInMinutes($time);
            $task->save();
            return response()->json('Closed', 200);

        } elseif ($task->status == 'Resolved_state' && $number ==2) {
            $task->status = 5;
            $ResolvedTime = $task->Resolved_state;
            $time = Carbon::now();
            $task->reOpen_state = $time;
            $ResolvedTime = Carbon::parse($ResolvedTime);
            $task->ResolvedDuration = $ResolvedTime->diffInMinutes($time);
            $task->save();

            return response()->json('Reopened', 200);

        } elseif ($task->status == 'reOpen_state') {
            $task->status = 5;
            $reOpen_state = $task->reOpen_state;
            $time = Carbon::now();
            $task->Closed_state = $time;
            $reOpen_state = Carbon::parse($reOpen_state);
            $task->reOpenDuration = $reOpen_state->diffInMinutes($time);
            $task->save();

            return response()->json('Closed', 200);



        }







    }

}
