import {
  getActivitiesApi,
  getActivityByIdApi,
  createActivityApi,
  updateActivityApi,
  deleteActivityApi,
} from "../api/activityApi";

export const getActivitiesService = async (params) => {
  const response = await getActivitiesApi(params);
  return response.data;
};

export const getActivityByIdService = async (id) => {
  const response = await getActivityByIdApi(id);
  return response.data;
};

export const createActivityService = async (formData) => {
  const response = await createActivityApi(formData);
  return response.data;
};

export const updateActivityService = async (id, formData) => {
  const response = await updateActivityApi(id, formData);
  return response.data;
};

export const deleteActivityService = async (id) => {
  const response = await deleteActivityApi(id);
  return response.data;
};
