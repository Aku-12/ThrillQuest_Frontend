import instance from "./api";

// Get All Bookings (with optional query params)
export const getBookingsApi = async (params = {}) => {
  const response = await instance.get("admin/bookings", { params });
  return response;
};

export const getMyBookings = async () => {
  const response = await instance.get("admin/bookings/my-bookings");
  return response;
}
// Get Single Booking by ID
export const getBookingByIdApi = async (id) => {
  const response = await instance.get(`admin/bookings/${id}`);
  return response;
};

// Create Booking
export const createBookingApi = async (formData) => {
  const response = await instance.post("admin/bookings/create", formData);
  return response;
};

// Update Booking
export const updateBookingApi = async (id, formData) => {
  const response = await instance.put(`admin/bookings/${id}`, formData);
  return response;
};

// Delete Booking
export const deleteBookingApi = async (id) => {
  const response = await instance.delete(`admin/bookings/${id}`);
  return response;
};


