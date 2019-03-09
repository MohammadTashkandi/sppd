<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWorksOnTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('works_on', function (Blueprint $table) {
            $table->integer('Programmer_id')->unsigned();
            $table->foreign('Programmer_id')->references('id')->on('programmers');
            $table->integer('Project_id')->unsigned();
            $table->foreign('Project_id')->references('id')->on('projects');
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
        Schema::dropIfExists('works_on');
    }
}
