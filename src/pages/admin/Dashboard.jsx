import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  MapPin,
  CalendarDays,
  DollarSign,
} from "lucide-react";
import BookingTrendsChart from "../../components/admin/dashboard/BookingTrendsChart";
import PopularActivitiesChart from "../../components/admin/dashboard/PopularActivitiesChart";
import StatCard from "../../components/admin/common/StatCard";

const AdminDashboard = () => {
  return (
    <div className="p-2 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Adventure Dashboard</h1>
      <p className="text-gray-600">
        Monitor your adventure booking platform's performance and manage
        exciting outdoor experiences.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value={1240}
          icon={CalendarDays}
          trend={{ value: 12.5, direction: "up" }}
          color="blue"
        />
        <StatCard
          title="Registered Users"
          value={5678}
          icon={Users}
          trend={{ value: 3.2, direction: "up" }}
          color="green"
        />
        <StatCard
          title="Active Activities"
          value={36}
          icon={MapPin}
          trend={{ value: 1.8, direction: "down" }}
          color="red"
        />
        <StatCard
          title="Total Revenue"
          value={1200}
          icon={DollarSign}
          trend={{ value: 3.2, direction: "up" }}
          color="green"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BookingTrendsChart />
        <PopularActivitiesChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
