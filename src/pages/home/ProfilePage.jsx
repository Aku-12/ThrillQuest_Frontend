import React, { useContext } from "react";
import { Pencil, Mail, Phone, User, Calendar, TrendingUp, Activity } from "lucide-react";
import { AuthContext } from "../../auth/AuthProvider"; // adjust path as needed

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  // Dummy stats — replace with real data if needed
  const stats = {
    totalBookings: 14,
    totalSpent: 7400,
    lastActivity: "2025-07-15",
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-purple-600 px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-6">
                <img
                  src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${user?.fname || "user"}`}
                  alt="Profile"
                  className="w-20 h-20 rounded-full ring-4 ring-white/30 bg-white/10"
                />
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {user?.fname} {user?.lname}
                  </h1>
                  <p className="text-teal-100 text-sm">Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl hover:bg-white/30 transition-all duration-200 text-sm font-medium border border-white/20">
                <Pencil className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="px-8 py-6 bg-white border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="text-slate-900 font-medium">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="text-slate-900 font-medium">{user?.phoneNo || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Bookings</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalBookings}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-teal-600">
              <TrendingUp className="w-4 h-4" />
              <span>+2 this month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Spent</p>
                <p className="text-2xl font-bold text-slate-900">${stats.totalSpent.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-purple-600">
              <TrendingUp className="w-4 h-4" />
              <span>+$1,200 this month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Last Activity</p>
                <p className="text-2xl font-bold text-slate-900">
                  {new Date(stats.lastActivity).toLocaleDateString(undefined, { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-teal-600">
              <Activity className="w-4 h-4" />
              <span>Active user</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mt-8">
          <div className="px-8 py-6 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
          </div>
          <div className="px-8 py-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Calendar className="w-4 h-4 text-teal-600" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 font-medium">New booking completed</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Booked <span className="font-medium text-purple-600">Zip Flyer</span> tour on July 12, 2025
                  </p>
                  <p className="text-xs text-slate-400 mt-1">2 days ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 font-medium">Profile updated</p>
                  <p className="text-sm text-slate-500 mt-1">Updated contact information</p>
                  <p className="text-xs text-slate-400 mt-1">1 week ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-teal-600" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 font-medium">Account created</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Joined Thrill Quest on <span className="font-medium text-teal-600">{new Date(user?.createdAt).toLocaleDateString()}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {Math.floor((new Date() - new Date(user?.createdAt)) / (1000 * 60 * 60 * 24))} days ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;