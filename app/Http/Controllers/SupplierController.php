<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{
    public function index()
    {
        $suppliers = Supplier::all();

        return Inertia::render('Suppliers', [
            'suppliers' => $suppliers
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'address' => 'required|string|max:255',
            'active' => 'required|boolean',
        ]);

        Supplier::create($validated);

        return redirect()->back()->with('message', 'Supplier added successfully.');
    }

    public function update(Request $request, $id)
    {
        $supplier = Supplier::findOrFail($id);

        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'address' => 'required|string|max:255',
            'active' => 'required|boolean',
        ]);

        $supplier->update($validated);

        return redirect()->back()->with('message', 'Supplier updated successfully.');
    }

    public function destroy($id)
    {
        $supplier = Supplier::findOrFail($id);
        $supplier->delete();

        return redirect()->back()->with('message', 'Supplier deleted successfully.');
    }
}