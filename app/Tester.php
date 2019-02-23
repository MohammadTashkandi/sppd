<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tester extends Model
{
    //

    protected $primaryKey = 'user_id';
    public $timestamps = false;



    public function user(){

        return $this->belongsTo(User::class);
    }


}
