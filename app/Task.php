<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Task extends Model
{
    //
    public $timestamps = false;


    use Notifiable;

    protected $fillable = [
        'Pid', 'PrID', 'title', 'status', 'severity', 'Open_state', 'Assigned_state', 'inProgress_state', 'Resolved_state', 'reOpen_state',
        'Closed_state', 'tStr', 'tJud', 'tCu', 'tTech',


    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */



}
