import instance from "./api";

export const fetchUserProfile = () => {
  return instance.get('/profile/fetch');
};

export const updateUserProfile = (userId, formData) => {
  return instance.put(`/profile/update/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const changeUserPassword = (data) => {
  return instance.put('/change-password', data);
};
