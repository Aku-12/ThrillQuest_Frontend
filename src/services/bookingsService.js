import {
  getBookingsApi,
  getBookingByIdApi,
  createBookingApi,
  updateBookingApi,
  deleteBookingApi,
  getMyBookings,
} from "../api/bookingsApi";

// Get all bookings with optional filters (search, paymentStatus, bookingStatus, pagination)
export const getBookingsService = async (params) => {
  const response = await getBookingsApi(params);
  return response.data;
};

export const getMyBookingsService = async () => {
  const response = await getMyBookings();
  console.log("getMyBooking Service", response)
  return response.data;
};

// Get a single booking by ID
export const getBookingByIdService = async (id) => {
  const response = await getBookingByIdApi(id);
  return response.data;
};

// Create a new booking
export const createBookingService = async (formData) => {
  const response = await createBookingApi(formData);
  console.log("response", response)
  console.log("formdata", formData)
  return response.data;
};

// Update an existing booking by ID
export const updateBookingService = async (id, formData) => {
  const response = await updateBookingApi(id, formData);
  return response.data; 
};

// Delete a booking by ID
export const deleteBookingService = async (id) => {
  const response = await deleteBookingApi(id);
  return response.data;
};
