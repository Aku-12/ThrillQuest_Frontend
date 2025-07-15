import React, { useContext } from "react";
import {
  LayoutDashboard,
  MapPin,
  CalendarDays,
  Users,
  UserCheck,
  Star,
  BarChart2,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthProvider"; // Update this path if needed

// --- CONFIGURATION ---

const navLinks = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/activities", label: "Activities", icon: MapPin },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { to: "/admin/guides", label: "Guides", icon: UserCheck },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
];

const secondaryLinks = [
  { to: "/admin/analytics", label: "Analytics", icon: BarChart2 },
];

// --- COMPONENTS ---

const SidebarHeader = () => (
  <div className="px-6 pt-6 pb-6">
    <h1 className="text-3xl font-bold text-green-600 tracking-tight">Thrill Quest</h1>
    <p className="text-base text-gray-500">Admin Panel</p>
  </div>
);

const NavItem = ({ to, label, icon: Icon }) => (
  <NavLink
    to={to}
    end={to === "/admin"}
    className={({ isActive }) =>
      `flex items-center gap-4 rounded-lg px-4 py-2.5 text-lg transition-all duration-200 ${
        isActive
          ? "bg-green-100 text-green-700 font-semibold"
          : "text-gray-600 hover:bg-green-50 hover:text-green-600"
      }`
    }
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </NavLink>
);

const NavLabel = ({ children }) => (
  <p className="px-4 pt-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
    {children}
  </p>
);

// --- Main Sidebar Component ---
const Sidebar = () => {
  const { logout } = useContext(AuthContext); // adjust based on your actual logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate("/"); // Redirect to login
  };

  return (
    <aside className="flex h-screen w-80 flex-col bg-white shadow-sm border-r border-gray-100">
      <SidebarHeader />

      <div className="px-4">
        <div className="border-t border-gray-200"></div>
      </div>

      <nav className="flex-grow px-4">
        <NavLabel>Menu</NavLabel>
        <div className="space-y-1">
          {navLinks.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </div>

        <NavLabel>General</NavLabel>
        <div className="space-y-1">
          {secondaryLinks.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </div>
      </nav>

      {/* --- Logout Button at the Bottom --- */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 text-lg text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2.5 rounded-lg transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
