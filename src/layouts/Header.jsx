import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-amber-50 p-4">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Thrill Quest Logo" className="w-10 h-10" />
          <div className="text-lg font-bold">Thrill Quest</div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-row space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-indigo-600 font-semibold" : "text-gray-800"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-red-500 font-semibold" : "text-gray-800"
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "text-gray-800"
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "text-gray-800"
            }
          >
            About Us
          </NavLink>
        </div>

        {/* Auth Buttons */}
        <div className="flex space-x-8 px-5">
          <NavLink to="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-xl">
              Login
            </button>
          </NavLink>
          <NavLink to="/register">
            <button className="bg-green-500 text-white px-4 py-2 rounded-xl">
              Signup
            </button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
