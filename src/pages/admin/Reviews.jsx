import React from "react";
import { Star, MoreVertical } from "lucide-react";
import {
  useAdminReviews,
  useUpdateReviewStatus,
  useDeleteReview,
} from "../../hooks/useReviewHook";

// ⭐ Star rating component
const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={20}
        className={`${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);


// ⚙️ Action menu
const ActionMenu = ({ reviewId }) => {
  const { mutate: updateStatus } = useUpdateReviewStatus();
  const { mutate: deleteReview } = useDeleteReview();

  const handleAction = (action) => {
    if (action === "delete") {
      deleteReview(reviewId);
    } else {
      updateStatus({ id: reviewId, status: action.charAt(0).toUpperCase() + action.slice(1) });
    }
  };

  return (
    <details className="relative">
      <summary className="list-none cursor-pointer p-2 rounded-full hover:bg-gray-100">
        <MoreVertical className="w-5 h-5 text-gray-500" />
      </summary>
      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
        <button
          onClick={() => handleAction("delete")}
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Delete
        </button>
      </div>
    </details>
  );
};

// 📋 Main Reviews Table Component
const ReviewsTable = () => {
  const { data, isLoading, isError } = useAdminReviews();
  const reviews = data?.data || [];

  if (isLoading)
    return <div className="text-center mt-10">Loading reviews...</div>;
  if (isError)
    return (
      <div className="text-center text-red-600 mt-10">
        Failed to load reviews.
      </div>
    );

  return (
    <div className="bg-gray-50 rounded-2xl shadow-md p-6 font-sans">
      {/* --- Header Section --- */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Reviews Management</h2>
          <p className="text-sm text-gray-500">
            Approve, reject, and manage all customer reviews
          </p>
        </div>
      </div>

      {/* --- Table --- */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase">
                Reviewer & Activity
              </th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase w-2/5">
                Rating & Comment
              </th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase">
                Date
              </th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr key={review._id} className="hover:bg-gray-50">
                <td className="p-4 align-top">
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://randomuser.me/api/portraits/lego/${Math.floor(
                        Math.random() * 10
                      )}.jpg`}
                      alt={review.userName}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-base text-gray-900">
                        {review.userName}
                      </div>
                      <div className="text-sm text-gray-500">
                        on{" "}
                        <span className="font-medium text-gray-600">
                          {review.activity?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 align-top">
                  <StarRating rating={review.rating} />
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {review.comment}
                  </p>
                </td>
                <td className="p-4 align-top text-sm text-gray-600">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 align-top text-right">
                  <ActionMenu
                    reviewId={review._id}
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

export default ReviewsTable;
