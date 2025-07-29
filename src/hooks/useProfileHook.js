// src/hooks/useProfileHook.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileService } from '../services/profileService';

export const useGetProfile = () => {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: ProfileService.getUserProfile,
  });

  return { profile, isLoading, error };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: ({ userId, formData }) =>
      ProfileService.updateProfile(userId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile']);
    },
  });

  return { updateProfile: mutate, isUpdating: isLoading, updateError: error };
};

export const useChangePassword = () => {
  const { mutate, isLoading, error } = useMutation({
    mutationFn: ProfileService.changePassword,
  });

  return { changePassword: mutate, isChanging: isLoading, changeError: error };
};
