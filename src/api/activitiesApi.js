import instance from './Api';

// ✅ Get all activities
export const getActivity = async(params = {}) => {
  const response = await instance.get("/admin/activities", { params });
  return response
};

// ✅ Create a new activity
export const createActivity = async(data) => {
  console.log(data)
  // 'data' should be FormData if you're uploading an image
  const response = await instance.post("/admin/activities", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response
};

// // ✅ Update an activity
// export const updateActivity = (id, data) => {
//   return instance.put(`/admin/activities/${id}`, data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   }); // PUT
// };

// ✅ Delete an activity
export const deleteActivity = async (id) => {
  const response = await instance.delete(`/admin/activities/${id}`);
  return response;
};