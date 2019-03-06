<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;



class Programmer extends Authenticatable implements JWTSubject
{
    //

    use Notifiable;

    protected $guard = 'programmer';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'nationality', 'age', 'pStr', 'pJud', 'PCu', 'pTech',


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


protected $primaryKey = 'user_id';
    public $timestamps = false;






}
