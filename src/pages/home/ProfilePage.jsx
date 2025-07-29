// src/pages/Profile/ProfilePage.jsx
import React, { useState } from 'react';

import { useGetProfile } from '../../hooks/useProfileHook';
import EditProfileModal from '../../components/user/components/EditProfileModal';

const ProfilePage = () => {
  const { profile, isLoading, error } = useGetProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;
  console.log(profile.profileImage)
const avatarBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api","/")
console.log(`${avatarBaseUrl}${profile.profileImage}`);
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">User Profile</h2>
        <div>
          <strong>Name:</strong> {profile.fName} {profile.lName}
        </div>
        <div>
          <strong>Email:</strong> {profile.email}
        </div>
        <div>
          <strong>Phone:</strong> {profile.phoneNo}
        </div>
        <img
            src={`${avatarBaseUrl}${profile.profileImage}`}
            alt="Profile"
            className="w-24 h-24 rounded-full mt-4"
          />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Edit Profile
        </button>
      </div>

      {isModalOpen && (
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={profile}
        />
      )}
    </div>
  );
};

export default ProfilePage;
