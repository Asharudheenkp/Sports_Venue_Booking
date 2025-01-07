<?php

namespace Database\Factories;

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
        $timeIntervals = [
            '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
            '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
            '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
            '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
            '20:00', '20:30', '21:00', '21:30', '22:00',
        ];

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
