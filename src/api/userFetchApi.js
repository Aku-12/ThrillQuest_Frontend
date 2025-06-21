import instance from "./Api";

export const fetchUsers = (params = {}) => {
  return instance.get('/admin/getCustomers', { params });
};