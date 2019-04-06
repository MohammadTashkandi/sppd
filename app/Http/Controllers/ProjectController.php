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
            0 => $maxAssigned,
            1 => $minAssigned,
            2 => $avgAssigned,
            3 => $maxProgress,
            4 => $minProgress,
            5 => $avgProgress,
            6 => $maxResolvedD,
            7 => $minResolvedD,
            8 => $avgResolvedD,
            9 => $maxReOpen,
            10 => $minReOpen,
            11 => $avgReOpen
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

}
