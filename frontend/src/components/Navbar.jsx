import React, { useState } from "react";
import { GraduationCap, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useLogoutUserMutation } from "../auth/authApi.js";
import { useEffect } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  // const { user } = useSelector((store) => store.auth);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

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

          {/* Auth Buttons or User Profile */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <User className="h-5 w-5 text-[#001a33]" />
                  </div>
                  <span className="text-white">{user.name || "User"}</span>
                </div>
                <button
                  onClick={logoutHandler}
                  className="flex items-center space-x-2 px-4 py-2 text-white hover:text-[#242a4b] hover:bg-white rounded-md transition-colors duration-300"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
               <Link to="/login">
  <button className="px-4 py-2 text-white hover:text-[#242a4b] hover:bg-white rounded-md transition-colors duration-300 flex items-center gap-2">
     SignIn <ArrowRight className="text-white" size={18} />
  </button>
</Link>
              
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
