<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    class TransactionItem extends Model
    {
        use HasFactory;

        protected $fillable = [
            'transaction_id',
            'batch_id',
            'quantity',
            'unit_price',
            'subtotal',
        ];

        public function transaction()
        {
            return $this->belongsTo(Transaction::class);
        }

        public function batch()
        {
            return $this->belongsTo(Batch::class, 'batch_id', 'batch_id');
        }
    }