<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with(['pharmacist', 'items'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($txn) {
                return [
                    'id' => $txn->id,
                    'invoice_number' => $txn->invoice_number,
                    'pharmacist_name' => $txn->pharmacist ? $txn->pharmacist->first_name . ' ' . $txn->pharmacist->last_name : 'Unknown',
                    'items' => $txn->items, 
                    'subtotal' => $txn->subtotal,
                    'discount_amount' => $txn->discount_amount,
                    'platform_fee' => $txn->platform_fee,
                    'total_amount' => $txn->total_amount,
                    'created_at' => $txn->created_at,
                ];
            });

        return Inertia::render('Transactions', [
            'transactions' => $transactions
        ]);
    }
}