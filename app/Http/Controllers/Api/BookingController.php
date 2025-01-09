<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Venue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    /**
     * Handles venue booking requests.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function bookingVenue(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'venue_id' => 'required|exists:venues,id',
            'date' => 'required|date|after_or_equal:today|before_or_equal:' . now()->addMonth()->format('Y-m-d'),
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ],[
            'date.before_or_equal' => 'You can only book slots within the next 30 days.',
            'date.after_or_equal' => 'The booking date must be today or a future date.',
        ]);

        if ($validator->fails()) {
            return response()->json([ 'status' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $venue = Venue::find($request->venue_id);

        if ( $request->start_time < $venue->opening_time || $request->end_time > $venue->closing_time ) {
            return response()->json([ 'status' => false, 'message' => 'Booking time must be within the venue’s working hours.', ]);
        }

        $existingBooking = Booking::where('venue_id', $request->venue_id)
            ->where('date', $request->date)
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_time', [$request->start_time, $request->end_time])
                    ->orWhereBetween('end_time', [$request->start_time, $request->end_time])
                    ->orWhere(function ($query) use ($request) {
                        $query->where('start_time', '<=', $request->start_time)
                            ->where('end_time', '>=', $request->end_time);
                    });
            })
            ->exists();

        if ($existingBooking) {
            return response()->json(['status' => false, 'message' => 'The selected time slot is already booked.']);
        }

        $booking = Booking::create([
            'user_id' => $request->user_id,
            'venue_id' => $request->venue_id,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
        ]);

        return response()->json(['status' => true, 'message' => 'Booking successful!', 'booking' => $booking]);
    }
}
