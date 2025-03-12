import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, LogIn, UserPlus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [signupInput, setSignupInput] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [signupErrors, setSignupErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });
  const validateSignupForm = () => {
    const errors = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };

    if (!signupInput.email) errors.email = "Email is required";
    if (!signupInput.username) errors.username = "Username is required";
    if (!signupInput.password) errors.password = "Password is required";
    else if (signupInput.password.length < 6)
      errors.password = "Password must be at least 6 characters";

    if (!signupInput.confirmPassword)
      errors.confirmPassword = "Confirm password is required";
    else if (signupInput.password !== signupInput.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    setSignupErrors(errors);

    return Object.values(errors).every((error) => error === "");
  };
  const validateLoginForm = () => {
    const errors = {
      email: "",
      password: "",
    };

    if (!loginInput.email) errors.email = "Email is required";
    if (!loginInput.password) errors.password = "Password is required";

    setLoginErrors(errors);

    return Object.values(errors).every((error) => error === "");
  };
  const handleRegistration = async (type) => {
    try {
      if (type === "signup" && !validateSignupForm()) return;
      if (type === "login" && !validateLoginForm()) return;
      const API_BASE_URL = "http://localhost:8080/api";
      const endpoint = type === "login" ? "/auth/login" : "/auth/signup";
      const payload = type === "login" ? loginInput : signupInput;
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload);
      if (response.data) {
        toast.success(response.data.message);
        if (type === "login") navigate("/user/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    setSignupErrors((prevErrors) => ({
      ...prevErrors,
      email: signupInput.email ? "" : prevErrors.email,
      username: signupInput.username ? "" : prevErrors.username,
      password: signupInput.password ? "" : prevErrors.password,
      confirmPassword: signupInput.confirmPassword
        ? ""
        : prevErrors.confirmPassword,
    }));
    setLoginErrors((prevErrors) => ({
      ...prevErrors,
      email: loginInput.email ? "" : prevErrors.email,
      password: loginInput.password ? "" : prevErrors.password,
    }));
  }, [signupInput, loginInput]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-50">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#001a33] mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to continue to your account</p>
        </div>

        <div className="flex mb-8 bg-indigo-50 rounded-lg p-1">
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-md ${
              activeTab === "login"
                ? "bg-white text-[#001a33] shadow-sm"
                : "text-gray-600 hover:text-[#001a33]"
            }`}
            onClick={() => setActiveTab("login")}
          >
            <LogIn className="h-4 w-4" /> Login
          </button>
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-md ${
              activeTab === "signup"
                ? "bg-white text-[#001a33] shadow-sm"
                : "text-gray-600 hover:text-[#001a33]"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            <UserPlus className="h-4 w-4" /> Sign Up
          </button>
        </div>
        {/* Login Form */}
        {activeTab === "login" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email or Username
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-900" />
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#001a33]"
                  placeholder="Enter your email or username"
                  value={loginInput.email}
                  onChange={(e) =>
                    setLoginInput({ ...loginInput, email: e.target.value })
                  }
                  required
                />
              </div>
              {loginErrors.email && (
                <p className="text-red-500 text-sm mt-1">{loginErrors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-900" />
                <input
                  type="password"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#001a33]"
                  placeholder="Enter your password"
                  value={loginInput.password}
                  onChange={(e) =>
                    setLoginInput({ ...loginInput, password: e.target.value })
                  }
                  required
                />
              </div>
              {loginErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {loginErrors.password}
                </p>
              )}
            </div>
            <button
              onClick={() => handleRegistration("login")}
              className="w-full bg-[#001a33] text-white py-3 rounded-lg hover:bg-[#002b4d]"
            >
              Sign in to your account
            </button>
          </div>
        )}
        {/* Sign Up Form */}
        {activeTab === "signup" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#002b4d]" />
                <input
                  type="email"
                  className={`block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001a33] bg-white/60 `}
                  placeholder="Enter your email"
                  value={signupInput.email}
                  onChange={(e) =>
                    setSignupInput({ ...signupInput, email: e.target.value })
                  }
                  required
                />
              </div>
              {signupErrors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {signupErrors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#002b4d] group-focus-within:text-[#001a33]" />
                </div>
                <input
                  type="text"
                  className={`block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001a33] `}
                  placeholder="Choose a username"
                  value={signupInput.username}
                  onChange={(e) =>
                    setSignupInput({ ...signupInput, username: e.target.value })
                  }
                  required
                />
              </div>
              {signupErrors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {signupErrors.username}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                  <Lock className="h-5 w-5 text-[#002b4d] group-focus-within:text-[#001a33]" />
                </div>
                <input
                  type="password"
                  className={`block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001a33] `}
                  placeholder="Create a password"
                  value={signupInput.password}
                  onChange={(e) =>
                    setSignupInput({ ...signupInput, password: e.target.value })
                  }
                  required
                />
              </div>
              {signupErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {signupErrors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#002b4d] group-focus-within:text-[#001a33]" />
                </div>
                <input
                  type="password"
                  className={`block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001a33] `}
                  placeholder="Confirm your password"
                  value={signupInput.confirmPassword}
                  onChange={(e) =>
                    setSignupInput({
                      ...signupInput,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
              {signupErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {signupErrors.confirmPassword}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleRegistration("signup")}
                className="w-full bg-[#001a33] text-white py-3 px-4 rounded-lg hover:bg-[#001a33] focus:outline-none focus:ring-2 focus:ring-[#001a33] focus:ring-offset-2 transition-all duration-200 font-medium"
              >
                Create your account
              </button>
              <p className="text-sm text-center text-gray-600">
                By signing up, you agree to our{" "}
                <a href="#" className="text-[#001a33] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#001a33] hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
