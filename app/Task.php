<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    //
    public $timestamps = false;

    public function programmer()
    {

        return $this->belongsTo(Programmer::class);

    }


    public function project(){

        return $this->belongsTo(Project::class);

    }

}
