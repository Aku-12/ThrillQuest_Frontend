import { useQuery } from "@tanstack/react-query";
import { fetchUsersService } from "../services/userManagementService";

export const useFetchUsers = (params) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsersService(params),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};