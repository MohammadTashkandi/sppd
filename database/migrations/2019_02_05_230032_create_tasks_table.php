<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->Integer('Pid')->references('id')->on('Project')->onDelete('cascade') ; // foreign key for the Project
            $table->Integer('PrID')->references('user_id')->on('Programmer')->defulit(null)->onDelete('cascade'); // foreign key for the Project
            $table->string('title');
            $table->enum('status' , [ 'New-unassigned','New-assigned' , 'Progress' , 'Resolved' , 'Closed' , 'Reopened' , 'Deferred']);
            $table->enum('severity' , [ 'Feature','Trivial' , 'Text' , 'Tweak' , 'Minor' , 'Major' , 'Crash','Block)']);
            $table->dateTime('Open_state');
            $table->dateTime('Assigned_state')->nullable();
            $table->dateTime('inProgress_state')->nullable();
            $table->dateTime('Resolved_state')->nullable();
            $table->dateTime('reOpen_state')->nullable();
            $table->dateTime('Closed_state')->nullable();
            $table->integer('tStr');
            $table->integer('tJud');
            $table->integer('tCu');
            $table->integer('tTech');
            $table->rememberToken();


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
