import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

// --- Data for the Chart ---
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

// --- Helper Function to Calculate Average ---
const averageBookings =
  data.reduce((total, item) => total + item.bookings, 0) / data.length;

// --- Custom Tooltip Component for a Better UI ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-sm text-blue-500">{`Bookings: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// --- Main Chart Component ---
const BookingTrendsChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* --- Chart Header --- */}
      <h2 className="text-lg font-bold text-gray-800 mb-1">Booking Trends</h2>
      <p className="text-sm text-gray-500 mb-6">
        Monthly booking data for the last year.
      </p>

      {/* --- Responsive Chart Container --- */}
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {/* --- Gradient Definition for the Area Fill --- */}
          <defs>
            <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* --- Chart Grid, Axes, and Tooltip --- */}
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e0e0e0"
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#60a5fa",
              strokeWidth: 1,
              strokeDasharray: "3 3",
            }}
          />

          {/* --- Data Area with Gradient and Line --- */}
          <Area
            type="monotone"
            dataKey="bookings"
            stroke="#60a5fa"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorBookings)"
            activeDot={{ r: 8, stroke: "#fff", strokeWidth: 2 }}
          />

          {/* --- Average Bookings Reference Line --- */}
          <ReferenceLine
            y={averageBookings}
            label={{
              value: `Avg: ${Math.round(averageBookings)}`,
              position: "insideTopRight",
              fill: "#6b7280",
              fontSize: 12,
            }}
            stroke="#9ca3af"
            strokeDasharray="4 4"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingTrendsChart;