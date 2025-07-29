import React, { useState } from "react";
import { useUpdateProfile } from "../../../hooks/useProfileHook";

const EditProfileModal = ({ isOpen, onClose, user }) => {
  const { updateProfile, isUpdating } = useUpdateProfile();

  const [formData, setFormData] = useState({
    fName: user?.fName || "",
    lName: user?.lName || "",
    phoneNo: user?.phoneNo || "",
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fName", formData.fName);
    data.append("lName", formData.lName);
    data.append("phoneNo", formData.phoneNo);
    if (profileImage) {
      data.append("profileImage", profileImage);
    }

    updateProfile({ userId: user._id, formData: data });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl max-w-lg mx-auto p-6 shadow-xl w-full relative">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">First Name</label>
            <input
              type="text"
              name="fName"
              value={formData.fName}
              onChange={handleChange}
              className="mt-1 block w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Last Name</label>
            <input
              type="text"
              name="lName"
              value={formData.lName}
              onChange={handleChange}
              className="mt-1 block w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Phone Number</label>
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="mt-1 block w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm"
            />
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              {isUpdating ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
