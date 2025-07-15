import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";

const CustomerLayout = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      <Header
        onLoginClick={() => setLoginOpen(true)}
        onRegisterClick={() => setRegisterOpen(true)}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />

      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </div>
  );
};

export default CustomerLayout;
