import { fetchUsers } from "../api/userFetchApi";

export const fetchUsersService = async (options = {}) => {
  try {
    const response = await fetchUsers(options);
    console.log("fetch user sevice", response)
    return response.data;
  } catch (err) {
    console.error("fetchUsersService error:");
    console.error("Error object:", err);
    console.error("Error response:", err.response);
    throw err.response?.data || { message: 'Failed to fetch users.' };
  }
};
