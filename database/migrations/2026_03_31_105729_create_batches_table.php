<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('batches', function (Blueprint $table) {
            // Using batch_id as the primary key as requested
            $table->id('batch_id'); 
            
            // Foreign Keys
            $table->unsignedBigInteger('supplier_id');
            $table->unsignedBigInteger('med_id');
            
            // Data columns
            $table->string('batch_number', 50);
            $table->date('expiry_date');
            $table->decimal('buying_price', 10, 2)->nullable(); 
            $table->integer('quantity');
            
            // ADDED 'Critical' TO THE ENUM ARRAY
            $table->enum('status', ['Healthy', 'Low Stock', 'Expiring', 'Critical', 'Expired', 'Archive'])->default('Healthy');
            
            $table->timestamps();

            // Foreign Key Constraints
            // Assuming your suppliers table uses 'id'. If it uses 'supplier_id', change 'id' to 'supplier_id'
            $table->foreign('supplier_id')->references('id')->on('suppliers'); 
            
            // Cascade on delete as specified in your image
            // Assuming medicines table uses 'id'. If it uses 'med_id', change 'id' to 'med_id'
            $table->foreign('med_id')->references('id')->on('medicines')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('batches');
    }
};