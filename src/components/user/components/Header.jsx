import React, { useState, useEffect, useContext } from "react";
import { Menu, X, Zap, Mountain, Users, Mail, Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { AuthContext } from "../../../auth/AuthProvider";

export default function Header({ onLoginClick, onRegisterClick }) {
  const { isAuthenticated } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Explore", path: "/explore", icon: Mountain },
    { name: "Contact", path: "/contact", icon: Mail },
    { name: "About Us", path: "/aboutus", icon: Users },
  ];

  const renderNavItem = (item, index) => {
    const Icon = item.icon;
    return (
      <NavLink
        to={item.path}
        key={item.name}
        className={({ isActive }) =>
          `group relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
            isActive
              ? "text-white bg-gradient-to-r from-teal-600 to-purple-600 shadow-lg shadow-teal-500/20"
              : "text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200"
          }`
        }
      >
        <Icon className="w-4 h-4" />
        <span>{item.name}</span>
      </NavLink>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200/60"
            : "bg-white/90 backdrop-blur-md shadow-sm"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-50/30 via-slate-50/20 to-purple-50/30 opacity-40" />

        <div className="container mx-auto px-6 py-4 relative z-10">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <NavLink
              to="/"
              className={`flex items-center space-x-3 transition-all duration-700 ${
                isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="relative group">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:shadow-lg group-hover:shadow-teal-500/30 transition-shadow">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-teal-700 to-purple-800 bg-clip-text text-transparent">
                  Thrill Quest
                </h1>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map(renderNavItem)}
            </nav>

            {/* Auth Buttons */}
            <div
              className={`hidden md:flex items-center space-x-3 transition-all duration-700 ${
                isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
            >
              {isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <>
                  <button
                    onClick={onLoginClick}
                    className="px-5 py-2.5 rounded-lg font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all duration-200"
                  >
                    Log in
                  </button>
                  <button
                    onClick={onRegisterClick}
                    className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-200"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-600" />
              ) : (
                <Menu className="w-5 h-5 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-20 right-4 left-4 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-slate-200/60 overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "translate-y-0 scale-100" : "-translate-y-10 scale-95"
          }`}
        >
          <div className="p-6">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.name}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `w-full flex items-center space-x-3 p-4 rounded-lg text-left font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-teal-600 to-purple-600 text-white shadow-lg shadow-teal-500/25"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>

            {/* Mobile Auth */}
            <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
              {isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <>
                  <button
                    onClick={() => {
                      onLoginClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full p-4 text-center font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-200"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      onRegisterClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full p-4 text-center font-medium text-white bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 rounded-lg shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-200"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}