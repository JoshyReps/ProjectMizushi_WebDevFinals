<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\TransactionItem;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        $daysToGenerate = 30;
        
        $userId = 1;

        for ($i = $daysToGenerate; $i >= 0; $i--) {
            $currentDate = Carbon::today()->subDays($i);
            
            $isWeekend = $currentDate->isWeekend();
            $transactionsToday = $isWeekend ? rand(8, 15) : rand(3, 8);

            for ($t = 0; $t < $transactionsToday; $t++) {
                $transactionTime = $currentDate->copy()->addHours(rand(8, 20))->addMinutes(rand(0, 59));

                $transaction = Transaction::create([
                    'invoice_number' => 'INV-' . $transactionTime->format('Ymd') . '-' . strtoupper(Str::random(4)),
                    'user_id' => $userId,
                    'subtotal' => 0,
                    'discount_type' => rand(1, 10) > 8 ? 'Senior Citizen' : null,
                    'discount_amount' => 0,
                    'tax_amount' => 0,
                    'platform_fee' => 0,
                    'total_amount' => 0,
                    'created_at' => $transactionTime,
                    'updated_at' => $transactionTime,
                ]);

                $itemsCount = rand(1, 4);
                $transactionSubtotal = 0;

                for ($item = 0; $item < $itemsCount; $item++) {
                    $qty = rand(1, 3);
                    $unitPrice = rand(5, 50) + (rand(0, 99) / 100);
                    $itemSubtotal = $qty * $unitPrice;
                    
                    TransactionItem::create([
                        'transaction_id' => $transaction->id,
                        'batch_id' => rand(36, 55), 
                        'quantity' => $qty,
                        'unit_price' => $unitPrice,
                        'subtotal' => $itemSubtotal,
                        'created_at' => $transactionTime,
                        'updated_at' => $transactionTime,
                    ]);

                    $transactionSubtotal += $itemSubtotal;
                }

                $discountAmount = $transaction->discount_type ? ($transactionSubtotal * 0.20) : 0; 
                $platformFee = 2.50; 
                $totalAmount = ($transactionSubtotal - $discountAmount) + $platformFee;

                $transaction->update([
                    'subtotal' => $transactionSubtotal,
                    'discount_amount' => $discountAmount,
                    'platform_fee' => $platformFee,
                    'total_amount' => $totalAmount,
                ]);
            }
        }
    }
}