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




    public function programmers()
    {
        return $this->belongsToMany(Programmer::class , 'works_on' , 'project_id','programmer_id');
    }

}
