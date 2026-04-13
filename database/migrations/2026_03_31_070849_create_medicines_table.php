<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('medicines', function (Blueprint $table) {
            $table->id();
            $table->string('med_name', 100);
            $table->string('gen_name', 100)->nullable();
            $table->string('category', 50)->default('Others');
            $table->string('strength')->nullable();
            $table->string('image_url')->nullable();            
            $table->decimal('selling_price', 10, 2)->nullable();
            $table->string('formulation', 50)->nullable();
            $table->integer('min_stock_level')->default(10);
            $table->boolean('status')->default(1);
            $table->string('net_content', 60)->nullable();
            $table->enum('selling_unit', ['Piece', 'Bottle', 'Tube', 'Sachet'])->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicines');
    }
};
