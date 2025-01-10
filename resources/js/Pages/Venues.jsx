import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
export default function Venues() {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios
            .post(route("api.venues"))
            .then((response) => {
                setVenues(response.data.venues);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching venues:", error));
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

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
                        {venues.map((venue) => (
                            <div className="bg-white shadow-md rounded-lg p-6 mb-3 flex justify-between items-center hover:bg-gray-50 transition-all duration-300 ease-in-out" key={venue.id}>
                                <div>
                                    <p className="text-2xl font-semibold text-gray-800">
                                        {venue.name}
                                    </p>
                                    <p className="text-sm font-mono text-gray-500">
                                        Bookings:{venue.bookings_count}
                                    </p>
                                </div>
                                <Link href={route("booking.page", venue.id)}>
                                    <PrimaryButton className="text-white hover:bg-white hover:text-black hover:border-black transition duration-300 px-6 py-2">
                                        Book
                                    </PrimaryButton>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
