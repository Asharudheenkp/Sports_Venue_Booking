import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function BookVenue({ venue, auth, timeIntervals }) {
    const [formData, setFormData] = useState({
        user_id: auth.user.id,
        venue_id: venue.id,
        date: "",
        start_time: "",
        end_time: "",
    });

    const [errors, setErrors] = useState({
        user_id: "",
        venue_id: "",
        date: "",
        start_time: "",
        end_time: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(route("api.book.venue"), formData)
            .then(({ data }) => {
                const { status, message } = data;
                if (status) {
                    toast.success(message);
                    setTimeout(() => router.visit(route("venues")), 1500);
                } else {
                    toast.error(message);
                }
            })
            .catch(({ response }) => {
                const { errors } = response.data || {};
                if (errors) {
                    Object.entries(errors).forEach(([key, value]) => {
                        setErrors({ ...errors, [key]: value.join(", ") });
                    });
                    setErrors(formattedErrors);
                }
            });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Book Slot
                    </h2>

                    <div className="text-right">
                        <p className="text-sm">
                            <strong>Venue:</strong>{" "}
                            <span className="font-medium">{venue.name}</span>
                        </p>
                        <p className="text-sm">
                            <strong>Working Hour:</strong> From{" "}
                            <span className="font-medium">
                                {venue.opening_time}
                            </span>{" "}
                            to{" "}
                            <span className="font-medium">
                                {venue.closing_time}
                            </span>
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Book Venue" />
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="date" value="Date" />
                        <TextInput
                            type="date"
                            id="date"
                            name="date"
                            onChange={handleChange}
                            value={formData.date}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <InputError
                            message={errors.date}
                            className="mt-2 text-red-500 text-sm"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="start_time" value="Start Time:" />
                        <select
                            name="start_time"
                            id="start_time"
                            onChange={handleChange}
                            value={formData.start_time}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select Start Time</option>
                            {timeIntervals.map((time, index) => (
                                <option key={index} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                        <InputError
                            message={errors.start_time}
                            className="mt-2 text-red-500 text-sm"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="end_time" value="End Time:" />
                        <select
                            name="end_time"
                            id="end_time"
                            onChange={handleChange}
                            value={formData.end_time}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select End Time</option>
                            {timeIntervals.map((time, index) => (
                                <option key={index} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                        <InputError
                            message={errors.end_time}
                            className="mt-2 text-red-500 text-sm"
                        />
                    </div>
                    <div className="flex justify-center">
                        <PrimaryButton className="text-white hover:bg-white hover:text-black hover:border-black transition duration-300 px-6 py-2">
                            Book Now
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
