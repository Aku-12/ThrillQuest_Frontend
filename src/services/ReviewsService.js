import {
  createReview,
  getActivityReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
} from "../api/reviewApi";

// 🔹 Create review service
export const createReviewService = async (formData) => {
  const response = await createReview(formData);
  return response.data;
};

// 🔹 Get all reviews for a specific activity
export const getActivityReviewsService = async (activityId) => {
  const response = await getActivityReviews(activityId);
  return response.data;
};

// 🔹 Admin: Get all reviews
export const getAllReviewsService = async () => {
  const response = await getAllReviews();
  return response.data;
};

// 🔹 Admin: Update review status
export const updateReviewStatusService = async ({ id, status }) => {
  const response = await updateReviewStatus({ id, status });
  return response.data;
};

// 🔹 Admin: Delete a review
export const deleteReviewService = async (id) => {
  const response = await deleteReview(id);
  return response.data;
};
