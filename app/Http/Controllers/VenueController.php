<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VenueController extends Controller
{
    /**
     * Render the venues list page (can send data from here but using api to fetch the data now).
     *
     * @return \Inertia\Response
     */
    public function venues()
    {
        return Inertia::render('Venues');
    }

    /**
     * Render the ranked venues page (can send data from here but using api to fetch the data now).
     *
     * @return \Inertia\Response
     */
    public function rankedVenues()
    {
        return Inertia::render('RankedVenue');
    }
}
