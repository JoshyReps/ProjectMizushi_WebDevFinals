<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Batch extends Model
{
    use HasFactory;

    protected $primaryKey = 'batch_id';

    protected $fillable = [
        'supplier_id',
        'med_id',
        'batch_number',
        'expiry_date',
        'buying_price',
        'quantity',
        'status',
    ];

    protected $casts = [
        'expiry_date' => 'date',
        'buying_price' => 'decimal:2',
    ];


    public function medicine()
    {
        return $this->belongsTo(Medicine::class, 'med_id');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }
}