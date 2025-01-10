import PrimaryButton from "@/Components/PrimaryButton";
import SkeletonLoaderForVenue from "@/Components/SkeletonLoaderForVenue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
export default function Venues() {
    const [venues, setVenues] = useState([]);
    const [maxBooking, SetMaxBooking] = useState(0);
    const [minBooking, SetMinBooking] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/sanctum/csrf-cookie").then(() => {
            axios
                .post(route("api.venues"))
                .then((response) => {
                    setVenues(response.data.venues);
                    SetMaxBooking(response.data.highest.bookings_count);
                    SetMinBooking(response.data.lowest.bookings_count);
                    setLoading(false);
                })
                .catch((error) =>
                    console.error("Error fetching venues:", error)
                );
        });
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Venues
                </h2>
            }
        >
            <Head title="Venues" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg sm:rounded-lg p-6 space-y-6">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                            Venues
                        </h1>
                        {loading ? (
                            <SkeletonLoaderForVenue />
                        ) : venues.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-md shadow-md">
                                <p className="text-lg font-semibold text-gray-600 mb-2">
                                    No venues found
                                </p>
                            </div>
                        ) : (
                            venues.map((venue) => (
                                <div
                                    className={`bg-white shadow-lg rounded-lg p-6 mb-4 flex justify-between items-center hover:bg-gray-100 transition-all duration-300 ease-in-out ${
                                        venue.bookings_count === maxBooking
                                            ? "bg-green-50 border-l-8 border-green-500 transform scale-105"
                                            : ""
                                    } ${
                                        venue.bookings_count === minBooking
                                            ? "bg-red-50 border-l-8 border-red-500 transform scale-95"
                                            : ""
                                    }`}
                                    key={venue.id}
                                >
                                    <div className="flex flex-col">
                                        <p className="text-2xl font-semibold text-gray-800">
                                            {venue.name}
                                        </p>
                                        <p className="text-sm font-mono text-gray-500">
                                            Bookings: {venue.bookings_count}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {venue.bookings_count ===
                                            maxBooking && (
                                            <span className="text-green-500 text-lg font-bold">
                                                Highest Booking
                                            </span>
                                        )}
                                        {venue.bookings_count ===
                                            minBooking && (
                                            <span className="text-red-500 text-lg font-bold">
                                                Lowest Booking
                                            </span>
                                        )}
                                        <Link
                                            href={route(
                                                "booking.page",
                                                venue.id
                                            )}
                                        >
                                            <PrimaryButton className="text-white hover:bg-white hover:text-black hover:border-black transition duration-300 px-6 py-2">
                                                Book
                                            </PrimaryButton>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
