<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use App\Models\Medicine; 
use App\Models\Transaction;
use App\Models\TransactionItem;
use Carbon\Carbon; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PosController extends Controller
{
    public function index()
    {
        $batches = Batch::with('medicine')->where('quantity', '>', 0)->get();
        return Inertia::render('PointOfSale', ['batches' => $batches]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'cart' => 'required|array',
            'discount_type' => 'nullable|string',
            'subtotal' => 'required|numeric',
            'discount_amount' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'platform_fee' => 'required|numeric',
            'total_amount' => 'required|numeric',
        ]);

        DB::transaction(function () use ($request) {
            
            $transaction = Transaction::create([
                'invoice_number' => 'INV-' . strtoupper(uniqid()), 
                'user_id' => Auth::id(), 
                'subtotal' => $request->subtotal,
                'discount_type' => $request->discount_type,
                'discount_amount' => $request->discount_amount,
                'tax_amount' => $request->tax_amount,
                'platform_fee' => $request->platform_fee,
                'total_amount' => $request->total_amount,
            ]);

            foreach ($request->cart as $item) {
                $batch = Batch::findOrFail($item['batch_id']);

                TransactionItem::create([
                    'transaction_id' => $transaction->id,
                    'batch_id' => $batch->batch_id,
                    'quantity' => $item['cartQty'],
                    'unit_price' => $item['medicine']['selling_price'],
                    'subtotal' => $item['cartQty'] * $item['medicine']['selling_price'],
                ]);

                $batch->quantity -= $item['cartQty'];

                $batch->status = $this->calculateStatus($batch->quantity, $batch->expiry_date, $batch->med_id);

                $batch->save();
            }
        });

        return redirect()->back()->with('success', 'Transaction completed successfully!');
    }

    private function calculateStatus($quantity, $expiryDate, $medId)
    {
        if ($quantity <= 0) {
            return 'Archive';
        }

        $today = Carbon::today();
        $expiry = Carbon::parse($expiryDate)->startOfDay();

        if ($expiry->isBefore($today)) {
            return 'Expired';
        }

        $medicine = Medicine::find($medId);
        $reorderLevel = $medicine->min_stock_level ?? 20; 

        $isExpiring = $today->diffInDays($expiry) <= 60;
        $isLowStock = $quantity <= $reorderLevel;

        if ($isExpiring && $isLowStock) {
            return 'Critical';
        }
        
        if ($isExpiring) {
            return 'Expiring';
        }

        if ($isLowStock) {
            return 'Low Stock';
        }

        return 'Healthy';
    }
}