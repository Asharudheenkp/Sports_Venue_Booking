<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\User;
use App\Models\Venue;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        Venue::factory(20)->create();
        Booking::factory(150)->create();

    }
}
