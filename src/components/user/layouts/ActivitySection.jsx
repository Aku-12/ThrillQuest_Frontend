import React, { useContext, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import BookingModal from "../components/BookingModal";
import { useGetActivities } from "../../../hooks/useActivityHook";
import { AuthContext } from "../../../auth/AuthProvider";
import { toast } from "react-toastify";
import { useCreateBooking } from "../../../hooks/useBookingsHook";

const ActivitySection = () => {
  const { data, isLoading, isError } = useGetActivities({
    search: "",
    page: 1,
    limit: 8,
    status: "Active",
  });

  const { isAuthenticated } = useContext(AuthContext);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { mutate: createBooking, isLoading: bookingLoading } = useCreateBooking();

  // Open modal on Book button
  const openBookingModal = (activity) => {
    if (!isAuthenticated) {
      toast.info("Please login to book the activity");
      return;
    }
    setSelectedActivity(activity);
    setIsBookingModalOpen(true);
  };

  // Close modal
  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedActivity(null);
  };

  // Submit booking
  const handleBookingSubmit = (formData) => {
    createBooking(formData, {
      onSuccess: () => {
        toast.success("Booking completed successfully!");
        closeBookingModal();
      },
      onError: () => {
        toast.error("Failed to complete booking.");
        console.log("activity section formData", formData)
      }, 
    });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-48">Loading...</div>;
  }

  if (isError || !data?.data?.length) {
    return (
      <div className="text-center text-gray-600 mt-6">
        No activities found or an error occurred.
      </div>
    );
  }

  const activities = data.data;

  return (
    <section className="px-6 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Popular Activities
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {activities.map((activity) => (
          <ActivityCard
            key={activity._id}
            activity={activity}
            onBook={() => openBookingModal(activity)}
          />
        ))}
      </div>

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

export default ActivitySection;
 