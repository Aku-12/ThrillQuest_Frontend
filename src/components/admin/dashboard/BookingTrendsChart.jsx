import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", bookings: 220 },
  { month: "Feb", bookings: 280 },
  { month: "Mar", bookings: 410 },
  { month: "Apr", bookings: 480 },
  { month: "May", bookings: 600 },
  { month: "Jun", bookings: 700 },
  { month: "Jul", bookings: 670 },
  { month: "Aug", bookings: 630 },
  { month: "Sep", bookings: 500 },
  { month: "Oct", bookings: 380 },
  { month: "Nov", bookings: 340 },
  { month: "Dec", bookings: 400 },
];

const BookingTrendsChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="font-semibold text-gray-800 mb-4">Booking Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="bookings" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingTrendsChart;