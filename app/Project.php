<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    //
    protected $fillable = [
        'title', 'pmID',
    ];

    public $timestamps = false;

    public function programmers(){

        return $this->hasMany(Programmer::class , 'Pid' , 'user_id');

    }

    public function tasks(){

        return $this->hasMany(Task::class , 'Pid');

    }

    public function projectManager(){
        return $this->belongsTo(ProjectManager::class);
    }


}
