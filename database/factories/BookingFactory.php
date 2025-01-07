<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $timeIntervals = [
            '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
            '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
            '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
            '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
            '20:00', '20:30', '21:00', '21:30', '22:00',
        ];

        $availableOpeningTimes = array_slice($timeIntervals, 0, -3);
        $startTime  = $this->faker->randomElement($availableOpeningTimes);
        $startTimeIndex  = array_search($startTime, $timeIntervals);
        $endTimeIndex = $startTimeIndex + 2;
        $endTime = $timeIntervals[$endTimeIndex];
        $date = $this->faker->dateTimeBetween('now', '+1 month')->format('Y-m-d');

        $venue_id = Venue::inRandomOrder()->first()->id;
        $user_id = User::inRandomOrder()->first()->id;

        return [
            'user_id' => $user_id,
            'venue_id' => $venue_id,
            'date' => $date,
            'start_time' => $startTime,
            'end_time' => $endTime,
        ];
    }
}
