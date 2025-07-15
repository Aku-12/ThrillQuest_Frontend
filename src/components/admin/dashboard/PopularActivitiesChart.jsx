import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  CartesianGrid,
} from "recharts";

const data = [
  { activity: "Rafting", count: 320 },
  { activity: "Hiking", count: 300 },
  { activity: "Paragliding", count: 260 },
  { activity: "Rock Climbing", count: 180 },
  { activity: "Kayaking", count: 140 },
  { activity: "Zip Lining", count: 90 },
];

// Custom Tooltip for styled hover information
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-sm" style={{ color: payload[0].fill }}>
          {`Participants: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

const PopularActivitiesChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-1">
        Most Popular Activities
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Based on total participants last quarter
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          layout="vertical"
          // ✅ Increased left and right margins to prevent text cutoff
          margin={{ top: 10, right: 50, left: 30, bottom: 5 }}
        >
          {/* Define the gradient for the bars */}
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="30%" stopColor="#2dd4bf" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.9} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e0e0e0" />

          <XAxis type="number" hide />
          <YAxis
            dataKey="activity"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#374151", fontWeight: 500 }}
            width={110} // This width plus the new left margin prevents cropping
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(239, 246, 255, 0.5)' }}
          />
          
          <Bar dataKey="count" fill="url(#colorUv)" barSize={25} radius={[0, 10, 10, 0]}>
            <LabelList
              dataKey="count"
              position="right"
              offset={10}
              style={{ fill: "#1f2937", fontWeight: "bold", fontSize: "14px" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopularActivitiesChart;