import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Thrill Quest Logo" className="w-8 h-8" />
          <h1 className="text-xl font-semibold text-gray-900">Thrill Quest</h1>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-black font-semibold" : "hover:text-black"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive ? "text-black font-semibold" : "hover:text-black"
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-black font-semibold" : "hover:text-black"
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-black font-semibold" : "hover:text-black"
            }
          >
            About Us
          </NavLink>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <NavLink to="/login">
            <button className="px-4 py-2 text-sm bg-green-100 hover:bg-green-200 text-green-800 font-medium rounded-lg">
              Log in
            </button>
          </NavLink>
          <NavLink to="/register">
            <button className="px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg">
              Sign up
            </button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
