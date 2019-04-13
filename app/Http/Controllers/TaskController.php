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
            'status' => 2,
            'Assigned_state' => Carbon::now(),
        ]);

        $task->save();
        $id = $task['id'];

        return response()->json(['Task Added Successfully', $id], 200);

    }

    public function getTaskInfo(Request $request)
    {
        $t = Task::where('id', '=', $request['id']);

        if ($t == null) {
            return response()->json(['task not exist'], 404);
        }

        $t = $t->first();

        return response()->json($t, 200);


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


    public function getDurationTasks(Request $request)
    {

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


    public function changeTaskStatus(Request $request)
    {


        $task = Task::where('id', $request['id'])->first();
        if ($task == null) {
            return response()->json('ERROR', 404);
        }

        if ($task->status == 'New-assigned') {
            $task->status = 3;
            $assignTime = $task->Assigned_state;
            $time = Carbon::now();
            $task->inProgress_state = $time;
            $assignTime = Carbon::parse($assignTime);
            $task->AssignedDuration = $assignTime->diffInMinutes($time);
            $task->save();
            $status = 'Progress';
            return response()->json($status, 200);


        } else if ($task->status == 'Progress') {
            $task->status = 4;
            $progressTime = $task->inProgress_state;
            $time = Carbon::now();
            $task->Resolved_state = $time;

            $progressTime = Carbon::parse($progressTime);
            $task->inProgressDuration =$task->inProgressDuration + $progressTime->diffInMinutes($time);
            $task->save();
            $status = 'Resolved';
            return response()->json($status, 200);

        } else if ($task->status == 'Re-Opened') {
            $task->status = 3;
            $reOpenTime = $task->reOpen_state;
            $time = Carbon::now();

            $task->inProgress_state = $time;
            $reOpenTime = Carbon::parse($reOpenTime);
            $task->reOpenDuration = $reOpenTime->diffInMinutes($time);
            $task->save();
            $status = 'Progress';
            return response()->json($status, 200);


        }
    }


    public function setTaskStatusToClose(Request $request)
    {
        $task = Task::where('id', $request['id'])->first();
        if ($task == null) {
            return response()->json('ERROR', 404);
        }


        $task->status = 5;
        $ResolvedTime = $task->Resolved_state;
        $time = Carbon::now();
        $task->Closed_state = $time;
        $ResolvedTime = Carbon::parse($ResolvedTime);
        $task->ResolvedDuration = $ResolvedTime->diffInMinutes($time);
        $task->save();

        // add 1 to numOfTasks for this programmer
        $p = Programmer::where('id', $task->PrID)->first();
        $p->numOfTasks = $p->numOfTasks + 1 ;
        $p->save();

        $status = 'Closed';
        return response()->json($status, 200);

    }


    public function setTaskStatusToReOpened(Request $request){


        $task = Task::where('id', $request['id'])->first();
        if ($task == null) {
            return response()->json('ERROR', 404);
        }

        $task->status = 6;
        $ResolvedTime = $task->Resolved_state;
        $time = Carbon::now();
        $task->reOpen_state = $time;
        $ResolvedTime = Carbon::parse($ResolvedTime);
        $task->ResolvedDuration = $ResolvedTime->diffInMinutes($time);
        $task->save();

        // add 1 to failedTask for this programmer
        $p = Programmer::where('id', $task->PrID)->first();
        $p->failedTasks = $p->failedTasks + 1 ;
        $p->save();

        // add 1 to failedTask for this project
        $project = Project::where('id', $task->Pid)->first();
        $project->failedTasks = $project->failedTasks +1 ;
        $project->save();


        $status = 'Re-Opened';
        return response()->json($status, 200);

    }


    public function rateTask(Request $request)
    {


        $task = Task::where('id' , $request['tID'])->first();
        $programmer = Programmer::where('id', $task->PrID)->first();

        if($task == null || $programmer == null){
            return response()->json(['ERROR'], 404);
        }

        $actualTStr = $request['pStr'];
        $actualTJud = $request['pJud'];
        $actualTCu = $request['pCu'];
        $actualTTech = $request['pTech'];


        $task->actualTStr = $actualTStr;
        $task->actualTJud =$actualTJud;
        $task->actualTCu =$actualTCu;
        $task->actualTTech =$actualTTech;

        $tStrDeviation = ($actualTStr-$task->tStr) /$task->tStr;
        $tJudDeviation = ($actualTJud-$task->tJud) /$task->tJud;
        $tCuDeviation = ($actualTCu-$task->tCu) /$task->tCu;
        $tTechDeviation = ($actualTTech-$task->tTech) /$task->tTech;


        $task->tStrDeviation  =  number_format((float)$tStrDeviation, 2, '.', '');
        $task->tJudDeviation  =  number_format((float)$tJudDeviation, 2, '.', '');
        $task->tCuDeviation   =  number_format((float)$tCuDeviation, 2, '.', '');
        $task->tTechDeviation =  number_format((float)$tTechDeviation, 2, '.', '');
        $task->update();

        $value = 0 ;


        if($task->severity == 'Text'){
            $value = 1;
        }elseif ($task->severity =='Trivial'){
            $value = 2;
        }elseif ($task->severity == 'Tweak '){
            $value =3;
        }elseif ($task->severity == 'Minor') {
            $value =4;
        }elseif ($task->severity =='Feature  ') {
            $value =5;
        } elseif ($task->severity == 'Major ') {
            $value =6;
        } elseif ($task->severity == 'Crash ') {
            $value =7;
        } elseif ($task->severity == 'Block') {
            $value =8;
        }
//        numOfTasks



        $tech = $actualTTech * $value /8 ;

        $programmer->pStrSum = $programmer->pStrSum + $actualTStr ;
        $programmer->pJudSum = $programmer->pJudSum + $actualTJud;
        $programmer->pCuSum = $programmer->pCuSum + $actualTCu;
        $programmer->pTechSum =$programmer->pTechSum + $tech ;
        $programmer->update();

        // calculate programmer performance
        $programmer->pStr = $programmer->pStrSum / ($programmer->numOfTasks+1); // +1 because we give the rate programmer first without finish any task
        $programmer->pJud = $programmer->pJudSum / ($programmer->numOfTasks+1);
        $programmer->pCu = $programmer->pCuSum / ($programmer->numOfTasks+1);
        $programmer->pTech = $programmer->pTechSum / ($programmer->numOfTasks+1);
        $programmer->update();

        return response()->json($task, 200);


    }






}
