import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getGuidesService,
  createGuideService,
  updateGuideService,
  deleteGuideService,
} from "../services/guidesService";
import { toast } from "react-toastify";

// GET all guides with optional params
export const useGetGuides = (params) => {
  return useQuery({
    queryKey: ["guides", params],
    queryFn: () => getGuidesService(params),
    onError: (err) => {
      toast.error(err.message || "Failed to fetch guides");
    },
    keepPreviousData: true,
  });
};

// CREATE guide
export const useCreateGuide = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGuideService,
    onSuccess: (data) => {
      toast.success(data.message || "Guide created successfully");
      queryClient.invalidateQueries(["guides"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create guide");
    },
  });
};

// UPDATE guide
export const useUpdateGuide = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => updateGuideService(id, formData),
    onSuccess: (data) => {
      toast.success(data.message || "Guide updated successfully");
      queryClient.invalidateQueries(["guides"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update guide");
    },
  });
};

// DELETE guide
export const useDeleteGuide = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGuideService,
    onSuccess: (data) => {
      toast.success(data.message || "Guide deleted successfully");
      queryClient.invalidateQueries(["guides"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete guide");
    },
  });
};
