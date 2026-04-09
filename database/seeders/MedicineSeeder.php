<?php

namespace Database\Seeders;

use App\Models\Medicine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MedicineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $medicines = [
            ['med_name' => 'Amoxicillin', 'gen_name' => 'Amoxicillin Trihydrate', 'category' => 'Antibiotics', 'strength' => '500mg', 'selling_price' => 12.50, 'formulation' => 'Capsule', 'selling_unit' => 'Piece'],
            ['med_name' => 'Biogesic', 'gen_name' => 'Paracetamol', 'category' => 'Analgesics', 'strength' => '500mg', 'selling_price' => 5.00, 'formulation' => 'Tablet', 'selling_unit' => 'Piece'],
            ['med_name' => 'Ascof Forte', 'gen_name' => 'Lagundi Leaf', 'category' => 'Cough & Cold', 'strength' => '600mg', 'selling_price' => 15.00, 'formulation' => 'Syrup', 'selling_unit' => 'Bottle'],
            ['med_name' => 'Neozep Forte', 'gen_name' => 'Phenylephrine HCl', 'category' => 'Cough & Cold', 'strength' => '25mg', 'selling_price' => 7.50, 'formulation' => 'Tablet', 'selling_unit' => 'Piece'],
            ['med_name' => 'Iterax', 'gen_name' => 'Hydroxyzine Di-HCl', 'category' => 'Antihistamine', 'strength' => '25mg', 'selling_price' => 22.00, 'formulation' => 'Tablet', 'selling_unit' => 'Piece'],
            ['med_name' => 'Mefenamic Acid', 'gen_name' => 'Gardan', 'category' => 'Analgesics', 'strength' => '500mg', 'selling_price' => 18.00, 'formulation' => 'Capsule', 'selling_unit' => 'Piece'],
            ['med_name' => 'Solmux', 'gen_name' => 'Carbocisteine', 'category' => 'Cough & Cold', 'strength' => '500mg', 'selling_price' => 11.00, 'formulation' => 'Capsule', 'selling_unit' => 'Piece'],
            ['med_name' => 'Alaxan FR', 'gen_name' => 'Ibuprofen + Paracetamol', 'category' => 'Analgesics', 'strength' => '200mg/325mg', 'selling_price' => 9.00, 'formulation' => 'Capsule', 'selling_unit' => 'Piece'],
            ['med_name' => 'Amlodipine', 'gen_name' => 'Norvasc', 'category' => 'Cardiovascular', 'strength' => '5mg', 'selling_price' => 15.50, 'formulation' => 'Tablet', 'selling_unit' => 'Piece'],
            ['med_name' => 'Losartan', 'gen_name' => 'Lifezar', 'category' => 'Cardiovascular', 'strength' => '50mg', 'selling_price' => 25.00, 'formulation' => 'Tablet', 'selling_unit' => 'Piece'],
            ['med_name' => 'Metformin', 'gen_name' => 'Glucophage', 'category' => 'Antidiabetic', 'strength' => '500mg', 'selling_price' => 14.00, 'formulation' => 'Tablet', 'selling_unit' => 'Piece'],
            ['med_name' => 'Simvastatin', 'gen_name' => 'Vidastat', 'category' => 'Cardiovascular', 'strength' => '20mg', 'selling_price' => 30.00, 'formulation' => 'Tablet', 'selling_unit' => 'Piece'],
            ['med_name' => 'Cetirizine', 'gen_name' => 'Virlix', 'category' => 'Antihistamine', 'strength' => '10mg', 'selling_price' => 12.00, 'formulation' => 'Tablet', 'selling_unit' => 'Piece'],
            ['med_name' => 'Kremil-S', 'gen_name' => 'Aluminum Hydroxide', 'category' => 'Gastrointestinal', 'strength' => 'N/A', 'selling_price' => 8.50, 'formulation' => 'Tablet', 'selling_unit' => 'Piece'],
            ['med_name' => 'Loperamide', 'gen_name' => 'Imodium', 'category' => 'Gastrointestinal', 'strength' => '2mg', 'selling_price' => 10.00, 'formulation' => 'Capsule', 'selling_unit' => 'Piece'],
            ['med_name' => 'Azithromycin', 'gen_name' => 'Zithromax', 'category' => 'Antibiotics', 'strength' => '500mg', 'selling_price' => 150.00, 'formulation' => 'Tablet', 'selling_unit' => 'Piece'],
            ['med_name' => 'Cefuroxime', 'gen_name' => 'Zinnat', 'category' => 'Antibiotics', 'strength' => '500mg', 'selling_price' => 85.00, 'formulation' => 'Tablet', 'selling_unit' => 'Piece'],
            ['med_name' => 'Clarithromycin', 'gen_name' => 'Klaricid', 'category' => 'Antibiotics', 'strength' => '500mg', 'selling_price' => 95.00, 'formulation' => 'Tablet', 'selling_unit' => 'Piece'],
            ['med_name' => 'Omeprazole', 'gen_name' => 'Omepron', 'category' => 'Gastrointestinal', 'strength' => '20mg', 'selling_price' => 45.00, 'formulation' => 'Capsule', 'selling_unit' => 'Piece'],
            ['med_name' => 'Salbutamol', 'gen_name' => 'Ventolin', 'category' => 'Respiratory', 'strength' => '100mcg', 'selling_price' => 350.00, 'formulation' => 'Inhaler', 'selling_unit' => 'Piece'],
            ['med_name' => 'Fluticasone', 'gen_name' => 'Flixonase', 'category' => 'Respiratory', 'strength' => '50mcg', 'selling_price' => 650.00, 'formulation' => 'Nasal Spray', 'selling_unit' => 'Bottle'],
            ['med_name' => 'Betadine', 'gen_name' => 'Povidone-Iodine', 'category' => 'Antiseptic', 'strength' => '10%', 'selling_price' => 120.00, 'formulation' => 'Solution', 'selling_unit' => 'Bottle'],
            ['med_name' => 'Mupirocin', 'gen_name' => 'Fucidin', 'category' => 'Dermatological', 'strength' => '2%', 'selling_price' => 450.00, 'formulation' => 'Ointment', 'selling_unit' => 'Tube'],
            ['med_name' => 'Hydrocortisone', 'gen_name' => 'Elica', 'category' => 'Dermatological', 'strength' => '0.1%', 'selling_price' => 580.00, 'formulation' => 'Cream', 'selling_unit' => 'Tube'],
            ['med_name' => 'Multivitamins', 'gen_name' => 'Enervon', 'category' => 'Vitamins', 'strength' => 'N/A', 'selling_price' => 8.00, 'formulation' => 'Tablet', 'selling_unit' => 'Piece'],
            ['med_name' => 'Vitamin C', 'gen_name' => 'Poten-Cee', 'category' => 'Vitamins', 'strength' => '500mg', 'selling_price' => 7.00, 'formulation' => 'Tablet', 'selling_unit' => 'Piece'],
            ['med_name' => 'Iron + Folic', 'gen_name' => 'Sangobion', 'category' => 'Vitamins', 'strength' => 'N/A', 'selling_price' => 22.00, 'formulation' => 'Capsule', 'selling_unit' => 'Piece'],
            ['med_name' => 'Gaviscon', 'gen_name' => 'Sodium Alginate', 'category' => 'Gastrointestinal', 'strength' => '10ml', 'selling_price' => 35.00, 'formulation' => 'Sachet', 'selling_unit' => 'Sachet'],
            ['med_name' => 'Hydrite', 'gen_name' => 'Oral Rehydration', 'category' => 'Gastrointestinal', 'strength' => 'N/A', 'selling_price' => 15.00, 'formulation' => 'Powder', 'selling_unit' => 'Sachet'],
            ['med_name' => 'Tuseran Night', 'gen_name' => 'Multi-Symptom', 'category' => 'Cough & Cold', 'strength' => 'N/A', 'selling_price' => 12.00, 'formulation' => 'Syrup', 'selling_unit' => 'Bottle'],
        ];

        foreach ($medicines as $med) {
            Medicine::create(array_merge($med, [
                'min_stock_level' => rand(20, 100),
                'status' => 1,
                'net_content' => 'Standard Pack',
                'description' => 'Pharmaceutical grade ' . $med['med_name'] . ' for patient care.'
            ]));
        }
    }
}
