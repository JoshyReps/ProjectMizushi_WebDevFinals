<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use App\Models\Medicine;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Carbon\Carbon;

class BatchController extends Controller
{
    public function index()
    {
        $batches = Batch::with(['medicine', 'supplier'])->get();

        $medicines = Medicine::select('id', 'med_name', 'status')->get(); 
        $suppliers = Supplier::select('id', 'company_name', 'active')->get();

        return Inertia::render('Batches', [
            'batches' => $batches,
            'medicines' => $medicines,
            'suppliers' => $suppliers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_id' => [
                'required',
                Rule::exists('suppliers', 'id')->where(function ($query) {
                    $query->where('active', 1);
                }),
            ],
            'med_id' => [   
                'required',
                Rule::exists('medicines', 'id')->where(function ($query) {
                    $query->where('status', 1);
                }),
            ], 
            'batch_number' => 'required|string|max:50',
            'expiry_date' => 'required|date',
            'buying_price' => 'nullable|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'status' => 'nullable|in:Healthy,Low Stock,Expiring,Critical,Expired,Archive',
        ]);

        $validated['status'] = $this->calculateStatus(
            $validated['quantity'], 
            $validated['expiry_date'], 
            $validated['med_id']
        );

        Batch::create($validated);

        return redirect()->back()->with('message', 'Batch added successfully.');
    }

    public function update(Request $request, $id)
    {
        $batch = Batch::where('batch_id', $id)->firstOrFail();

        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'med_id' => 'required|exists:medicines,id',
            'batch_number' => 'required|string|max:50',
            'expiry_date' => 'required|date',
            'buying_price' => 'nullable|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'status' => 'nullable|in:Healthy,Low Stock,Expiring,Critical,Expired,Archive', 
        ]);

        $validated['status'] = $this->calculateStatus(
            $validated['quantity'], 
            $validated['expiry_date'], 
            $validated['med_id']
        );

        $batch->update($validated);

        return redirect()->back()->with('message', 'Batch updated successfully.');
    }

    public function destroy($id)
    {
        $batch = Batch::where('batch_id', $id)->firstOrFail();
        $batch->delete();

        return redirect()->back()->with('message', 'Batch deleted successfully.');
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