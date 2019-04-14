<?php

namespace App\Http\Controllers;

use App\Project;
use App\ProjectManager;
use App\Task;
use App\User;
use function GuzzleHttp\Promise\all;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //

        return view('project_manager');

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //

        return view('project.create');
    }

    public function updateView()
    {
        //

        return view('project.update');
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
        $user = Auth::user();
        $pro = new Project();
        $title = $request['title'];
        $PMid = $request['PMid'];
        if ($title == null) {
            return 'You should put Title';
        }
        $pro->title = $title;
        $pro->PMid = $PMid;
        $pro->Start_Date = $request['start'];
        $pro->Planned_Closed_Date = $request['end'];
        $pro->save();

        $id = $pro['id'];

        return response()->json(['Project created successfully!', $id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Project $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Project $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Project $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        return view('project.update');
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Project $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        //
    }


    public function addProject($title)
    {
        $p = new Project();

        $p->title = $title;


        $p->PMid = auth()->user()->id;
        $current = Carbon::now();
        $tomorrow = Carbon::tomorrow();
        $p->Start_Date = $current;
        $p->Closed_Date = $tomorrow;

        return 'Done';


    }

    public function findProject(Request $request)
    {

        $PMid = $request['PMid'];
        $projects = Project::where('PMid', $PMid);
        return response()->json($projects->pluck('title', 'id')); //dont do $projects=$projects->pluck... or the state will have nested object
    }

    public function getProjectInfo(Request $request)
    {
        $p = Project::where('id', '=', $request['id']);

        if ($p == null) {
            return response()->json(['project not exist'], 404);
        }

        $p = $p->first();

        return response()->json($p, 200);


    }


//    public function getProjectTasks(Request $request){
//        $Pid = $request['id'];
//
//        $userId= Auth::user()->id;
//        $pm = ProjectManager::find($userId);
//        $project = $pm->projects->find($Pid);
////        $tasks = Task::with('project')->get(); // get all tasks that have relationship with this specific project
//        $tasks = $project->tasks(); // get all tasks that have relationship with this specific project
//
//        return view('Task.tasks_list'  ,  compact('tasks'));
//
//    }


    public function countSeverityForProject(Request $request)
    {

        $Pid = $request['Pid'];
        $tasks = Task::where('Pid', $Pid)->get();

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


    public function getDuration(Request $request)
    {

        $tasks = Task::where('Pid', $request['Pid'])->get();
        $tasks2 = Task::where('Pid', $request['Pid'])->where('ResolvedDuration' , '!=' , null)->get();
        $tasks3 = Task::where('Pid', $request['Pid'])->where('reOpenDuration' , '!=' , null)->get();


        $maxAssigned = $tasks->where('AssignedDuration' , '!=' , null)->max('AssignedDuration');
        $maxProgress = $tasks->where('inProgressDuration' , '!=' , null)->max('inProgressDuration');
        $maxResolvedD = $tasks2->max('ResolvedDuration');
        $maxReOpen = $tasks3->max('reOpenDuration');


        $minAssigned = $tasks->where('AssignedDuration' , '!=' , null)->min('AssignedDuration');
        $minProgress = $tasks->where('inProgressDuration' , '!=' , null)->min('inProgressDuration');
        $minResolvedD = $tasks2->min('ResolvedDuration');
        $minReOpen = $tasks3->min('reOpenDuration');

        $avgAssigned =$tasks->where('AssignedDuration' , '!=' , null)->avg('AssignedDuration');
        $avgProgress = $tasks->where('inProgressDuration' , '!=' , null)->avg('inProgressDuration');
        $avgResolvedD = $tasks2->avg('ResolvedDuration');
        $avgReOpen = $tasks3->avg('reOpenDuration');

        $result = array(
            0 => floor($maxAssigned/60) + (($maxAssigned % 60)/100),
            1 => floor($minAssigned/60) + (( $minAssigned% 60)/100),
            2 => floor($avgAssigned/60) + (($avgAssigned % 60)/100),
            3 => floor($maxProgress/60) + (( $maxProgress% 60)/100),
            4 => floor($minProgress/60) + (($minProgress % 60)/100),
            5 => floor($avgProgress/60) + (( $avgProgress% 60)/100),
            6 => floor($maxResolvedD/60)+ (($maxResolvedD % 60)/100),
            7 => floor($minResolvedD/60)+ (($minResolvedD % 60)/100),
            8 => floor($avgResolvedD/60)+ (( $avgResolvedD% 60)/100),
            9 => floor($maxReOpen/60) + (($maxReOpen % 60)/100) ,
            10 => floor($minReOpen/60)+ (($minReOpen% 60)/100),
            11 => floor($avgReOpen/60) + (($avgReOpen% 60)/100)
        );

        return response()->json($result, 200);


    }




    public function closeProject(Request $request)
    {
        $Pid = $request['Pid'];

        $project = Project::where('id', $Pid)->first();

        if ($project == null) {

            return response()->json('Error Project not found', 404);
        }

        if ($project->Closed_Date == null) {

            $project->Closed_Date = Carbon::now();
            $project->save();

            return response()->json('Done', 200);
        }


    }

    public function checkClosed(Request $request)
    {

        $Pid = $request['Pid'];

        $project = Project::where('id', $Pid)->first();

        if ($project == null) {

            return response()->json('Error Project not found', 404);
        }

        if ($project->Closed_Date != null) {

            return response()->json('Done', 200);

        }

        return response()->json('Project not Closed', 201);



    }


    public function getFailedTasksForProject(Request $request){

        $p = Project::where('id', $request['Pid'])->first();

        if($p == null){
            return response()->json('Error Project not found', 404);
        }

        $tasks = Task::where('Pid', $p->id)->where('status' , 'Closed')->where('actualTStr', '!=' , null)->get();

        $failedTasks = $p->failedTasks ;

        $completedTasks = count($tasks);

        $array = array(
            0 => $failedTasks ,
            1 => $completedTasks
        );

        return response()->json($array, 200);

    }


    public function getProgress(Request $request)
    {
        $project = Project::where('id' , $request['Pid'])->first();

        if ($project == null) {
            return response()->json('Error Project not found', 404);
        }


        // Calculate Progress for project by days
        $startDate = Carbon::parse($project->Start_Date) ;
        $plannedEndDate = Carbon::parse($project->Planned_Closed_Date);

        $diffDays = $startDate->diffInDays($plannedEndDate);

        $now =$startDate->diffInDays( Carbon::now());

        $daysProgress = ($now * (1/$diffDays)) *100 ;



        $daysProgress = number_format((float)$daysProgress, 2, '.', '');


        if($now >= $diffDays){
            $daysProgress = 100 ;
        }
    //---------------------------------------------------------------------------------------------
        // Calculate Progress using Tasks progress

        $tasks = Task::where('Pid' , $project->id)->get();
        $num = count($tasks);

        $assigned = count($tasks->where('status', 'New-Assigned')->all());
        $progress = count($tasks->where('status', 'Progress')->all());
        $resolved = count($tasks->where('status', 'Resolved')->all());
        $closed = count($tasks->where('status', 'Closed')->all());

        $assigned = $assigned * 0.25;
        $progress = $progress * 0.50;
        $resolved = $resolved * 0.75;

        $tasksProgress = (($assigned + $progress + $resolved + $closed) * (1/$num)) * 100;
        $tasksProgress = number_format((float)$tasksProgress, 2, '.', '');

        $array = array(
            0 => $daysProgress ,
            1 => $tasksProgress
        );

        return response()->json($array, 200);


    }


    public function countStatusForProject(Request $request)
    {

        $project = Project::where('id' , $request['Pid'])->first();

        if($project == null){
            return response()->json('Error Project not found', 404);
        }

        $tasks = Task::where('Pid' , $project->id)->get();

        $assigned = count($tasks->where('status', 'New-assigned')->all());
        $progress = count($tasks->where('status', 'Progress')->all());
        $resolved = count($tasks->where('status', 'Resolved')->all());
        $closed = count($tasks->where('status', 'Closed')->all());
        $reOpened = count($tasks->where('status', 'Re-Opened')->all());



        $array = array(
            0 => $assigned ,
            1 => $progress ,
            2 => $resolved ,
            3 => $closed ,
            4 => $reOpened
        );

        return response()->json($array, 200);


    }





}
