import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/common/Sidebar";
import Topbar from "../../components/admin/common/Topbar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
