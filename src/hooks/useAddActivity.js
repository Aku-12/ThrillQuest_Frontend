import { useMutation } from "@tanstack/react-query";
import { createActivityService } from "../services/activityService";
import { toast } from "react-toastify";

const useAddActivity = () => {
  return useMutation({
    mutationFn: createActivityService,
    onSuccess: (data) => {
      toast.success(data?.message || "Activity added successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to add activity");
    },
  });
};

export default useAddActivity;
