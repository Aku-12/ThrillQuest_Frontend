// components/ReviewModal.jsx
import React, { useState } from "react";
import { useCreateReview } from "../../../hooks/useReviewHook";

const ReviewModal = ({ activityId, onClose }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { mutate, isLoading } = useCreateReview();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { activityId, rating, comment },
      {
        onSuccess: () => {
          onClose();
        }
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-[90%] max-w-md">
        <h3 className="text-xl font-semibold text-gray-800">Leave a Review</h3>
        <div>
          <label className="block text-sm font-medium">Rating</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full mt-1 p-2 border rounded-md">
            {[5,4,3,2,1].map(star => <option key={star} value={star}>{star} Star</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Comment</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="4" className="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500">Cancel</button>
          <button type="submit" disabled={isLoading} className="px-4 py-2 bg-teal-600 text-white rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewModal;
