import { useQuery } from "@tanstack/react-query";
import { fetchActivitiesService } from "../services/activityService";

export const useFetchActivities = () => {
  return useQuery({
    queryKey: ["activities"],
    queryFn: fetchActivitiesService,
    staleTime: 1000 * 60 * 5,
  });
};
