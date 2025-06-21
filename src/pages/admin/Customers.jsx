import { useState, useMemo, useEffect } from "react";
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useFetchUsers } from "../../hooks/userManagementHook";

const columns = [
  { key: "fName", label: "First Name" },
  { key: "lName", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "phoneNo", label: "Phone Number" },
  { key: "role", label: "Role" },
];

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("fName");
  const [sortOrder, setSortOrder] = useState("none");

  // 👇 Use the hook correctly
  const {
    data: userData,
    isLoading,
    error,
  } = useFetchUsers();

  useEffect(() => {
  if (userData) {
    setUsers(Array.isArray(userData.customers) ? userData.customers : []);
  }
}, [userData]);


  const filteredAndSortedUsers = useMemo(() => {
    const search = searchTerm.toLowerCase();

    let filtered = users.filter(
      (user) =>
        user.fName?.toLowerCase().includes(search) ||
        user.lName?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search) ||
        user.phoneNo?.includes(search) ||
        user.role?.toLowerCase().includes(search)
    );

    if (sortOrder !== "none") {
      filtered.sort((a, b) => {
        const aVal = a[sortField]?.toString().toLowerCase() || "";  
        const bVal = b[sortField]?.toString().toLowerCase() || "";  

        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [users, searchTerm, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) =>
        prev === "none" ? "asc" : prev === "asc" ? "desc" : "none"
      );
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };
  
  const getSortIcon = (field) => {
    if (sortField !== field || sortOrder === "none") {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4 text-blue-500" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4 text-blue-500" />
    );
  };
  
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md">
        <div className="border-b px-6 py-5">
          <h2 className="text-3xl font-semibold text-gray-800">User Management</h2>
        </div>

        <div className="px-6 py-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or role"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <select
              value={`${sortField}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                setSortField(field);
                setSortOrder(order);
              }}
              className="w-full sm:w-[220px] px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {columns.map((col) => (
                <option key={`${col.key}-asc`} value={`${col.key}-asc`}>
                  {col.label} A-Z
                </option>
              ))}
              {columns.map((col) => (
                <option key={`${col.key}-desc`} value={`${col.key}-desc`}>
                  {col.label} Z-A
                </option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <div className="text-center py-10 text-gray-500 text-sm">Loading users...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500 text-sm">{error.message}</div>
          ) : (
            <div className="overflow-x-auto border rounded-xl">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map(({ key, label }) => (
                      <th
                        key={key}
                        className="px-6 py-3 text-left font-semibold text-gray-700"
                      >
                        <button
                          onClick={() => handleSort(key)}
                          className="flex items-center group hover:text-blue-600 transition"
                        >
                          {label}
                          {getSortIcon(key)}
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedUsers.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} className="text-center px-6 py-10 text-gray-400">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    filteredAndSortedUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 transition border-t border-gray-100"
                      >
                        <td className="px-6 py-3 font-medium">{user.fName}</td>
                        <td className="px-6 py-3 font-medium">{user.lName}</td>
                        <td className="px-6 py-3">{user.email}</td>
                        <td className="px-6 py-3">{user.phoneNo}</td>
                        <td className="px-6 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              user.role === "admin"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 text-sm text-gray-500 gap-2">
            <div>
              Showing <span className="font-semibold">{filteredAndSortedUsers.length}</span> of{" "}
              <span className="font-semibold">{users.length}</span> users
            </div>
            {searchTerm && (
              <div>
                Filtered by: <span className="italic text-blue-600">"{searchTerm}"</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
