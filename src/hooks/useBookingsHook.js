import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBookingsService,
  getBookingByIdService,
  createBookingService,
  updateBookingService,
  deleteBookingService,
  getMyBookingsService,
} from "../services/bookingsService";
import { toast } from "react-toastify";

// 📦 Get all bookings (with filters, search, pagination)
export const useGetBookings = (params) => {
  return useQuery({
    queryKey: ["bookings", params],
    queryFn: () => getBookingsService(params),
    onError: (err) => {
      toast.error(err.message || "Failed to fetch bookings");
    },
    keepPreviousData: true,
  });
};

export const useGetMyBookings = (options={}) => {
  return useQuery({
    queryKey: ["my-bookings"],
    queryFn: getMyBookingsService,
    onError: (err) => { 
      toast.error(err.message || "Failed to fetch bookings");
    },
    ...options
  });
};

// 📦 Get a single booking by ID
export const useGetBookingById = (id) => {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBookingByIdService(id),
    enabled: !!id,
    onError: (err) => {
      toast.error(err.message || "Failed to fetch booking");
    },
  });
};

// ✍️ Create a new booking
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBookingService,
    onSuccess: (data) => {
      toast.success(data.message || "Booking created successfully");
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create booking");
    },
  });
};

// 🔁 Update a booking
export const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => updateBookingService(id, formData),
    onSuccess: (data) => {
      toast.success(data.message || "Booking updated successfully");
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update booking");
    },
  });
};

// ❌ Delete a booking
export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBookingService,
    onSuccess: (data) => {
      toast.success(data.message || "Booking deleted successfully");
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete booking");
    },
  });
};
