<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BatchSeeder extends Seeder
{
    public function run(): void
    {
        $batches = [
            // --- HEALTHY (Good quantity, far expiry date) ---
            ['supplier_id' => 1, 'med_id' => 1, 'batch_number' => 'AMX-P02', 'expiry_date' => '2027-08-15', 'buying_price' => 8.50, 'quantity' => 200, 'status' => 'Healthy'],
            ['supplier_id' => 2, 'med_id' => 3, 'batch_number' => 'PAR-G10', 'expiry_date' => '2028-01-20', 'buying_price' => 2.20, 'quantity' => 500, 'status' => 'Healthy'],
            ['supplier_id' => 1, 'med_id' => 2, 'batch_number' => 'IBU-M01', 'expiry_date' => '2027-11-01', 'buying_price' => 5.50, 'quantity' => 150, 'status' => 'Healthy'],
            ['supplier_id' => 3, 'med_id' => 4, 'batch_number' => 'CFL-X22', 'expiry_date' => '2028-05-10', 'buying_price' => 12.75, 'quantity' => 300, 'status' => 'Healthy'],
            ['supplier_id' => 2, 'med_id' => 1, 'batch_number' => 'AMX-T99', 'expiry_date' => '2027-09-30', 'buying_price' => 8.00, 'quantity' => 120, 'status' => 'Healthy'],
            ['supplier_id' => 4, 'med_id' => 5, 'batch_number' => 'LST-A11', 'expiry_date' => '2029-02-14', 'buying_price' => 18.20, 'quantity' => 80,  'status' => 'Healthy'],
            ['supplier_id' => 1, 'med_id' => 6, 'batch_number' => 'OMZ-K05', 'expiry_date' => '2027-12-31', 'buying_price' => 6.40, 'quantity' => 250, 'status' => 'Healthy'],
            ['supplier_id' => 5, 'med_id' => 7, 'batch_number' => 'MET-B44', 'expiry_date' => '2028-08-20', 'buying_price' => 3.10, 'quantity' => 400, 'status' => 'Healthy'],
            ['supplier_id' => 2, 'med_id' => 8, 'batch_number' => 'AML-C88', 'expiry_date' => '2027-07-15', 'buying_price' => 4.50, 'quantity' => 220, 'status' => 'Healthy'],
            ['supplier_id' => 3, 'med_id' => 9, 'batch_number' => 'LOR-D12', 'expiry_date' => '2028-03-10', 'buying_price' => 2.80, 'quantity' => 180, 'status' => 'Healthy'],
            ['supplier_id' => 4, 'med_id' => 10, 'batch_number' => 'ATO-E77', 'expiry_date' => '2029-01-05', 'buying_price' => 15.60, 'quantity' => 90,  'status' => 'Healthy'],
            ['supplier_id' => 1, 'med_id' => 3, 'batch_number' => 'PAR-F33', 'expiry_date' => '2027-10-25', 'buying_price' => 1.90, 'quantity' => 600, 'status' => 'Healthy'],

            // --- LOW STOCK (Low quantity, far expiry date) ---
            ['supplier_id' => 2, 'med_id' => 2, 'batch_number' => 'IBU-M02', 'expiry_date' => '2027-06-15', 'buying_price' => 5.50, 'quantity' => 15,  'status' => 'Low Stock'],
            ['supplier_id' => 3, 'med_id' => 5, 'batch_number' => 'LST-A12', 'expiry_date' => '2028-11-20', 'buying_price' => 18.20, 'quantity' => 8,   'status' => 'Low Stock'],
            ['supplier_id' => 1, 'med_id' => 8, 'batch_number' => 'AML-C89', 'expiry_date' => '2027-09-01', 'buying_price' => 4.50, 'quantity' => 12,  'status' => 'Low Stock'],
            ['supplier_id' => 5, 'med_id' => 4, 'batch_number' => 'CFL-X23', 'expiry_date' => '2028-02-28', 'buying_price' => 12.75, 'quantity' => 5,   'status' => 'Low Stock'],
            ['supplier_id' => 4, 'med_id' => 1, 'batch_number' => 'AMX-P03', 'expiry_date' => '2027-12-10', 'buying_price' => 8.50, 'quantity' => 18,  'status' => 'Low Stock'],

            // --- EXPIRING (Expiry date approaching within ~3 months) ---
            ['supplier_id' => 1, 'med_id' => 6, 'batch_number' => 'OMZ-K06', 'expiry_date' => '2026-04-30', 'buying_price' => 6.40, 'quantity' => 80,  'status' => 'Expiring'],
            ['supplier_id' => 2, 'med_id' => 9, 'batch_number' => 'LOR-D13', 'expiry_date' => '2026-05-15', 'buying_price' => 2.80, 'quantity' => 120, 'status' => 'Expiring'],
            ['supplier_id' => 3, 'med_id' => 7, 'batch_number' => 'MET-B45', 'expiry_date' => '2026-06-10', 'buying_price' => 3.10, 'quantity' => 200, 'status' => 'Expiring'],
            ['supplier_id' => 4, 'med_id' => 3, 'batch_number' => 'PAR-G11', 'expiry_date' => '2026-05-01', 'buying_price' => 2.20, 'quantity' => 45,  'status' => 'Expiring'],
            ['supplier_id' => 5, 'med_id' => 10, 'batch_number' => 'ATO-E78', 'expiry_date' => '2026-06-30', 'buying_price' => 15.60, 'quantity' => 60,  'status' => 'Expiring'],

            // --- EXPIRED (Expiry date in the past) ---
            ['supplier_id' => 2, 'med_id' => 1, 'batch_number' => 'AMX-P00', 'expiry_date' => '2025-12-15', 'buying_price' => 8.50, 'quantity' => 30,  'status' => 'Expired'],
            ['supplier_id' => 1, 'med_id' => 4, 'batch_number' => 'CFL-X20', 'expiry_date' => '2026-01-20', 'buying_price' => 12.75, 'quantity' => 10,  'status' => 'Expired'],
            ['supplier_id' => 3, 'med_id' => 2, 'batch_number' => 'IBU-M00', 'expiry_date' => '2025-10-31', 'buying_price' => 5.50, 'quantity' => 50,  'status' => 'Expired'],
            ['supplier_id' => 5, 'med_id' => 8, 'batch_number' => 'AML-C80', 'expiry_date' => '2026-02-14', 'buying_price' => 4.50, 'quantity' => 25,  'status' => 'Expired'],
            ['supplier_id' => 4, 'med_id' => 5, 'batch_number' => 'LST-A09', 'expiry_date' => '2025-08-05', 'buying_price' => 18.20, 'quantity' => 15,  'status' => 'Expired'],

            // --- ARCHIVE (Very old batches, typically 0 quantity) ---
            ['supplier_id' => 1, 'med_id' => 3, 'batch_number' => 'PAR-F30', 'expiry_date' => '2024-05-10', 'buying_price' => 1.90, 'quantity' => 0,   'status' => 'Archive'],
            ['supplier_id' => 2, 'med_id' => 6, 'batch_number' => 'OMZ-K01', 'expiry_date' => '2024-11-20', 'buying_price' => 6.40, 'quantity' => 0,   'status' => 'Archive'],
            ['supplier_id' => 3, 'med_id' => 10, 'batch_number' => 'ATO-E70', 'expiry_date' => '2023-12-01', 'buying_price' => 15.60, 'quantity' => 0,   'status' => 'Archive'],
            ['supplier_id' => 4, 'med_id' => 7, 'batch_number' => 'MET-B40', 'expiry_date' => '2024-08-15', 'buying_price' => 3.10, 'quantity' => 0,   'status' => 'Archive'],
            ['supplier_id' => 5, 'med_id' => 9, 'batch_number' => 'LOR-D10', 'expiry_date' => '2025-01-30', 'buying_price' => 2.80, 'quantity' => 0,   'status' => 'Archive'],
        ];

        $now = now();
        $batches = array_map(function ($batch) use ($now) {
            $batch['created_at'] = $now;
            $batch['updated_at'] = $now;
            return $batch;
        }, $batches);

        DB::table('batches')->insert($batches);
    }
}