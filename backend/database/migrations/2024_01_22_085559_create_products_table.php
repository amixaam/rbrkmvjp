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
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('supplier_id');
            $table->foreign('supplier_id')->references('id')->on('suppliers')->onDelete('cascade');
            $table->unsignedBigInteger('destination_shelf_id')->nullable();
            $table->foreign('destination_shelf_id')->references('id')->on('shelves')->onDelete('cascade');
            $table->unsignedBigInteger('category_id')->default(1);
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');

            $table->string('name')->nullable();
            $table->string('description')->nullable();
            $table->integer('quantity')->default(1);
            $table->decimal('supplier_price', 8, 2);
            $table->decimal('store_price', 8, 2);

            // to who
            $table->unsignedBigInteger('asignee_id')->nullable();
            $table->foreign('asignee_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade')
                ->where('role_id', '=', 3);
            $table->boolean('delivered')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
