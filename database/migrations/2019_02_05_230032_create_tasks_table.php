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
            $table->Integer('PrID')->references('id')->on('Programmer')->defulit(null)->onDelete('cascade'); // foreign key for the Project
            $table->string('title');
            $table->enum('status' , [ 'New-unassigned','New-assigned' , 'Progress' , 'Resolved' , 'Closed' , 'Re-Opened' , 'Deferred']);
            $table->enum('severity' , [ 'Feature','Trivial' , 'Text' , 'Tweak' , 'Minor' , 'Major' , 'Crash','Block)']);
            $table->dateTime('Open_state')->nullable();
            $table->dateTime('Assigned_state')->nullable();
            $table->dateTime('inProgress_state')->nullable();
            $table->dateTime('Resolved_state')->nullable();
            $table->dateTime('reOpen_state')->nullable();
            $table->dateTime('Closed_state')->nullable();
            $table->integer('AssignedDuration')->nullable()->default(0);
            $table->integer('inProgressDuration')->nullable()->default(0);
            $table->integer('ResolvedDuration')->nullable()->default(0);
            $table->integer('reOpenDuration')->nullable()->default(0);
            $table->integer('ClosedDuration')->nullable()->default(0);
            $table->integer('tStr');
            $table->integer('tJud');
            $table->integer('tCu');
            $table->integer('tTech');
            //------------------------------------------------------------------
            $table->integer('actualTStr');
            $table->integer('actualTJud');
            $table->integer('actualTCu');
            $table->integer('actualTTech');

            //------------------------------------------------------------------
            $table->integer('tStrDeviation');
            $table->integer('tJudDeviation');
            $table->integer('tCuDeviation');
            $table->integer('tTechDeviation');

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
