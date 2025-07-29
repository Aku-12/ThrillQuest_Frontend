import { changeUserPassword, fetchUserProfile, updateUserProfile } from "../api/profileApi";

export const ProfileService = {
  getUserProfile: async () => {
    const response = await fetchUserProfile();
    console.log(response.data.data)
    return response.data.data;
  },

  updateProfile: async (userId, formData) => {
    const response = await updateUserProfile(userId, formData);
    return response.data;
  },

  changePassword: async (payload) => {
    const response = await changeUserPassword(payload);
    return response.data;
  },
};
