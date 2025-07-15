import React, { useContext } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { AuthContext } from "../../../auth/AuthProvider";

// Searchbar component
const Searchbar = () => (
  <div className="relative flex-1 max-w-xl">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      <Search size={22} />
    </div>
    <input
      type="text"
      placeholder="Search activities, bookings, guides..."
      className="w-full rounded-full bg-gray-100 py-3 pl-14 pr-4 text-lg font-medium
                 text-gray-800 placeholder-gray-500 outline-none
                 transition-all duration-200
                 focus:bg-white focus:ring-2 focus:ring-green-500"
    />
  </div>
);

// UserActions component
const UserActions = ({ user }) => (
  <div className="flex items-center gap-2">
    <button
      className="rounded-full p-3 text-gray-500 transition-colors
                 hover:bg-gray-100 hover:text-gray-800"
      aria-label="Notifications"
    >
      <Bell size={22} />
    </button>

    <div className="h-10 w-px bg-gray-200" aria-hidden="true"></div>

    <button
      className="flex items-center gap-3 rounded-full p-1.5 pl-4 transition-colors
                 hover:bg-gray-100"
    >
      <div className="text-right">
        <div className="text-lg font-semibold text-gray-800">{user?.fName || "Admin"}</div>
        <div className="text-base text-gray-500">{user?.email || "admin@example.com"}</div>
      </div>
      <img
        src="https://api.dicebear.com/8.x/lorelei/svg?seed=admin"
        alt="User Avatar"
        className="h-12 w-12 rounded-full"
      />
      <ChevronDown size={20} className="text-gray-500" />
    </button>
  </div>
);

// Topbar component
const Topbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      <Searchbar />
      <UserActions user={user} />
    </header>
  );
};

export default Topbar;
