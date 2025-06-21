import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteActivityService } from "../services/activityService";
import { toast } from "react-toastify";

const useDeleteActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteActivityService,
    onSuccess: (data) => {
      toast.success(data.message || "Activity deleted successfully");
      queryClient.invalidateQueries(["activities"]);
    },
    onError: (error) => {
      toast.error(error.message || "Error deleting activity");
    },
  });
};

export default useDeleteActivity;
