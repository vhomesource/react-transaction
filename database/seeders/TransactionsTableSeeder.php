<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransactionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('transactions')->insert([
            [
                'timestamp' => '2025-07-01 08:15:00',
                'amount' => 250.75,
                'description' => 'Salary deposit',
                'accountType' => 'checking',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'timestamp' => '2025-07-01 09:10:00',
                'amount' => -60.00,
                'description' => 'Electricity bill payment',
                'accountType' => 'checking',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'timestamp' => '2025-07-01 10:20:00',
                'amount' => 1200.00,
                'description' => 'Freelance project income',
                'accountType' => 'savings',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'timestamp' => '2025-07-01 11:05:00',
                'amount' => -35.50,
                'description' => 'Grocery shopping',
                'accountType' => 'checking',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'timestamp' => '2025-07-01 12:30:00',
                'amount' => -150.00,
                'description' => 'Credit card payment',
                'accountType' => 'credit',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'timestamp' => '2025-07-01 13:45:00',
                'amount' => 500.00,
                'description' => 'Tax refund',
                'accountType' => 'savings',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'timestamp' => '2025-07-01 14:30:00',
                'amount' => -25.00,
                'description' => 'Restaurant',
                'accountType' => 'checking',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'timestamp' => '2025-07-01 15:00:00',
                'amount' => -200.00,
                'description' => 'Car insurance',
                'accountType' => 'checking',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'timestamp' => '2025-07-01 16:20:00',
                'amount' => 75.00,
                'description' => 'Gift received',
                'accountType' => 'savings',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'timestamp' => '2025-07-01 17:10:00',
                'amount' => -80.00,
                'description' => 'Online shopping',
                'accountType' => 'credit',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
