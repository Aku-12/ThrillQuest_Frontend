import React from "react";
import LoginForm from "../../auth/LoginForm";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>
        <LoginForm onClose={onClose} />
      </div>
    </div>
  );
};

export default LoginModal;
