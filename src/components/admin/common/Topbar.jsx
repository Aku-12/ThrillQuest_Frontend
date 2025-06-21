import React from "react";

const Topbar = () => {
  return (
    <div className="bg-white p-4 border-b flex items-center justify-between">
      <input
        type="text"
        placeholder="Search activities, bookings, guides..."
        className="border rounded-lg px-4 py-2 w-1/2"
      />
      <div className="flex items-center space-x-4">
        <span className="text-sm text-right">
          <div className="font-medium">Adventure Admin</div>
          <div className="text-xs text-gray-500">admin@thrillquest.com</div>
        </span>
        <div className="w-10 h-10 rounded-full bg-gray-300" />
      </div>
    </div>
  );
};

export default Topbar;
