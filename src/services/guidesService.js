import {
  getGuidesApi,
  getGuideByIdApi,
  createGuideApi,
  updateGuideApi,
  deleteGuideApi,
} from "../api/guidesApi";

// GET all guides with optional query parameters
export const getGuidesService = async (params) => {
  const response = await getGuidesApi(params);
  return response.data;
};

// GET a single guide by ID
export const getGuideByIdService = async (id) => {
  const response = await getGuideByIdApi(id);
  return response.data;
};

// CREATE a new guide
export const createGuideService = async (guide) => {
  const response = await createGuideApi(guide);
  return response.data;
};

// UPDATE a guide by ID
export const updateGuideService = async (id, guide) => {
  const response = await updateGuideApi(id, guide);
  return response.data;
};

// DELETE a guide by ID
export const deleteGuideService = async (id) => {
  const response = await deleteGuideApi(id);
  return response.data;
};
