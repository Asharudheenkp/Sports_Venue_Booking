<?php

namespace App\Http\Controllers;

use App\Http\Constants\TimeConstants;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Renders the booking page for a specific venue.
     *
     * @param Venue $venue
     * @return \Inertia\Response
     */
    public function bookVenue(Venue $venue)
    {
        $timeIntervals = TimeConstants::TIME_INTERVALS;
        return Inertia::render('BookVenue', [
            'venue' => $venue,
            'timeIntervals' => $timeIntervals
        ]);
    }
}
