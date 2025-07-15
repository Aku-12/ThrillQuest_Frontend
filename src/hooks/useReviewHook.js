import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createReviewService,
  getActivityReviewsService,
  getAllReviewsService,
  updateReviewStatusService,
  deleteReviewService,
} from "../services/ReviewsService";
import { toast } from "react-toastify";

// 📝 User: Create a review
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReviewService,
    onSuccess: () => {
      toast.success("Review submitted!");
      queryClient.invalidateQueries(["activity-reviews"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to submit review");
    },
  });
};

// 🌟 User: Get reviews for an activity
export const useActivityReviews = (activityId) => {
  return useQuery({
    queryKey: ["activity-reviews", activityId],
    queryFn: () => getActivityReviewsService(activityId),
    enabled: !!activityId,
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to load reviews");
    },
  });
};

// 🧑‍💼 Admin: Get all reviews
export const useAdminReviews = () => {
  return useQuery({
    queryKey: ["admin-reviews"],
    queryFn: getAllReviewsService,
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to fetch reviews");
    },
  });
};

// 🛠️ Admin: Update review status
export const useUpdateReviewStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReviewStatusService,
    onSuccess: () => {
      toast.success("Review status updated");
      queryClient.invalidateQueries(["admin-reviews"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update review");
    },
  });
};

// ❌ Admin: Delete review
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReviewService,
    onSuccess: () => {
      toast.success("Review deleted");
      queryClient.invalidateQueries(["admin-reviews"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to delete review");
    },
  });
};
