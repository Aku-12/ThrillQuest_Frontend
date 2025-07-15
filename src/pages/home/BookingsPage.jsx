import React, { useState } from "react";
import BookingModal from "../../components/user/components/BookingModal";
import { useCreateBooking } from "../../hooks/useBookingsHook";

export default function BookingsPage({ activities }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const createBookingMutation = useCreateBooking();

  const handleCreateBooking = (formData) => {
    createBookingMutation.mutate(formData);
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition"
      >
        Create Booking
      </button>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateBooking}
        activities={activities}
      />
    </div>
  );
}
