<?php

namespace Database\Factories;

use App\Models\Medicine;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

class BatchFactory extends Factory
{
    public function definition(): array
    {
        return [
            'supplier_id' => Supplier::inRandomOrder()->first()->id ?? Supplier::factory(),
            'med_id' => Medicine::inRandomOrder()->first()->id ?? Medicine::factory(),
            
            'batch_number' => 'BATCH-' . $this->faker->unique()->numerify('####'),
            'expiry_date' => $this->faker->dateTimeBetween('+1 month', '+3 years')->format('Y-m-d'),
            'buying_price' => $this->faker->randomFloat(2, 5, 1000), 
            'quantity' => $this->faker->numberBetween(10, 500),
            'status' => $this->faker->randomElement(['Active', 'Inactive']),
        ];
    }
}