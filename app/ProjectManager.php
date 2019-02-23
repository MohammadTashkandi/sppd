<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProjectManager extends Model
{
    //
    public $timestamps = false;

    protected $primaryKey = 'user_id';


    public function programmers(){

        return $this->hasMany(Programmer::class , 'PMid');

    }

    public function projects(){

        return $this->hasMany(Project::class , 'PMid');

    }



    public function user(){

        return $this->belongsTo(User::class);
    }







}
