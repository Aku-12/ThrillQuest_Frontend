import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getActivitiesService,
  createActivityService,
  updateActivityService,
  deleteActivityService,
} from "../services/activityService";
import { toast } from "react-toastify";

export const useGetActivities = (params) => {
  return useQuery({
    queryKey: ["activities", params],
    queryFn: () => getActivitiesService(params),
    onError: (err) => {
      toast.error(err.message || "Failed to fetch activities");
    },
    keepPreviousData: true,
  });
};

export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createActivityService,
    onSuccess: (data) => {
      toast.success(data.message || "Activity created successfully");
      queryClient.invalidateQueries(["activities"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create activity");
    },
  });
};

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => updateActivityService(id, formData),
    onSuccess: (data) => {
      toast.success(data.message || "Activity updated successfully");
      queryClient.invalidateQueries(["activities"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update activity");
    },
  });
};

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteActivityService,
    onSuccess: (data) => {
      toast.success(data.message || "Activity deleted successfully");
      queryClient.invalidateQueries(["activities"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete activity");
    },
  });
};
