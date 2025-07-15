import React from "react";
import { Search, Filter, Pencil, MoreVertical } from "lucide-react";
import { useFetchUsers } from "../../hooks/userManagementHook";

// Badge based on status
const CustomerStatusBadge = ({ status }) => {
  const styles = {
    VIP: "bg-purple-100 text-purple-700",
    Active: "bg-sky-100 text-sky-700",
    New: "bg-teal-100 text-teal-700",
    Inactive: "bg-gray-100 text-gray-600",
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status || "Unknown"}
    </span>
  );
};

const ActionMenu = ({ onAction }) => (
  <details className="absolute top-4 right-4">
    <summary className="list-none cursor-pointer p-2 rounded-full hover:bg-gray-100">
      <MoreVertical className="w-5 h-5 text-gray-500" />
    </summary>
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      <button onClick={() => onAction("view")} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Profile</button>
      <button onClick={() => onAction("message")} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Send Message</button>
      <button onClick={() => onAction("deactivate")} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Deactivate</button>
    </div>
  </details>
);

const CustomerCard = ({ customer }) => {
  const fullName = `${customer.fName} ${customer.lName}`;
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col text-center items-center relative transition-all hover:shadow-md hover:-translate-y-1">
      <ActionMenu onAction={(action) => alert(`${action} ${fullName}`)} />

      <h3 className="text-lg font-bold text-gray-900">{fullName}</h3>
      <p className="text-sm text-gray-500 mb-4">{customer.email}</p>
      <CustomerStatusBadge status={customer.status} />

      <div className="w-full border-t border-gray-200 my-6"></div>

      <div className="w-full flex justify-around text-center">
        <div>
          <p className="text-sm text-gray-500">Total Spent</p>
          <p className="text-xl font-semibold text-gray-800">
            ${customer.totalSpent?.toLocaleString() || 0}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Bookings</p>
          <p className="text-xl font-semibold text-gray-800">
            {customer.totalBookings || 0}
          </p>
        </div>
      </div>

      <div className="w-full border-t border-gray-200 my-6"></div>

      <p className="text-xs text-gray-400">
        Last activity:{" "}
        {customer.lastActivity
          ? new Date(customer.lastActivity).toLocaleDateString()
          : "N/A"}
      </p>
    </div>
  );
};

const CustomersProfile = () => {
  const { data, isLoading } = useFetchUsers();
  const customers = data?.customers || [];

  return (
    <div className="bg-gray-50 rounded-2xl shadow-md p-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Customers</h2>
          <p className="text-sm text-gray-500">
            Manage customer profiles and view their activity
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              className="bg-white border border-gray-300 text-sm text-gray-800 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="px-4 py-2 text-sm text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 font-semibold flex items-center gap-2">
            <Pencil className="w-4 h-4" /> Edit
          </button>
        </div>
      </div>

      {/* Customer Grid */}
      {isLoading ? (
        <p className="text-center py-10">Loading customers...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {customers.map((customer) => (
            <CustomerCard key={customer._id} customer={customer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomersProfile;
