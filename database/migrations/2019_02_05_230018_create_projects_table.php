<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('PMid')->references('user_id')->on('project_managers')->onDelete('cascade');  // foreign key for the Project Manager
            $table->string('title');
            $table->dateTime('Start_Date');
            $table->dateTime('Closed_Date')->nullable();
            $table->dateTime('Planned_Closed_Date')->nullable();
            $table->integer('failedTasks')->default(0);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
