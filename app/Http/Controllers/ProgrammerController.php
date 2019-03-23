<?php

namespace App\Http\Controllers;

use App\Programmer;
use App\Project;
use App\User;
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

        if(!(filter_var($programmerEmail, FILTER_VALIDATE_EMAIL))) {
            return response()->json(['Incorrect email format entered!'], 400);
        }

        if (User::where('email', '=', $programmerEmail)->exists()) {
            return response()->json(['This email is already in use'], 400);
        }

        if (Programmer::where('email', '=', $programmerEmail)->exists()) {
            return response()->json(['This email is already in use'], 400);
        }

        $pass = $request['password'];

        if(strlen($pass) < 6) {
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
            'PCu' => $request['pCu'],
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


    public function findProgrammer(Request $request){


        $input = $request['id'];
        $PMid = $request['PMid'];

        $Programmers = Programmer::where('PMid', '=', $PMid)->get();


        if (is_numeric($input)) {
            $programmer = $Programmers->where('id' , '=' , $input);
            if($programmer != null){
                $programmer = $programmer->all();
                return response()->json($programmer, 200);
            }
        } else {


            $Programmers = Programmer::where('PMid', '=', $PMid)->where('first_name' , 'like' , '%' .$input. '%')->orWhere('last_name' , 'like' , '%' .$input. '%')->get();

            if(count($Programmers)>0){
                return response()->json($Programmers,200);
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


    public function findEmployee(Request $request){
        $PMid = $request['PMid'];
        $Pid = $request['Pid'];


        $programmers = Programmer::where('PMid' , '=' , $PMid)->get(); // all programmers for this project manager
        $project = new Project();
        $projectProgrammers = $project->find($Pid)->programmers;// all programmers in this project

        $result = $programmers->diff($projectProgrammers); // all programmer - programmers in this project

        return response()->json($result,200);

    }


    public function assignEmployee(Request $request){

        $ProgId = $request['id'];
        $PId = $request['Pid'];


        $project = new Project();

        $programmerOnProject = $project->find($PId)->programmers()->find($ProgId);

        if ($programmerOnProject != null)  {

            return response()->json(['Programmer already in the project'], 404);
        }



        $project = $project->find($PId)->programmers()->attach($ProgId);

        return response()->json('Programmer added Successfully',200);

    }

    public function getProgrammerProjects(Request $request){
        $progId = $request['progID'];

        $programmer = Programmer::where('id' ,'=', '1')->get()->first()->projects;

        return response()->json($programmer,200);
    }

    public function autocompleteSearch(Request $request){

        $name = $request['name'];
        $Pid = $request['Pid'];

        $project = new Project();
        $programmers = $project->find($Pid)->programmers();
        $programmers = $programmers->where('first_name', 'like', '%' .$name. '%')->orWhere('last_name', 'like', '%' .$name. '%')->get();

        if(count($programmers)>0){
            return response()->json($programmers,200);
        }

        return response()->json(['Programmer not found'], 404);
    }

}