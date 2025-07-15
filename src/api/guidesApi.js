import instance from "./api";

// GET all guides (with optional query parameters for search, status, page, limit)
export const getGuidesApi = async (params) => {
  const res = await instance.get("/admin/guides", { params });
  return res;
};

// GET single guide by ID
export const getGuideByIdApi = async (id) => {
  const res = await instance.get(`/admin/guides/${id}`);
  return res;
};

// CREATE a new guide
export const createGuideApi = async (guide) => {
  const res = await instance.post("/admin/guides", guide);
  return res;
};

// UPDATE guide by ID
export const updateGuideApi = async (id, guide) => {
  const res = await instance.put(`/admin/guides/${id}`, guide);
  return res;
};

// DELETE guide by ID
export const deleteGuideApi = async (id) => {
  const res = await instance.delete(`/admin/guides/${id}`);
  return res;
};
