import React, { useState } from 'react';

import EditProfileModal from '../../components/user/components/EditProfileModal';
import { User, Mail, Phone, Edit3, Camera, MapPin, Award, Calendar } from 'lucide-react';
import { useGetProfile } from '../../hooks/useProfileHook';

const ProfilePage = () => {
  const { profile, isLoading, error } = useGetProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-teal-900">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-teal-400 border-r-purple-400"></div>
        <div className="absolute inset-0 animate-pulse rounded-full h-16 w-16 border-4 border-transparent border-b-teal-300 border-l-purple-300 opacity-60"></div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-teal-900">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
        <div className="text-red-400 text-center">
          <div className="text-2xl font-bold mb-3">Unable to Load Profile</div>
          <div className="text-slate-300">Please check your connection and try again</div>
        </div>
      </div>
    </div>
  );

  console.log(profile.profileImage);
  const avatarBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "/");
  console.log(`${avatarBaseUrl}${profile.profileImage}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-teal-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-90 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
              Adventure Profile
            </h1>
            <p className="text-slate-300 text-lg mb-6">Your Thrill Quest Journey Begins Here</p>
            <div className="w-32 h-1 bg-gradient-to-r from-teal-400 via-purple-400 to-indigo-400 mx-auto rounded-full shadow-lg shadow-teal-500/25"></div>
          </div>

          {/* Main Profile Container */}
          <div className="bg-white/5 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-700">
            {/* Hero Cover Section */}
            <div className="relative h-48 md:h-56 bg-gradient-to-r from-teal-600 via-purple-600 to-indigo-600 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20"></div>
              
              {/* Animated geometric patterns */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 animate-float"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 animate-float delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/5 rounded-full -translate-x-8 -translate-y-8 animate-float delay-500"></div>
              </div>

              {/* Profile Avatar */}
              <div className="absolute -bottom-20 left-8 md:left-12">
                <div className="relative group">
                  <div className="w-64 h-64 rounded-2xl border-4 border-white/20 shadow-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm transform hover:scale-105 transition-all duration-500">
                    <img
                      src={`${avatarBaseUrl}${profile.profileImage}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Camera Icon */}
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-teal-500 to-purple-500 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-110 border-2 border-white/20">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  
                  {/* Online Status Indicator */}
                  <div className="absolute top-3 right-3 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-md animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="pt-24 md:pt-28 p-8 md:p-12">
              <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                {/* User Information Section */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Name and Title */}
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 animate-slide-up">
                      {profile.fName} {profile.lName}
                    </h2>
                    <div className="flex items-center gap-2 text-teal-300 mb-4">
                      <Award className="w-5 h-5" />
                      <span className="text-lg">Thrill Seeker</span>
                    </div>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      Adventure enthusiast ready to conquer new heights and embrace the thrill of extraordinary experiences.
                    </p>
                  </div>

                  {/* Information Cards Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Personal Info Card */}
                    <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 backdrop-blur-sm rounded-2xl p-6 border border-teal-500/20 hover:border-teal-400/30 transition-all duration-500 hover:transform hover:scale-105 group">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg group-hover:shadow-teal-500/25 transition-all duration-300">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-teal-300 font-semibold mb-1">Full Name</p>
                          <p className="text-white text-lg font-medium">{profile.fName} {profile.lName}</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info Card */}
                    <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/30 transition-all duration-500 hover:transform hover:scale-105 group">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-purple-300 font-semibold mb-1">Email Address</p>
                          <p className="text-white text-lg font-medium break-all">{profile.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Phone Info Card */}
                    <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 backdrop-blur-sm rounded-2xl p-6 border border-indigo-500/20 hover:border-indigo-400/30 transition-all duration-500 hover:transform hover:scale-105 group">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-indigo-500/25 transition-all duration-300">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-indigo-300 font-semibold mb-1">Phone Number</p>
                          <p className="text-white text-lg font-medium">{profile.phoneNo}</p>
                        </div>
                      </div>
                    </div>

                    {/* Membership Status Card */}
                    <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/30 transition-all duration-500 hover:transform hover:scale-105 group">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-emerald-300 font-semibold mb-1">Member Since</p>
                          <p className="text-white text-lg font-medium">Adventure Pioneer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Panel */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-2xl p-6 border border-white/10 sticky top-8">
                    <h3 className="text-xl font-bold text-white mb-6">Profile Actions</h3>
                    
                    {/* Edit Profile Button */}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="group relative w-full p-4 bg-gradient-to-r from-teal-600 via-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative flex items-center justify-center gap-3">
                        <Edit3 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-lg">Edit Profile</span>
                      </div>
                    </button>

                    {/* Quick Stats */}
                    <div className="mt-8 space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                        <span className="text-slate-300">Adventures Booked</span>
                        <span className="text-white font-bold">0</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                        <span className="text-slate-300">Thrill Level</span>
                        <span className="text-teal-400 font-bold">Beginner</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                        <span className="text-slate-300">Status</span>
                        <span className="text-green-400 font-bold flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={profile}
        />
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;