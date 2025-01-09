<?php

namespace Database\Factories;

use App\Http\Constants\TimeConstants;
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
        $timeIntervals = TimeConstants::TIME_INTERVALS;

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
