import React from "react";
import { useGetBookings, useUpdateBooking } from "../../hooks/useBookingsHook";
import { toast } from "react-toastify";

// --- Status Badges (Unchanged) ---
const PaymentStatusBadge = ({ status }) => {
  const styles = {
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Refunded: "bg-gray-100 text-gray-700",
  };
  return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>{status}</span>;
};

// --- Action Menu (Optional Edit/Delete) ---
const ActionMenu = ({ onEdit, onDelete }) => (
  <details className="relative">
    <summary className="list-none cursor-pointer p-2 rounded-full hover:bg-gray-100">
      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
    </summary>
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      <button onClick={onEdit} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Details</button>
      <button onClick={onDelete} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Cancel Booking</button>
    </div>
  </details>
);

// --- Main Component ---
const BookingsTable = () => {
  const { data, isLoading, isError } = useGetBookings();
  const { mutate: updateBookingStatus } = useUpdateBooking();

  const handleStatusChange = (id, status) => {
    updateBookingStatus(
      { id, formData: { bookingStatus: status } },
      {
        onSuccess: () => toast.success(`Status updated to ${status}`),
        onError: () => toast.error("Failed to update status"),
      }
    );
  };

  if (isLoading) return <div className="text-center p-4">Loading bookings...</div>;
  if (isError) return <div className="text-center p-4 text-red-500">Failed to load bookings.</div>;

  return (
    <div className="bg-gray-50 rounded-2xl shadow-md p-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Bookings</h2>
          <p className="text-sm text-gray-500">Manage all customer bookings and reservations</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">Filter</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Activity & Customer</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Assigned Guide</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Tour Date</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Payment</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.data?.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={booking.activity?.images?.[0] || "https://via.placeholder.com/100"}
                      alt={booking.activity?.name || "Activity"}
                      className="w-24 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-semibold text-base text-gray-900">{booking.activity?.name || "Activity"}</div>
                      <div className="text-sm text-gray-500">Booked by {booking.customerName}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600">{booking.guideName}</td>
                <td className="p-4 text-sm text-gray-600">
                  {new Date(booking.tourDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="p-4"><PaymentStatusBadge status={booking.paymentStatus} /></td>
                <td className="p-4">
                  <select
                    value={booking.bookingStatus}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                    className="text-sm border rounded px-2 py-1 bg-white"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                  <ActionMenu
                    onEdit={() => toast.info(`Viewing booking ${booking._id}`)}
                    onDelete={() => toast.warn(`Canceling booking ${booking._id}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsTable;
