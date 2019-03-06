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
            $table->increments('id');
            $table->string('name');
            $table->string('phone_number')->nullable();
            $table->string('nationality')->nullable();
            $table->string('email')->unique();
            $table->boolean('taken')->default(0);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('location')->nullable();
            $table->string('age')->nullable();
            $table->Integer('PMid')->references('id')->on('User')->onDelete('cascade') ; // foreign key for the Project Manager
            $table->Integer('Pid')->references('id')->on('Project')->onDelete('cascade') ; // foreign key for the Project
            $table->integer('pStr');
            $table->integer('pJud');
            $table->integer('PCu');
            $table->integer('pTech');
            $table->rememberToken();
            $table->timestamps();
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
