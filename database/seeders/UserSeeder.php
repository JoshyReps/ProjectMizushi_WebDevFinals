<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultPassword = Hash::make('password123');

        $pharmacists = [
            [
                'first_name'    => 'Jane',
                'last_name'     => 'Doe',
                'email'         => 'jane.doe@pharmacy.com',
                'password_hash' => $defaultPassword,
                'role'          => 'ADMIN',
                'status'        => 1,
                'joined_date'   => Carbon::now()->subMonths(12)->format('Y-m-d'),
                'last_login'    => Carbon::now()->subDays(1)->format('Y-m-d'),
            ],
            [
                'first_name'    => 'John',
                'last_name'     => 'Smith',
                'email'         => 'john.smith@pharmacy.com',
                'password_hash' => $defaultPassword,
                'role'          => 'Pharmacist',
                'status'        => 1,
                'joined_date'   => Carbon::now()->subMonths(8)->format('Y-m-d'),
                'last_login'    => Carbon::now()->subHours(5)->format('Y-m-d'),
            ],
            [
                'first_name'    => 'Maria',
                'last_name'     => 'Garcia',
                'email'         => 'maria.garcia@pharmacy.com',
                'password_hash' => $defaultPassword,
                'role'          => 'Pharmacist',
                'status'        => 1, 
                'joined_date'   => Carbon::now()->subMonths(24)->format('Y-m-d'),
                'last_login'    => Carbon::now()->subDays(2)->format('Y-m-d'),
            ],
            [
                'first_name'    => 'David',
                'last_name'     => 'Lee',
                'email'         => 'david.lee@pharmacy.com',
                'password_hash' => $defaultPassword,
                'role'          => 'Pharmacist',
                'status'        => 1, 
                'joined_date'   => Carbon::now()->subMonths(6)->format('Y-m-d'),
                'last_login'    => Carbon::now()->format('Y-m-d'), 
            ],
            [
                'first_name'    => 'Sarah',
                'last_name'     => 'Johnson',
                'email'         => 'sarah.j@pharmacy.com',
                'password_hash' => $defaultPassword,
                'role'          => 'Pharmacist',
                'status'        => 1,
                'joined_date'   => Carbon::now()->subMonths(3)->format('Y-m-d'),
                'last_login'    => Carbon::now()->subDays(4)->format('Y-m-d'),
            ],
            [
                'first_name'    => 'Michael',
                'last_name'     => 'Chen',
                'email'         => 'michael.c@pharmacy.com',
                'password_hash' => $defaultPassword,
                'role'          => 'Pharmacist',
                'status'        => 1,
                'joined_date'   => Carbon::now()->subMonths(1)->format('Y-m-d'),
                'last_login'    => Carbon::now()->subDays(1)->format('Y-m-d'),
            ],
            [
                'first_name'    => 'Emily',
                'last_name'     => 'Davis',
                'email'         => 'emily.davis@pharmacy.com',
                'password_hash' => $defaultPassword,
                'role'          => 'Pharmacist',
                'status'        => 1, 
                'joined_date'   => Carbon::now()->subMonths(15)->format('Y-m-d'),
                'last_login'    => Carbon::now()->subWeeks(1)->format('Y-m-d'),
            ],
            [
                'first_name'    => 'Robert',
                'last_name'     => 'Wilson',
                'email'         => 'robert.w@pharmacy.com',
                'password_hash' => $defaultPassword,
                'role'          => 'Pharmacist',
                'status'        => 1, 
                'joined_date'   => Carbon::now()->subMonths(4)->format('Y-m-d'),
                'last_login'    => Carbon::now()->format('Y-m-d'), 
            ],
            [
                'first_name'    => 'Jessica',
                'last_name'     => 'Taylor',
                'email'         => 'jessica.t@pharmacy.com',
                'password_hash' => $defaultPassword,
                'role'          => 'Pharmacist',
                'status'        => 0, 
                'joined_date'   => Carbon::now()->subMonths(20)->format('Y-m-d'),
                'last_login'    => Carbon::now()->subMonths(5)->format('Y-m-d'), 
            ],
            [
                'first_name'    => 'William',
                'last_name'     => 'Brown',
                'email'         => 'william.b@pharmacy.com',
                'password_hash' => $defaultPassword,
                'role'          => 'Pharmacist',
                'status'        => 0, 
                'joined_date'   => Carbon::now()->subMonths(10)->format('Y-m-d'),
                'last_login'    => Carbon::now()->subMonths(2)->format('Y-m-d'),
            ],
        ];

        foreach ($pharmacists as $pharmacist) {
            User::create($pharmacist);
        }
    }
}