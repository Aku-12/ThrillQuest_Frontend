import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { activity: "Rafting", count: 320 },
  { activity: "Hiking", count: 300 },
  { activity: "Paragliding", count: 260 },
  { activity: "Rock Climbing", count: 180 },
  { activity: "Kayaking", count: 140 },
  { activity: "Zip Lining", count: 90 },
];

const PopularActivitiesChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="font-semibold text-gray-800 mb-4">Popular Activities</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="activity" type="category" />
          <Tooltip />
          <Bar dataKey="count" fill="#0f172a" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopularActivitiesChart;