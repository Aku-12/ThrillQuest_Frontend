import instance from "./api";

// ✅ Create a review
export const createReview = async (formData) => {
  return await instance.post("/reviews/create", formData);  // corrected path
};

// ✅ Get reviews for a specific activity
export const getActivityReviews = async (activityId) => {
  return await instance.get(`/reviews/${activityId}`);
};

// ✅ Admin: Get all reviews
export const getAllReviews = async () => {
  return await instance.get("/reviews");
};

// ✅ Admin: Update review status (approve/reject)
export const updateReviewStatus = async ({ id, status }) => {
  return await instance.patch(`/reviews/${id}`, { status });
};

// ✅ Admin: Delete a review
export const deleteReview = async (id) => {
  return await instance.delete(`/reviews/${id}`);
};
