<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        $criticalStock = Batch::where('status', 'Low Stock')->count();
        $criticalExpiry = Batch::where('status', 'Expiring')->count();
        
        $inventoryValue = Batch::whereNotIn('status', ['Expired', 'Archive'])
            ->sum(DB::raw('quantity * buying_price'));

        $dailyRevenue = Transaction::whereDate('created_at', $today)
            ->sum('total_amount');

        $todaySales = Transaction::with(['pharmacist', 'items'])
            ->whereDate('created_at', $today)
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($transaction) {
    return [
        'id' => $transaction->id,
        'time' => $transaction->created_at, 
        'pharmacist' => $transaction->pharmacist->first_name . ' ' . $transaction->pharmacist->last_name,
        'itemsCount' => $transaction->items->sum('quantity'), 
        'total' => (float) $transaction->total_amount, 
    ];
});


        $batchStatuses = Batch::select('status', DB::raw('count(*) as count'))
            ->whereIn('status', ['Healthy', 'Low Stock', 'Expiring', 'Critical', 'Expired'])
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        $expiryChartData = Batch::with('medicine')
            ->whereIn('status', ['Expiring', 'Critical', 'Expired'])
            ->get()
            ->map(function ($batch) use ($today) {
                $expiryDate = Carbon::parse($batch->expiry_date);
                $days = $today->diffInDays($expiryDate, false); 
                
                return [
                    'name' => $batch->medicine->med_name . ' (' . $batch->batch_number . ')',
                    'days' => (int) $days,
                    
                    'status' => $batch->status, 
                ];
            })
            ->sortBy('days') 
            ->values();


        $startDate = Carbon::today()->subDays(6);
        
        $salesData = Transaction::where('created_at', '>=', $startDate)
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(total_amount) as total'))
            ->groupBy('date')
            ->pluck('total', 'date')
            ->toArray();

        $avgStartDate = $startDate->copy()->subDays(28); 
        $historicalSales = Transaction::where('created_at', '>=', $avgStartDate)
            ->where('created_at', '<', $startDate)
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(total_amount) as daily_total'))
            ->groupBy('date')
            ->get();

        $dayAverages = $historicalSales->groupBy(function($item) {
            return Carbon::parse($item->date)->format('l');
        })->map(function($group) {
            return $group->avg('daily_total');
        });

        $weeklySalesData = [];
        
        for ($i = 0; $i < 7; $i++) {
            $currentDate = $startDate->copy()->addDays($i);
            $dateString = $currentDate->format('Y-m-d');
            $dayName = $currentDate->format('l');
            
            $weeklySalesData[] = [
                'day' => $dayName,
                'sales' => isset($salesData[$dateString]) ? (float) $salesData[$dateString] : 0,
                'average' => $dayAverages->has($dayName) ? (float) $dayAverages[$dayName] : 0, 
            ];
        }

        return Inertia::render('Dashboard', [
            'stats' => [
                'criticalStock' => $criticalStock,
                'criticalExpiry' => $criticalExpiry,
                'inventoryValue' => (float) $inventoryValue,
                'dailyRevenue' => (float) $dailyRevenue,
            ],
            'todaySales' => $todaySales,
            'batchStatuses' => $batchStatuses,
            'expiryData' => $expiryChartData,  
            'weeklySales' => $weeklySalesData, 
        ]);
    }
}