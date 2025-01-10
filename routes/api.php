<?php

use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\RegistrationController;
use App\Http\Controllers\Api\VenueController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegistrationController::class, 'register']);

Route::middleware('auth:sanctum')->name('api.')->group(function() {
    Route::post('/venues', [VenueController::class, 'venueList'])->name('venues');
    Route::post('/venue/performance', [VenueController::class, 'venuePerformance'])->name('ranked.venues');
    Route::post('/booking/venue', [BookingController::class, 'bookingVenue'])->name('book.venue');
});
