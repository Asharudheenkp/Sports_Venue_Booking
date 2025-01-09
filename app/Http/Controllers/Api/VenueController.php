<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Venue;
use Illuminate\Http\Request;

class VenueController extends Controller
{
    /**
     * Retrieves a list of venues with their booking counts, sorted in descending order.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function venueList()
    {
        $venues = Venue::withCount(Booking::getTableName())->orderByDesc('bookings_count')->get();
        $highest = $venues->first();
        $lowest = $venues->last();
        return response()->json(['status' => true, 'venues' => $venues, 'highest' => $highest, 'lowest' => $lowest]);
    }

    /**
     * Retrieves and categorizes venues based on their booking count for a specified month and year.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function venuePerformance(Request $request)
    {
        $month = $request->month ?? now()->month;
        $year = $request->year ?? now()->year;

        $rankedVenues = Venue::withCount([Booking::getTableName() => function($query) use($month, $year) {
            $query->whereMonth('date', $month)->whereYear('date', $year);
        }])->get();

        $rankedVenues->each(function($venue) {
            if ($venue->bookings_count > 15) {
                $venue->category = 'A';
            } elseif ($venue->bookings_count >= 10) {
                $venue->category = 'B';
            } elseif ($venue->bookings_count >= 5) {
                $venue->category = 'C';
            } else {
                $venue->category = 'D';
            }
        });

        return response()->json(['status' => true, 'rankedVenues' => $rankedVenues]);

    }
}
