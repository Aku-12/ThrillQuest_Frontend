import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useGetActivities, useDeleteActivity } from "../../hooks/useActivityHook";
import { toast } from "react-toastify";
import AddActivityModal from "./AddActivityModal"; // Modal for add/edit

const ActivityTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableActivity, setEditableActivity] = useState(null);

  const { data, isLoading, error, refetch } = useGetActivities({ search: searchTerm });
  const deleteMutation = useDeleteActivity();

  const maxBookings = data?.data?.length
    ? Math.max(...data.data.map((item) => item.bookings || 0))
    : 1;

  const handleDelete = (id, activity) => {
    if (window.confirm(`Are you sure you want to delete "${activity}"?`)) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Activity deleted successfully");
          refetch();
        },
        onError: () => {
          toast.error("Failed to delete activity");
        },
      });
    }
  };

  if (isLoading) return <div className="p-4">Loading activities...</div>;
  if (error) return <div className="p-4 text-red-600">Failed to load activities.</div>;

  return (
    <div className="p-4 font-sans">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Activities</h2>
          <p className="text-sm text-gray-500">Manage all adventure activities and experiences</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search activities..."
              className="w-full sm:w-64 bg-white border border-gray-300 text-sm text-gray-800 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={() => {
              setEditableActivity(null); // Add new
              setIsModalOpen(true);
            }}
            className="px-4 py-2 text-sm text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 font-semibold flex items-center gap-2"
          >
            Add Activity
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="w-full min-w-[1000px] text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Image</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Activity</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Price</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Duration</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Difficulty</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Bookings</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Rating</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.data?.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="p-4">
                  <img
          src={
            item.images?.[0]
              ? `http://localhost:5050${item.images[0]}`
              : "https://placehold.co/600x400/c084fc/ffffff?text=ThrillQuest"
          }
          alt={item.name}
          className="w-12 h-12 object-cover transition-transform duration-700 group-hover:scale-105 rounded-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x400/c084fc/ffffff?text=Image+Error";
          }}
        />
                </td>
                <td className="p-4">
                  <div className="font-semibold text-base text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.location}</div>
                </td>
                <td className="p-4">
                  <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-md text-sm font-bold">
                    ${item.price}
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600 flex items-center gap-2 pt-6">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item.duration}
                </td>
                <td className="p-4 text-sm text-gray-800">{item.difficulty}</td>
                <td className="p-4 text-sm text-gray-800">{item.bookings}</td>
                <td className="p-4 text-sm text-gray-800">{item.rating ?? "N/A"}</td>
                <td className="p-4 text-sm text-gray-800">{item.status}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setEditableActivity(item);
                        setIsModalOpen(true);
                      }}
                      title="Edit"
                    >
                      <Pencil className="w-5 h-5 text-emerald-600 hover:text-emerald-800 transition" />
                    </button>
                    <button onClick={() => handleDelete(item._id, item.name)} title="Delete">
                      <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600 transition" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      <AddActivityModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditableActivity(null);
        }}
        onSuccess={() => {
          refetch();
          setEditableActivity(null);
        }}
        initialData={editableActivity}
      />
    </div>
  );
};

export default ActivityTable;
