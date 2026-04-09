<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MedicineController extends Controller
{

    public function index()
    {
        $medicines = Medicine::orderBy('med_name', 'asc')->get();

        return Inertia::render('Medicine', [
            'medicines' => $medicines
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'med_name' => 'required|string|max:255',
            'gen_name' => 'required|string|max:255',
            'category' => 'required|string',
            'selling_unit' => 'required|string',
            'selling_price' => 'required|numeric|min:0',
            'min_stock_level' => 'required|integer|min:0',
            'net_content' => 'nullable|string|max:255',
            'status' => 'required|boolean',
            'formulation' => 'nullable|string|max:255',
            'strength' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string|max:255', 
        ]);

        Medicine::create($validated);

        return redirect()->back()->with('success', 'Medicine added successfully.');
    }

    public function update(Request $request, $id)
    {
        $medicine = Medicine::findOrFail($id);

        $validated = $request->validate([
            'med_name' => 'required|string|max:255',
            'gen_name' => 'required|string|max:255',
            'category' => 'required|string',
            'selling_unit' => 'required|string',
            'selling_price' => 'required|numeric|min:0',
            'min_stock_level' => 'required|integer|min:0',
            'net_content' => 'nullable|string|max:255',
            'status' => 'required|boolean',
            'formulation' => 'nullable|string|max:255',
            'strength' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string|max:255', 
        ]);

        $medicine->update($validated);

        return redirect()->back()->with('success', 'Medicine updated successfully.');
    }

    public function destroy($id)
    {
        $medicine = Medicine::findOrFail($id);
        $medicine->delete();

        return redirect()->back()->with('success', 'Medicine deleted successfully.');
    }
}