import PrimaryButton from "@/Components/PrimaryButton";
import SkeletonLoaderForVenue from "@/Components/SkeletonLoaderForVenue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
export default function RankedVenue() {
    const currentDate = new Date();
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [month, setMonth] = useState(currentDate.getMonth() + 1);
    const [year, setYear] = useState(currentDate.getFullYear());

    const getRankBg = (rank) => {
        switch (rank) {
            case "A":
                return "bg-green-500";
            case "B":
                return "bg-blue-300";
            case "C":
                return "bg-orange-400";
            case "D":
                return "bg-red-500";
            default:
                return "bg-grey-200";
        }
    };

    const fetchVenues = () => {
        setLoading(true);
        axios.get("/sanctum/csrf-cookie").then(() => {
            axios
                .post(route("api.ranked.venues"), { month, year })
                .then((response) => {
                    setVenues(response.data.rankedVenues);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching venues:", error);
                    setLoading(false);
                });
        });
    };

    useEffect(() => {
        fetchVenues();
    }, [month, year]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Ranked Venues
                </h2>
            }
        >
            <Head title="Ranked Venues" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg sm:rounded-lg p-6 space-y-6">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                            Ranked Venues
                        </h1>

                        <form className="flex space-x-4 items-center mb-6">
                            <select
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select Month</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {new Date(0, i).toLocaleString(
                                            "default",
                                            { month: "long" }
                                        )}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select Year</option>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <option
                                        key={i}
                                        value={new Date().getFullYear() - i}
                                    >
                                        {new Date().getFullYear() - i}
                                    </option>
                                ))}
                            </select>
                        </form>

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
                                    className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center hover:bg-gray-100 transition-all duration-300 ease-in-out"
                                    key={venue.id}
                                >
                                    <div>
                                        <p className="text-2xl font-semibold text-gray-800">
                                            {venue.name}
                                        </p>
                                        <p className="text-sm font-mono text-gray-500">
                                            Category:{" "}
                                            <span
                                                className={`text-lg text-white px-2 py-1 rounded-md ${getRankBg(
                                                    venue.category
                                                )}`}
                                            >
                                                <strong>
                                                    {" "}
                                                    {venue.category}
                                                </strong>
                                            </span>
                                        </p>
                                        <p className="text-sm font-mono text-gray-500">
                                            Bookings:{venue.bookings_count}
                                        </p>
                                    </div>
                                    <Link
                                        href={route("booking.page", venue.id)}
                                    >
                                        <PrimaryButton className="text-white hover:bg-white hover:text-black hover:border-black transition duration-300 px-6 py-2">
                                            Book
                                        </PrimaryButton>
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
