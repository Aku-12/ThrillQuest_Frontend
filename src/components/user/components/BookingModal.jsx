import React, { useState, useEffect, useContext } from "react";
import { useGetGuides } from "../../../hooks/useGuidesHook";
import { AuthContext } from "../../../auth/AuthProvider";
import {
  CalendarDays,
  NotebookPen,
  UserRoundSearch,
  X,
} from "lucide-react";

export default function BookingModal({
  isOpen,
  onClose,
  onSubmit,
  activities = [],
  isSubmitting,
}) {
  const { data: guidesData, isLoading: guidesLoading } = useGetGuides();
  const guides = guidesData?.data || [];
  console.log("guides", guides)
  const { user } = useContext(AuthContext);
  const fullName = [user?.fName, user?.lName].filter(Boolean).join(" ");

  const [formData, setFormData] = useState({
    activityId: "",
    guideName: "",
    customerName: fullName,
    tourDate: "",
  });

  useEffect(() => {
    if (activities[0]?._id) {
      setFormData((prev) => ({
        ...prev,
        activityId: activities[0]._id,
      }));
    }
  }, [activities]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-slate-200/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 via-white to-purple-50/30" />

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <NotebookPen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Create Booking
            </h2>
            <p className="text-slate-600">
              Complete your adventure booking details
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Activity */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                <NotebookPen className="w-4 h-4 text-teal-500" />
                Activity
              </label>
              <input
                type="text"
                value={activities[0]?.name || ""}
                readOnly
                className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-slate-700 cursor-not-allowed font-medium"
              />
              <input type="hidden" name="activity" value={formData.activityId} />
            </div>

            {/* Guide Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                <UserRoundSearch className="w-4 h-4 text-teal-500" />
                Select Guide
              </label>
              {guidesLoading ? (
                <p className="text-slate-500 text-sm">Loading guides...</p>
              ) : (
                <select
                  name="guideName"
                  value={formData.guideName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800"
                >
                  <option value="">-- Select Guide --</option>
                  {guides.map((guide) => (
                    <option key={guide._id} value={guide.name}>
                      {guide.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Tour Date */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-teal-500" />
                Tour Date
              </label>
              <input
                type="date"
                name="tourDate"
                required
                value={formData.tourDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-6 py-3 text-white rounded-xl font-semibold transition ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700"
                }`}
              >
                {isSubmitting ? "Booking..." : "Complete Booking"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
