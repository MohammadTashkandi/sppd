<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProgrammersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programmers', function (Blueprint $table) {
            $table->unsignedInteger('user_id')->references('id')->on('users')->onDelete('cascade') ; // foreign key for user table
            $table->Integer('PMid')->references('user_id')->on('ProjectManager')->onDelete('cascade') ; // foreign key for the Project Manager
            $table->Integer('Pid')->references('id')->on('Project')->onDelete('cascade') ; // foreign key for the Project
            $table->integer('pStr');
            $table->integer('pJud');
            $table->integer('PCu');
            $table->integer('pTech');
            $table->String('Username');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('programmers');
    }
}
