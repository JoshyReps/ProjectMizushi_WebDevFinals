<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        $suppliers = [
            ['company_name' => 'PharmaCorp Industries', 'phone_number' => '0917-123-4567', 'email' => 'contact@pharmacorp.com', 'address' => '123 Health Way, Metro Manila', 'active' => true],
            ['company_name' => 'MediSupply Co.', 'phone_number' => '0918-234-5678', 'email' => 'sales@medisupply.com', 'address' => '456 Wellness Blvd, Cebu City', 'active' => true],
            ['company_name' => 'BioGenetics Labs', 'phone_number' => '0919-345-6789', 'email' => 'info@biogenlabs.com', 'address' => '789 Science Park, Davao', 'active' => true],
            ['company_name' => 'Apex Medical Distributors', 'phone_number' => '0920-456-7890', 'email' => 'orders@apexmed.ph', 'address' => '101 Apex Tower, Makati', 'active' => true],
            ['company_name' => 'CureAll Pharmaceuticals', 'phone_number' => '0921-567-8901', 'email' => 'support@cureall.com', 'address' => '202 Remedy St, Quezon City', 'active' => false],
            ['company_name' => 'Vitality Drugstore Hub', 'phone_number' => '0922-678-9012', 'email' => 'partners@vitalityhub.com', 'address' => '303 Vitamin Ave, Pasig', 'active' => true],
            ['company_name' => 'Global Med Logistics', 'phone_number' => '0923-789-0123', 'email' => 'hello@globalmed.com', 'address' => '404 Logistics Rd, Taguig', 'active' => true],
            ['company_name' => 'Prime Health Supplies', 'phone_number' => '0924-890-1234', 'email' => 'b2b@primehealth.ph', 'address' => '505 Care Circle, Iloilo', 'active' => true],
            ['company_name' => 'Zenith Pharma', 'phone_number' => '0925-901-2345', 'email' => 'contact@zenithpharma.com', 'address' => '606 Peak Blvd, Baguio', 'active' => false],
            ['company_name' => 'Nova Life Sciences', 'phone_number' => '0926-012-3456', 'email' => 'sales@novalife.com', 'address' => '707 Innovation Dr, Alabang', 'active' => true],
            ['company_name' => 'Synergy Health', 'phone_number' => '0927-123-4567', 'email' => 'admin@synergyhealth.ph', 'address' => '808 Harmony Ln, Mandaluyong', 'active' => true],
            ['company_name' => 'Optima MedEquip', 'phone_number' => '0928-234-5678', 'email' => 'supply@optimamed.com', 'address' => '909 Gear Ave, Caloocan', 'active' => true],
            ['company_name' => 'PureCure Organics', 'phone_number' => '0929-345-6789', 'email' => 'nature@purecure.com', 'address' => '111 Green St, Laguna', 'active' => false],
            ['company_name' => 'Frontier Pharmaceuticals', 'phone_number' => '0930-456-7890', 'email' => 'info@frontierrx.com', 'address' => '222 Forward Way, Batangas', 'active' => true],
            ['company_name' => 'Guardian Medical', 'phone_number' => '0931-567-8901', 'email' => 'help@guardianmed.ph', 'address' => '333 Shield Rd, Cavite', 'active' => true],
            ['company_name' => 'Sunrise Generics', 'phone_number' => '0932-678-9012', 'email' => 'orders@sunrisegen.com', 'address' => '444 Dawn St, Pampanga', 'active' => true],
            ['company_name' => 'Evergreen Health', 'phone_number' => '0933-789-0123', 'email' => 'sales@evergreenhealth.com', 'address' => '555 Pine Ave, Tarlac', 'active' => true],
            ['company_name' => 'NaturaMed Suppliers', 'phone_number' => '0934-890-1234', 'email' => 'contact@naturamed.ph', 'address' => '666 Earth Blvd, Bulacan', 'active' => true],
            ['company_name' => 'ProCare Distributors', 'phone_number' => '0935-901-2345', 'email' => 'support@procare.com', 'address' => '777 Professional Dr, Rizal', 'active' => false],
            ['company_name' => 'Summit Pharmaceuticals', 'phone_number' => '0936-012-3456', 'email' => 'b2b@summitpharma.com', 'address' => '888 Peak Rd, Antipolo', 'active' => true],
            ['company_name' => 'Core Health Partners', 'phone_number' => '0937-123-4567', 'email' => 'hello@corehealth.ph', 'address' => '999 Center Ave, Manila', 'active' => true],
            ['company_name' => 'Beacon Medical Supplies', 'phone_number' => '0938-234-5678', 'email' => 'sales@beaconmed.com', 'address' => '10A Light St, Pasay', 'active' => true],
            ['company_name' => 'Aegis Pharma Hub', 'phone_number' => '0939-345-6789', 'email' => 'info@aegispharma.com', 'address' => '20B Shield Ln, Marikina', 'active' => false],
            ['company_name' => 'Nexus Health Solutions', 'phone_number' => '0940-456-7890', 'email' => 'contact@nexushealth.ph', 'address' => '30C Connect Blvd, San Juan', 'active' => true],
            ['company_name' => 'Reliant Drug Distributors', 'phone_number' => '0941-567-8901', 'email' => 'orders@reliantdrug.com', 'address' => '40D Trust Way, Valenzuela', 'active' => true],
            ['company_name' => 'Meridian Medical', 'phone_number' => '0942-678-9012', 'email' => 'supply@meridianmed.com', 'address' => '50E Compass Rd, Navotas', 'active' => true],
            ['company_name' => 'Pioneer Pharmaceuticals', 'phone_number' => '0943-789-0123', 'email' => 'b2b@pioneerpharma.ph', 'address' => '60F First St, Malabon', 'active' => true],
            ['company_name' => 'Oasis Health Care', 'phone_number' => '0944-890-1234', 'email' => 'sales@oasishealth.com', 'address' => '70G Desert Ave, Muntinlupa', 'active' => false],
            ['company_name' => 'Vanguard MedSupply', 'phone_number' => '0945-901-2345', 'email' => 'info@vanguardmed.com', 'address' => '80H Frontline Dr, Las Pinas', 'active' => true],
            ['company_name' => 'Alliance Rx', 'phone_number' => '0946-012-3456', 'email' => 'partners@alliancerx.ph', 'address' => '90I Unity Blvd, Paranaque', 'active' => true],
        ];

        foreach ($suppliers as &$supplier) {
            $supplier['created_at'] = $now;
            $supplier['updated_at'] = $now;
        }

        DB::table('suppliers')->insert($suppliers);
    }
}