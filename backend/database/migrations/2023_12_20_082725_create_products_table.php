<?php

use App\Models\category;
use App\Models\shelf;
use App\Models\supplier;
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
            $table->foreignIdFor(supplier::class);
            $table->foreignIdFor(shelf::class);
            $table->foreignIdFor(category::class);
            $table->string('name');
            $table->text('description');
            $table->integer('quantity');
            $table->decimal('supplier_price', 8, 2);
            $table->decimal('store_price', 8, 2);
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
