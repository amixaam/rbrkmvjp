<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'supplier_id',
        'category_id',
        'destination_shelf_id',
        'name',
        'description',
        'quantity',
        'supplier_price',
        'store_price',
        'asignee_id',
        'delivered',
    ];
}
