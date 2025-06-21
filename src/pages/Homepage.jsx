import React from "react";
import ActivitiesList from "./home/ActivitiesList"; // Adjust path as needed

export default function Homepage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mt-4">
        Welcome to Thrill Quest
      </h1>
      <p className="text-gray-600 text-center mt-2">
        Discover thrilling activities like Rafting, Rock Climbing, Bungee Jumping, Paragliding and more!
      </p>
      <div className="mt-8">
        <ActivitiesList />
      </div>
    </div>
  );
}
