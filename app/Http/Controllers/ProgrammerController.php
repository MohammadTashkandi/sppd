<?php

namespace App\Http\Controllers;

use App\Programmer;
use App\Project;
use App\User;
use function GuzzleHttp\Promise\all;
use http\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        //
        $programmerID = $request['id'];
        $userP = new User();
        $userP = $userP->find($programmerID);


        $Pid = $request['Pid'];
        $pStr = $request['ps'];
        $pJud = $request['pj'];
        $pCu = $request['pc'];
        $pTech = $request['pt'];

        if ($Pid == null || $pStr == null || $pJud == null || $pCu == null || $pTech == null) {
            return 'please fill all the fields ';
        }


        // check if the user is exist
        //-----------------------------------------------------------------------
        if ($userP == null) {
            return 'there is no user with this ID: ' . $programmerID;
        }

        // check if the user is already a programmer or tester
        if ($userP->taken == true) {
            $name = $userP->name;
            $role = $userP->role;
            printf("this user is taken from another department ");
            printf("name:" . $name . " role: " . $role);
            return;
        }





        // check if the project is exist
        //-----------------------------------------------------------------------

        $project = new Project();
        $project = $project->find($Pid);

        if ($project = null) {
            return 'there is no project with this ID: ' . $Pid;
        }


        // to get project Manager ID
        $user = Auth::user();

        $p = new Programmer();

        $p->user_id = $programmerID;
        $p->PMid = $user->id;
        $p->Pid = $request['Pid'];
        $p->pStr = $request['ps'];
        $p->pJud = $request['pj'];
        $p->pCu = $request['pc'];
        $p->pTech = $request['pt'];

        $userP->role = 3;
        $userP->taken = 1;
        $userP->save();
        $p->save();


//        dd($userP);

        // don't forgot to do save for user


        return 'done';


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
}
