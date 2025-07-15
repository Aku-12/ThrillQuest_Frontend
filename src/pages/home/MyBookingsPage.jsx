import React, { useContext, useState } from "react";
import { CalendarDays, MountainIcon, UserIcon } from "lucide-react";
import { useGetMyBookings } from "../../hooks/useBookingsHook";
import { AuthContext } from "../../auth/AuthProvider";
import ReviewModal from "../../components/user/components/ReviewModal";

const MyBookingsPage = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError } = useGetMyBookings({
    enabled: !!user,
  });
  console.log("data", data);
  const bookings = data?.data || [];
  const [selectedActivityId, setSelectedActivityId] = useState(null);

  if (isLoading) {
    return <div className="text-center mt-10">Loading your bookings...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 mt-10">
        Failed to load bookings.
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="text-center text-gray-500 mt-12">
        You haven’t made any bookings yet.
      </div>
    );
  }

  return (
    <section className="px-6 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        My Bookings
      </h2>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="p-6 rounded-xl shadow-sm bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <MountainIcon className="w-5 h-5 text-teal-600" />
                {booking.activity?.name || "Unknown Activity"}
              </h3>

              <div className="flex items-center gap-2 text-slate-600">
                <UserIcon className="w-4 h-4 text-purple-500" />
                Guide: {booking.guideName}
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <CalendarDays className="w-4 h-4 text-blue-500" />
                Tour Date: {new Date(booking.tourDate).toLocaleDateString()}
              </div>
              <button
                onClick={() => setSelectedActivityId(booking.activity._id)}
                className="mt-4 inline-block text-sm text-teal-600 hover:underline"
              >
                Leave a Review
              </button>

              {selectedActivityId && (
                <ReviewModal
                  activityId={selectedActivityId}
                  onClose={() => setSelectedActivityId(null)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyBookingsPage;
