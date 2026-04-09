<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transaction_items', function (Blueprint $table) {
            $table->id();
            
            // Link to the main transaction
            $table->foreignId('transaction_id')->constrained('transactions')->onDelete('cascade');
            
            // Link to the batches table
            $table->unsignedBigInteger('batch_id');
            $table->foreign('batch_id')->references('batch_id')->on('batches');
            
            // Item details
            $table->integer('quantity');
            $table->decimal('unit_price', 10, 2); 
            $table->decimal('subtotal', 10, 2);   
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transaction_items');
    }
};