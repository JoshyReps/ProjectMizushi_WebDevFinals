<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::where('role', 'Pharmacist')
                     ->orderBy('id', 'desc')
                     ->get();

        return Inertia::render('Users', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name'  => 'required|string|max:100',
            'email'      => 'required|email|max:100|unique:users,email',
            'password'   => 'required|string|min:8',
            'role'       => 'nullable|string',
            'status'     => 'boolean',
        ]);

        User::create([
            'first_name'    => $validated['first_name'],
            'last_name'     => $validated['last_name'],
            'email'         => $validated['email'],
            'password_hash' => Hash::make($validated['password']),
            'role'          => $validated['role'] ?? 'Pharmacist',
            'status'        => $validated['status'] ?? 1,
            'joined_date'   => now(), 
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name'  => 'required|string|max:100',
            'email'      => 'required|email|max:100|unique:users,email,' . $id, 
            'password'   => 'nullable|string|min:8', 
            'role'       => 'nullable|string',
            'status'     => 'boolean',
        ]);

        $updateData = [
            'first_name' => $validated['first_name'],
            'last_name'  => $validated['last_name'],
            'email'      => $validated['email'],
            'role'       => $validated['role'] ?? 'Pharmacist',
            'status'     => $validated['status'] ?? 1,
        ];

        if (!empty($validated['password'])) {
            $updateData['password_hash'] = Hash::make($validated['password']);
        }

        $user->update($updateData);

        return redirect()->back();
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
        $user->delete();

        return redirect()->back();
    }
}