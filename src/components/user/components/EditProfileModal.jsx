import React, { useState } from "react";
import { useUpdateProfile } from "../../../hooks/useProfileHook";
import { User, Phone, Camera, X, Save, Loader2, Upload, Edit3 } from "lucide-react";

const EditProfileModal = ({ isOpen, onClose, user }) => {
  const { updateProfile, isUpdating } = useUpdateProfile();

  const [formData, setFormData] = useState({
    fName: user?.fName || "",
    lName: user?.lName || "",
    phoneNo: user?.phoneNo || "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Modal Container */}
      <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-3xl max-w-2xl w-full shadow-2xl border border-white/10 animate-slide-up overflow-hidden">
        
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-teal-600 via-purple-600 to-indigo-600 p-6">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Edit Adventure Profile</h2>
                <p className="text-white/80 text-sm">Update your thrill-seeking credentials</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 group backdrop-blur-sm"
            >
              <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Profile Image Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-teal-500/30 shadow-lg bg-gradient-to-br from-teal-500/10 to-purple-500/10 backdrop-blur-sm">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-teal-400" />
                    </div>
                  )}
                </div>
                
                <label className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-teal-500 to-purple-500 rounded-xl cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-teal-500/25">
                  <Upload className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-slate-400 text-sm mt-3">Click to upload new adventure photo</p>
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-teal-400" />
                  First Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="fName"
                    value={formData.fName}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/20 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your first name"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Last Name */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-400" />
                  Last Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="lName"
                    value={formData.lName}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your last name"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400" />
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your phone number"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm group"
              >
                <span className="group-hover:scale-105 transition-transform duration-200 inline-block">
                  Cancel Adventure
                </span>
              </button>
              
              <button
                type="submit"
                disabled={isUpdating}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 via-purple-600 to-indigo-600 hover:from-teal-500 hover:via-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-2">
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Updating Profile...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span>Save Adventure Profile</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default EditProfileModal;