import React from "react";
import { MapPin, Clock, Flame, Star, Users, Quote } from "lucide-react";
import { useActivityReviews } from "../../../hooks/useReviewHook";

const ActivityCard = ({ activity, onBook }) => {
  if (!activity) return null;
  const { data: reviewData } = useActivityReviews(activity._id);
  const reviews = reviewData?.data || [];

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-out flex flex-col group overflow-hidden border border-slate-200 hover:border-teal-300 hover:-translate-y-1 transform">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={
            activity.images?.[0]
              ? `http://localhost:5050${activity.images[0]}`
              : "https://placehold.co/600x400/c084fc/ffffff?text=ThrillQuest"
          }
          alt={activity.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x400/c084fc/ffffff?text=Image+Error";
          }}
        />
        <div className="absolute top-3 right-3 z-20">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wide shadow-sm ${
              activity.status === "Active"
                ? "bg-teal-100 text-teal-800 border border-teal-200"
                : "bg-amber-100 text-amber-800 border border-amber-200"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                activity.status === "Active" ? "bg-teal-500" : "bg-amber-500"
              }`}
            ></span>
            {activity.status}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 z-10">
          <h3 className="text-xl font-bold text-white mb-1 leading-tight">
            {activity.name}
          </h3>
          <p className="text-sm text-slate-200 flex items-center font-medium">
            <MapPin className="h-4 w-4 mr-1.5 text-slate-300" />
            {activity.location}
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="flex items-center bg-slate-50 rounded-lg p-3 border border-slate-100 hover:bg-teal-50 hover:border-teal-200 transition-all duration-200">
              <Clock className="h-4 w-4 mr-2 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                {activity.duration}
              </span>
            </div>
            <div className="flex items-center bg-slate-50 rounded-lg p-3 border border-slate-100 hover:bg-purple-50 hover:border-purple-200 transition-all duration-200">
              <Flame className="h-4 w-4 mr-2 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                {activity.difficulty}
              </span>
            </div>
            <div className="flex items-center bg-slate-50 rounded-lg p-3 border border-slate-100 hover:bg-teal-50 hover:border-teal-200 transition-all duration-200">
              <Star className="h-4 w-4 mr-2 text-amber-500 fill-amber-500" />
              <span className="text-sm font-medium text-slate-700">
                {activity.rating} / 5.0
              </span>
            </div>
            <div className="flex items-center bg-slate-50 rounded-lg p-3 border border-slate-100 hover:bg-purple-50 hover:border-purple-200 transition-all duration-200">
              <Users className="h-4 w-4 mr-2 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                {activity.bookings} Booked
              </span>
            </div>
          </div>

          {/* Price Section */}
          <div className="border-t border-slate-200 pt-4 mb-5">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-slate-700">Price</span>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">
                  ${activity.price}
                </p>
                <p className="text-xs text-slate-500 font-medium">per person</p>
              </div>
            </div>
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={() => onBook(activity._id)}
          className="w-full bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-300/50 active:scale-98 text-sm tracking-wide"
        >
          Book This Adventure
        </button>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="mt-6 border-t border-slate-200 pt-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-semibold text-slate-800">Customer Reviews</h4>
              <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                {reviews.length} review{reviews.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {reviews.map((r) => (
                <div key={r._id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {r.userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-slate-900">{r.userName}</p>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
                          <span className="text-sm font-medium text-slate-600">{r.rating}</span>
                        </div>
                      </div>
                      <div className="relative">
                        <Quote className="h-3 w-3 text-slate-400 absolute -top-1 -left-1" />
                        <p className="text-sm text-slate-600 pl-3 leading-relaxed">{r.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;