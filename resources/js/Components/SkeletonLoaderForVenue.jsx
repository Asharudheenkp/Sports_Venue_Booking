import React from "react";

const SkeletonLoaderForVenue = () => {
    return (
        <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="bg-gray-200 rounded-lg p-6 flex justify-between items-center animate-pulse"
                >
                    <div className="space-y-2">
                        <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
                        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                    </div>
                    <div className="w-24 h-10 bg-gray-300 rounded"></div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoaderForVenue;
