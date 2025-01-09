<?php

use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\VenueController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::name('api.')->group(function() {
    Route::post('/venues', [VenueController::class, 'venueList'])->name('venues');
    Route::post('/venue/performance', [VenueController::class, 'venuePerformance'])->name('ranked.venues');
    Route::post('/booking/venue', [BookingController::class, 'bookingVenue'])->name('book.venue');
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
