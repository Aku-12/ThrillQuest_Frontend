import React from "react";
import {
  LayoutDashboard,
  MapPin,
  CalendarDays,
  Users,
  UserCheck,
  Star,
  BarChart2,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin", label: "AdminDashboard", icon: LayoutDashboard },
  { to: "/admin/activities", label: "Activities", icon: MapPin },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { to: "/admin/guides", label: "Guides", icon: UserCheck },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart2 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const Sidebar = () => (
  <aside className="w-64 bg-white border-r p-6">
    <div className="text-2xl font-bold text-blue-700 mb-8">Thrill Quest</div>
    <nav className="space-y-2">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded-lg space-x-3 font-medium ${
              isActive
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
