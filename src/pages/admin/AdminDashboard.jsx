import React from "react";
import BookingTrendsChart from "../../components/admin/dashboard/BookingTrendsChart";
import PopularActivitiesChart from "../../components/admin/dashboard/PopularActivitiesChart";   
import SummaryCards from "../../components/admin/dashboard/SummaryCards";

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Adventure Dashboard</h1>
      <p className="text-gray-600">
        Monitor your adventure booking platform's performance and manage exciting outdoor experiences.
      </p>

      <SummaryCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BookingTrendsChart />
        <PopularActivitiesChart />
      </div>
    </div>
  );
};
export default AdminDashboard;