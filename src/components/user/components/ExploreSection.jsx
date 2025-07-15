import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useGetActivities } from "../../../hooks/useActivityHook";
import { AuthContext } from "../../../auth/AuthProvider";
import { useCreateBooking } from "../../../hooks/useBookingsHook";
import ActivityCard from "./ActivityCard";
import BookingModal from "./BookingModal";

const ExploreSection = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { mutate: createBooking, isLoading: bookingLoading } = useCreateBooking();

  // States for activity logic
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // States for filters/search/pagination
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(""); // For filtering
  const [page, setPage] = useState(1);
  const [limit] = useState(8); // Items per page

  const {
    data,
    isLoading,
    isError,
  } = useGetActivities({
    search,
    category,
    page,
    limit,
    status: "Active",
  });

  const openBookingModal = (activity) => {
    if (!isAuthenticated) {
      toast.info("Please login to book the activity");
      return;
    }
    setSelectedActivity(activity);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedActivity(null);
  };

  const handleBookingSubmit = (formData) => {
    createBooking(formData, {
      onSuccess: () => {
        toast.success("Booking completed successfully!");
        closeBookingModal();
      },
      onError: () => {
        toast.error("Failed to complete booking.");
        console.log("formData", formData);
      },
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 when search changes
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    if (data?.pagination?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const activities = data?.data || [];

  return (
    <section className="px-6 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Explore Adventures
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by activity name..."
          value={search}
          onChange={handleSearchChange}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Filter Dropdown */}
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Categories</option>
          <option value="Rafting">Rafting</option>
          <option value="Paragliding">Paragliding</option>
          <option value="Hiking">Hiking</option>
          <option value="Hot Air Balloon">Hot Air Balloon</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      {/* Activities Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-48">Loading...</div>
      ) : isError || !activities.length ? (
        <div className="text-center text-gray-600 mt-6">No activities found.</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {activities.map((activity) => (
            <ActivityCard
              key={activity._id}
              activity={activity}
              onBook={() => openBookingModal(activity)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {data?.pagination && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600">Page {page}</span>
          <button
            onClick={handleNextPage}
            disabled={!data.pagination.hasNextPage}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
        onSubmit={handleBookingSubmit}
        activities={[selectedActivity]}
        isSubmitting={bookingLoading}
      />
    </section>
  );
};

export default ExploreSection;
