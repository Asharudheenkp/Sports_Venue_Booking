<?php

namespace Database\Factories;

use App\Http\Constants\TimeConstants;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Venue>
 */
class VenueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $timeIntervals = TimeConstants::TIME_INTERVALS;

        $availableOpeningTimes = array_slice($timeIntervals, 0, -5);
        $openingTime = $this->faker->randomElement($availableOpeningTimes);
        $openingTimeIndex = array_search($openingTime, $timeIntervals);
        $closingTimeIndex = $openingTimeIndex + 4;
        $closingTime = $timeIntervals[$closingTimeIndex];

        return [
            'name' => $this->faker->company . ' Badminton Court',
            'opening_time' => $openingTime,
            'closing_time' => $closingTime,
        ];
    }
}
