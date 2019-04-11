<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;



class Programmer extends Authenticatable implements JWTSubject
{
    //

//    use Notifiable;

    protected $guard = 'programmer';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name' , 'email', 'password', 'nationality', 'age', 'pStr', 'pJud', 'pCu', 'pTech','PMid',
        'numOfTasks','pStrSum','pJudSum','pCuSum','pTechSum','phone_number','numOfTasks','pStrSum','pJudSum','pCuSum','pTechSum',

    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


    public function getJWTIdentifier(){

        return $this->getKey();

    }
    public function getJWTCustomClaims(){
        return [];
    }

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];




    public function projects()
    {
        return $this->belongsToMany(Project::class , 'works_on' , 'programmer_id','project_id');
    }




}
