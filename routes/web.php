<?php

use App\Http\Controllers\BatchController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;    

// ---- Public Routes ---

// Login Page
Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('Dashboard');
    }
    return Inertia::render('Login');
})->name('login');

// Login Action
Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password_hash' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {

        $user = User::find(Auth::id());
        if ($user) {
            $user->last_login = now();
            $user->save();
        }

        $request->session()->regenerate();
        return redirect()->intended('Dashboard');
    }

    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.',
    ]);
});

// ---- Protected Routes for Admin and Pharmacists ---

Route::middleware(['auth'])->group(function () {
    
    // --- MAIN ROUTES ---
    Route::get('/main/dashboard', [DashboardController::class, 'index'])->name('Dashboard');

    Route::get('/main/pointofsale', [PosController::class, 'index'])->name('pos.index');
    Route::post('/pos/checkout', [PosController::class, 'store'])->name('pos.store');
    
    // --- MEDICINE ROUTES ---
    Route::get('/inventory/medicine', [MedicineController::class, 'index'])->name('medicine.index');
    Route::post('/inventory/medicine', [MedicineController::class, 'store']);
    Route::put('/inventory/medicine/{id}', [MedicineController::class, 'update']);
    Route::delete('/inventory/medicine/{id}', [MedicineController::class, 'destroy']);
    
    // --- BATCH ROUTES ---
    Route::get('/inventory/batches', [BatchController::class, 'index'])->name('batches.index');
    Route::post('/inventory/batches', [BatchController::class, 'store']);
    Route::put('/inventory/batches/{id}', [BatchController::class, 'update']);
    Route::delete('/inventory/batches/{id}', [BatchController::class, 'destroy']);
    
    // --- SUPPLIER ROUTES ---
    Route::get('/inventory/suppliers', [SupplierController::class, 'index'])->name('suppliers.index');
    Route::post('/inventory/suppliers', [SupplierController::class, 'store']);
    Route::put('/inventory/suppliers/{id}', [SupplierController::class, 'update']);
    Route::delete('/inventory/suppliers/{id}', [SupplierController::class, 'destroy']);

    // --- TRANSACTION ROUTES ---   
    Route::get('/general/transactions', [TransactionController::class, 'index'])->name('Transactions');
    
    // --- Protected Route for Admin Only ---
    Route::middleware([AdminMiddleware::class])->group(function () {
        Route::get('/admin/users', [UserController::class, 'index'])->name('Users');
        Route::post('/admin/users', [UserController::class, 'store']);
        Route::put('/admin/users/{id}', [UserController::class, 'update']);
        Route::delete('/admin/users/{id}', [UserController::class, 'destroy']);
    });
    
    // Add a Logout so you don't get stuck!
    Route::post('/logout', function (Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    })->name('logout');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';