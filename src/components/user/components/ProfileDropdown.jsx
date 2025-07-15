import React, { useContext, useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, LogOut, User } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthProvider";

const ProfileDropdown = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition-all"
      >
        <img
          src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${user?.fname}`}
          alt="Profile"
          className="w-9 h-9 rounded-full"
        />
        <span className="text-sm font-medium text-gray-700">{user?.fname}</span>
        <ChevronDown size={18} className="text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-xl border border-gray-100 z-50">
          <button
            onClick={() => {
              navigate("/profile");
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <User className="w-4 h-4 mr-2" />
            My Profile
          </button>
          <button
            onClick={() => {
              navigate("/mybookings");
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Calendar className="w-4 h-4 mr-2" />
            My Bookings
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
