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

}
