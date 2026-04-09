<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    protected $fillable = [
        'med_name', 
        'gen_name', 
        'category', 
        'strength', 
        'selling_price', 
        'formulation', 
        'min_stock_level', 
        'status', 
        'net_content', 
        'selling_unit', 
        'description',
        'image_url'
    ];

    protected function casts(): array
    {
        return [
            'status' => 'boolean',
            'selling_price' => 'decimal:2',
        ];
    }
}
