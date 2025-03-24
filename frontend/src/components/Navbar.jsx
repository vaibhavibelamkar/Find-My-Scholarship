import React, { useEffect, useState } from "react";
import { GraduationCap, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    console.log(cookies);
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) return value;
    }
    return null;
  };

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ name: decoded.name });
      } catch (error) {
        console.error("Invalid token", error);
        setUser(null);
      }
    }
  }, []);

  const logoutHandler = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-[#001a33] shadow-lg fixed top-0 left-0 w-full z-50">   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Website Name */}
          <div className="flex items-center space-x-3 ml-[-120px]">
            <GraduationCap className="h-8 w-8 text-white" />
            <span className="text-white font-bold text-xl">
              FindMyScholarship
            </span>
          </div>

          {/* Auth Buttons or User Profile */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={logoutHandler}
                  className="flex items-center space-x-2 px-4 py-2 text-white hover:text-[#242a4b] hover:bg-white rounded-md transition-colors duration-300"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 font-semibold text-white hover:text-[#242a4b] hover:bg-white rounded-md transition-colors duration-300 flex items-center gap-2">
                  SignIn <ArrowRight className="text-white" size={20} />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
