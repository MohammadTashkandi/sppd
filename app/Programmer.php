<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Programmer extends Model
{
    //
    protected $primaryKey = 'user_id';
    public $timestamps = false;



    public function project()
    {

        return $this->belongsTo(Project::class);

    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'user_id');
    }


    public function projectManager()
    {

        return $this->belongsTo(ProjectManager::class);

    }



    public function user(){

        return $this->belongsTo(User::class);
    }

}
