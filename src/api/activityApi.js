import instance from "./api";

export const getActivitiesApi = async (params = {}) => {
  const response = await instance.get("admin/activities", { params });
  return response;
};

export const getActivityByIdApi = async (id) => {
  const response = await instance.get(`admin/activities/${id}`);
  return response;
};

export const createActivityApi = async (formData) => {
  const response = await instance.post("admin/activities", formData, {
    headers: {
      "Content-Type": undefined, // let browser auto-set it
    },
  });
  return response;
};

export const updateActivityApi = async (id, formData) => {
  const response = await instance.put(`admin/activities/${id}`, formData, {
    headers: {
      "Content-Type":undefined,
    }
  });
  return response;
};

export const deleteActivityApi = async (id) => {
  const response = await instance.delete(`admin/activities/${id}`);
  return response;
};
