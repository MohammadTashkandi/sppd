<?php

namespace App\Http\Controllers;

use App\Programmer;
use App\Project;
use App\Task;
use App\User;
use Carbon\Carbon;
use function GuzzleHttp\Promise\all;
use http\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class ProgrammerController extends Controller
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

        return view('Programmer.add_programmer_form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $programmerEmail = $request['email'];

        if (!(filter_var($programmerEmail, FILTER_VALIDATE_EMAIL))) {
            return response()->json(['Incorrect email format entered!'], 400);
        }

        if (User::where('email', '=', $programmerEmail)->exists()) {
            return response()->json(['This email is already in use'], 400);
        }

        if (Programmer::where('email', '=', $programmerEmail)->exists()) {
            return response()->json(['This email is already in use'], 400);
        }

        $pass = $request['password'];

        if (strlen($pass) < 6) {
            return response()->json(['Password must be at least 6 characters'], 400);
        }

        // check if the project is exist
        //-----------------------------------------------------------------------
//        $Pid = $request['Pid'];
//        $project = new Project();
//        $project = $project->find($Pid);
//
//        if ($project = null) {
//            return response()->json(['there is no project with this ID '], 404);
//        }

        // to get project Manager ID
        /* $user = Auth::user();
        $userID = $user->id;  */


        //add nationality and phone number
        $programmer = Programmer::create([
            'first_name' => $request['firstName'],
            'last_name' => $request['lastName'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
            'pStr' => $request['pStr'],
            'pJud' => $request['pJud'],
            'pCu' => $request['pCu'],
            'pTech' => $request['pTech'],
            'PMid' => $request['PMid'],
        ]);

        $programmer->save();

        return response()->json(['Programmer added Successfully '], 201);


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Programmer $programmer
     * @return \Illuminate\Http\Response
     */
    public function show(Programmer $programmer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Programmer $programmer
     * @return \Illuminate\Http\Response
     */
    public function edit(Programmer $programmer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Programmer $programmer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Programmer $programmer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Programmer $programmer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Programmer $programmer)
    {
        //
    }


    public function findProgrammer(Request $request)
    {


        $input = $request['id'];
        $PMid = $request['PMid'];

        $Programmers = Programmer::where('PMid', '=', $PMid)->get();


        if (is_numeric($input)) {
            $programmer = $Programmers->where('id', '=', $input);
            if ($programmer != null) {
                $programmer = $programmer->all();
                return response()->json($programmer, 200);
            }
        } else {


            $Programmers = Programmer::where('PMid', '=', $PMid)->where('first_name', 'like', '%' . $input . '%')->orWhere('last_name', 'like', '%' . $input . '%')->get();

            if (count($Programmers) > 0) {
                return response()->json($Programmers, 200);
            }

        }

        return response()->json(['Programmer not found'], 404);


//        $user = new User();
//        if(is_numeric($input)){
//
//            $user = $user->role = 'Programmer';
//
//            if($user != null){
//                return response()->json($user);
//            }
//
//        }
//        $programmer = Programmer::where('Username', 'like', '%' . $inputString . '%')
//                   ->select('Username','user_id')
//                   ->get();
//        if (count($programmer) > 0 ){
//
//            return response()->json($programmer); //dont do $projects=$projects->pluck... or the state will have nested object
//
//        }
//        return response()->json(['programmer_not_found'], 404);
//
//
//


//        if (is_int($input)) {
//            $user = $user->find($input);
//            return
//        } else {
//            $user = $user->find()->where()
//
//
//        }


    }


    public function findEmployee(Request $request)
    {
        $PMid = $request['PMid'];
        $Pid = $request['Pid'];


        $programmers = Programmer::where('PMid', '=', $PMid)->get(); // all programmers for this project manager
        $project = new Project();
        $projectProgrammers = $project->find($Pid)->programmers;// all programmers in this project

        $result = $programmers->diff($projectProgrammers); // all programmer - programmers in this project

        return response()->json($result, 200);

    }


    public function assignEmployee(Request $request)
    {

        $ProgId = $request['id'];
        $PId = $request['Pid'];


        $project = new Project();

        $programmerOnProject = $project->find($PId)->programmers()->find($ProgId);

        if ($programmerOnProject != null) {

            return response()->json(['Programmer already in the project'], 404);
        }


        $project = $project->find($PId)->programmers()->attach($ProgId);

        return response()->json('Programmer added Successfully', 200);

    }

    public function getProgrammerProjects(Request $request)
    {
        $progId = $request['Pid'];

        $programmer = Programmer::where('id', '=', $progId)->get()->first()->projects->pluck('title', 'id');

        return response()->json($programmer, 200);
    }

    public function autocompleteSearch(Request $request)
    {

        $name = $request['name'];
        $Pid = $request['Pid'];

        $project = new Project();
        $programmers = $project->find($Pid)->programmers();
        $programmers = $programmers->where('first_name', 'like', '%' . $name . '%')->orWhere('last_name', 'like', '%' . $name . '%')->get();

        if (count($programmers) > 0) {
            return response()->json($programmers, 200);
        }

        return response()->json(['Programmer not found'], 404);
    }


    public function getProgrammerInfo(Request $request)
    {
        $p = Programmer::where('id', '=', $request['Pid']);

        if ($p == null) {
            return response()->json(['Programmer not exist'], 404);
        }

        $p = $p->first();

        return response()->json($p, 200);


    }


    public function getProgrammerTasks(Request $request)
    {

        $ProgrammerId = $request['ProgId'];
        $Pid = $request['Pid'];


        $tasks = Task::where('Pid', '=', $Pid)->where('PrID', '=', $ProgrammerId)->get();

        return response()->json($tasks, 200);


    }


    public function countSeverityForProgrammer(Request $request)
    {

        $PrId = $request['PrId'];
        $tasks = Task::where('PrID', $PrId)->get();

        $numOfFeature = count($tasks->where('severity', 'Feature')->all());
        $numOfTrivial = count($tasks->where('severity', 'Trivial')->all());
        $numOfText = count($tasks->where('severity', 'Text')->all());
        $numOfTweak = count($tasks->where('severity', 'Tweak')->all());
        $numOfMinor = count($tasks->where('severity', 'Minor')->all());
        $numOfMajor = count($tasks->where('severity', 'Major')->all());
        $numOfCrash = count($tasks->where('severity', 'Crash')->all());
        $numOfBlock = count($tasks->where('severity', 'Block')->all());

        $array = array(
            0 => $numOfFeature,
            1 => $numOfTrivial,
            2 => $numOfText,
            3 => $numOfTweak,
            4 => $numOfMinor,
            5 => $numOfMajor,
            6 => $numOfCrash,
            7 => $numOfBlock
        );


        return response()->json($array, 200);


    }

    public function countSeverityForProgrammerInProject(Request $request)
    {

        $project = Project::where('id', $request['Pid'])->first();
        $programmer = Programmer::where('id', $request['PrId'])->first();


        if ($project = null) {
            return response()->json('Error Project not found', 404);
        }
        if ($programmer == null) {
            return response()->json('Error Programmer not found', 404);
        }

        $PrId = $request['PrId'];
        $Pid = $request['Pid'];

        $tasks = Task::where('Pid', $Pid)->where('PrID', $PrId)->get();

        $numOfFeature = count($tasks->where('severity', 'Feature')->all());
        $numOfTrivial = count($tasks->where('severity', 'Trivial')->all());
        $numOfText = count($tasks->where('severity', 'Text')->all());
        $numOfTweak = count($tasks->where('severity', 'Tweak')->all());
        $numOfMinor = count($tasks->where('severity', 'Minor')->all());
        $numOfMajor = count($tasks->where('severity', 'Major')->all());
        $numOfCrash = count($tasks->where('severity', 'Crash')->all());
        $numOfBlock = count($tasks->where('severity', 'Block')->all());

        $array = array(
            0 => $numOfFeature,
            1 => $numOfTrivial,
            2 => $numOfText,
            3 => $numOfTweak,
            4 => $numOfMinor,
            5 => $numOfMajor,
            6 => $numOfCrash,
            7 => $numOfBlock
        );


        return response()->json($array, 200);


    }


    public function findTaskProgrammer(Request $request)
    {


        $task = Task::where('id', $request['id'])->first();

        if ($task == null) {
            return response()->json(['Task not found'], 404);
        }

        $p = Programmer::where('id', $task->PrID)->first();

        return response()->json($p, 200);

    }


    public function calculateProgrammerProductivity(Request $request)
    {

        $id = $request['PrId'];

        $programmer = Programmer::where('id', $id)->first();

        if ($programmer == null) {
            return response()->json(['Programmer not found'], 404);
        }


        $tasks = $programmer->numOfTasks;
        $registerTime = $programmer->created_at;
        $registerTime = Carbon::parse($registerTime);
        $now = Carbon::now();

        $time = $registerTime->diffInDays($now);


        if ($time == 0) {
            $result = $tasks;
        } else {
            $result = $tasks / $time;
        }


        return response()->json($result, 200);

    }


    public function getFailedTasksForProgrammerInProject(Request $request)
    {

        $project = Project::where('id', $request['Pid'])->first();
        $programmer = Programmer::where('id', $request['PrId'])->first();


        if ($project == null) {
            return response()->json('Error Project not found', 404);
        }
        if ($programmer == null) {
            return response()->json('Error Programmer not found', 404);
        }


        $failedTasks = Task::where('PrID', $programmer->id)->where('Pid', $project->id)->where('reOpen_state', '!=', null)->get();;
        $completedTasks = Task::where('PrID', $programmer->id)->where('Pid', $project->id)->where('status' , 'Closed')->where('actualTStr', '!=' , null)->get();

        $failedTasks = count($failedTasks);
        $completedTasks = count($completedTasks);

        $array = array(
            0 => $failedTasks,
            1 => $completedTasks
        );

        return response()->json($array, 200);

    }


    public function getFailedTasksForProgrammer(Request $request)
    {

        $programmer = Programmer::where('id', $request['PrId'])->first();

        if ($programmer == null) {
            return response()->json('Error Programmer not found', 404);
        }


        $failedTasks = $programmer->failedTasks;

        $completedTasks = $programmer->numOfTasks ;

        $array = array(
            0 => $failedTasks,
            1 => $completedTasks
        );

        return response()->json($array, 200);

    }


    public function getSkillGap(Request $request)
    {
        $programmer = Programmer::where('id', $request['PrId'])->first();

        if ($programmer == null) {
            return response()->json('Error Programmer not found', 404);

        }

        $tasks = Task::where('PrID', $programmer->id)->get();

        $averageTStrDeviation = $tasks->avg('tStrDeviation');
        $averageTJudDeviation = $tasks->avg('tJudDeviation');
        $averageTCuDeviation = $tasks->avg('tCuDeviation');
        $averageTTechDeviation = $tasks->avg('tTechDeviation');

        $maxTStrDeviation = $tasks->max('tStrDeviation');
        $maxTJudDeviation = $tasks->max('tJudDeviation');
        $maxTCuDeviation = $tasks->max('tCuDeviation');
        $maxTTechDeviation = $tasks->max('tTechDeviation');

        $minTStrDeviation = $tasks->where('tStrDeviation', '!=', null)->min('tStrDeviation');
        $minTJudDeviation = $tasks->where('tJudDeviation', '!=', null)->min('tJudDeviation');
        $minTCuDeviation = $tasks->where('tCuDeviation', '!=', null)->min('tCuDeviation');
        $minTTechDeviation = $tasks->where('tTechDeviation', '!=', null)->min('tTechDeviation');

        if($minTStrDeviation == null){
            $minTStrDeviation = 0 ;
        }

        if($minTJudDeviation == null) {
            $minTJudDeviation =0 ;
        }


        if($minTCuDeviation == null) {
            $minTCuDeviation =0 ;
        }


        if($minTTechDeviation == null) {
            $minTTechDeviation = 0;
        }


        $array = array(
            0 => $minTStrDeviation,
            1 => $minTJudDeviation,
            2 => $minTCuDeviation,
            3 => $minTTechDeviation,
            4 => number_format((float)$averageTStrDeviation, 2, '.', ''),
            5 => number_format((float)$averageTJudDeviation, 2, '.', ''),
            6 => number_format((float)$averageTCuDeviation, 2, '.', ''),
            7 => number_format((float)$averageTTechDeviation, 2, '.', ''),
            8 => $maxTStrDeviation,
            9 => $maxTJudDeviation,
            10 => $maxTCuDeviation,
            11 => $maxTTechDeviation
        );

        return response()->json($array, 200);


    }


    public function countStatusForProgrammerInProject(Request $request)
    {

        $project = Project::where('id', $request['Pid'])->first();
        $programmer = Programmer::where('id', $request['PrId'])->first();


        if ($project == null) {
            return response()->json('Error Project not found', 404);
        }
        if ($programmer == null) {
            return response()->json('Error Programmer not found', 404);
        }

        $tasks = Task::where('Pid', $project->id)->where('PrID', $programmer->id)->get();

        $assigned = count($tasks->where('status', 'New-assigned')->all());
        $progress = count($tasks->where('status', 'Progress')->all());
        $resolved = count($tasks->where('status', 'Resolved')->all());
        $closed = count($tasks->where('status', 'Closed')->all());
        $reOpened = count($tasks->where('status', 'Re-Opened')->all());


        $array = array(
            0 => $assigned,
            1 => $progress,
            2 => $resolved,
            3 => $closed,
            4 => $reOpened
        );

        return response()->json($array, 200);


    }

    public function countStatusForProgrammer(Request $request)
    {

        $programmer = Programmer::where('id', $request['PrId'])->first();

        if ($programmer == null) {
            return response()->json('Error Programmer not found', 404);
        }

        $tasks = Task::where('PrID', $programmer->id)->get();

        $assigned = count($tasks->where('status', 'New-assigned')->all());
        $progress = count($tasks->where('status', 'Progress')->all());
        $resolved = count($tasks->where('status', 'Resolved')->all());
        $closed = count($tasks->where('status', 'Closed')->all());
        $reOpened = count($tasks->where('status', 'Re-Opened')->all());


        $array = array(
            0 => $assigned,
            1 => $progress,
            2 => $resolved,
            3 => $closed,
            4 => $reOpened
        );

        return response()->json($array, 200);


    }


}