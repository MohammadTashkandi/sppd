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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $user = Auth::user();
        $current = Carbon::now();
        $pro = new Project();
        $title = $request['title'];
        $PMid = $request['PMid'];
        if($title == null){
            return 'You should put Title';
        }
        $pro->title = $title;
        $pro->PMid = $PMid;
        $pro->Start_Date = $current;
        $pro->save();

        return response()->json(201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Project  $project
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
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        //
    }


    public function addProject($title){
        $p = new Project();

        $p->title = $title;
        if(auth()->user()->rule = 'Project Manager'){

            $p->PMid=auth()->user()->id;
            $current = Carbon::now();
            $tomorrow = Carbon::tomorrow();
            $p->Start_Date=$current;
            $p->Closed_Date=$tomorrow;
        }
        return 'Done';


    }

    public function findProject(Request $request){

        $PMid = $request['PMid'];
        $projects = Project::where('PMid',$PMid);
        return response()->json($projects->pluck('title','id')); //dont do $projects=$projects->pluck... or the state will have nested object
    }


    public function getProjectTasks(Request $request){
        $Pid = $request['id'];

        $userId= Auth::user()->id;
        $pm = ProjectManager::find($userId);
        $project = $pm->projects->find($Pid);
//        $tasks = Task::with('project')->get(); // get all tasks that have relationship with this specific project
        $tasks = $project->tasks(); // get all tasks that have relationship with this specific project

        return view('Task.tasks_list'  ,  compact('tasks'));

    }


    public function returnTasksView(){

        return view('Task.ProjectID');

    }



}
