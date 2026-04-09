<?php

    namespace App\Models;

    use App\Models\TransactionItem;
    use App\Models\User;
    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    class Transaction extends Model
    {
        use HasFactory;

        protected $fillable = [
            'invoice_number',
            'user_id', 
            'subtotal',
            'discount_type',
            'discount_amount',
            'tax_amount',
            'platform_fee',
            'total_amount',
        ];

        public function pharmacist()
        {
            return $this->belongsTo(User::class, 'user_id');
        }

        public function items()
        {
            return $this->hasMany(TransactionItem::class);
        }
    }