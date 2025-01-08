<?php

use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\VenueController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/venues', [VenueController::class, 'venueList']);
Route::post('/venue/performance', [VenueController::class, 'venuePerformance']);
Route::post('/booking/venue', [BookingController::class, 'bookingVenue']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
