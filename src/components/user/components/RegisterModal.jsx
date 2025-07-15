import React from "react";
import RegisterForm from "../../../components/auth/RegisterForm";

const RegisterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <RegisterForm onClose={onClose}/>
      </div>
    </div>
  );
};

export default RegisterModal;
