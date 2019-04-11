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
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('nationality')->nullable();
            $table->string('email')->unique();
            $table->boolean('taken')->default(0);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('location')->nullable();
            $table->string('age')->nullable();
            $table->Integer('PMid')->references('id')->on('User')->onDelete('cascade') ; // foreign key for the Project Manager
            $table->double('pStr')->nullable();
            $table->double('pJud')->nullable();
            $table->double('pCu')->nullable();
            $table->double('pTech')->nullable();
            $table->integer('numOfTasks')->default(0);
            $table->integer('pStrSum')->default(0);
            $table->integer('pJudSum')->default(0);
            $table->integer('pCuSum')->default(0);
            $table->double('pTechSum')->default(0.0);
            $table->integer('failedTasks')->default(0);
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
