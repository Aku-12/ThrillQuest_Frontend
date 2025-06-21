import { createActivity, deleteActivity, getActivity } from "../api/activitiesApi";

// ✅ Create a new activity
export const createActivityService = async (data) => {
  console.log(data)
  const response = await createActivity(data) 
  return response.data;
};

// ✅ Get all activities
export const fetchActivitiesService = async () => {
  const response = await getActivity()
  return response.data;
};

// // ✅ Update an activity
// export const updateActivityService = async (id, data) => {
//   const response = await axios.put(`${BASE_URL}/api/admin/activities/${id}`, data, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return response.data;
// };

// ✅ Delete an activity
export const deleteActivityService = async (id) => {
  const response = await deleteActivity(id);
  return response.data;
};
