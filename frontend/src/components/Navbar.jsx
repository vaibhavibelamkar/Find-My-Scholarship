import React from "react";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#001a33] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Website Name */}
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-white" />
            <span className="text-white font-bold text-xl">
              FindMyScholarship
            </span>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <button className="px-4 py-2 text-white hover:text-[#242a4b] hover:bg-white rounded-md transition-colors duration-300">
                Login
              </button>
            </Link>
            <button className="px-4 py-2 bg-white text-[#001a33] rounded-md hover:bg-opacity-90 transition-colors duration-300 font-medium">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
