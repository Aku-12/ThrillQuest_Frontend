import instance from "./api";

export const fetchUsers = (params = {}) => {
  return instance.get('/admin/getCustomers', { params });
};