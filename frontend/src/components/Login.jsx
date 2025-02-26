import React, { useEffect, useState } from "react";
import { Mail, Lock, User, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useRegisterUserMutation, useLoginUserMutation } from "../auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [signupInput, setSignupInput] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerisLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginisLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleRegistration = async (e, type) => {
    e.preventDefault();
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    const response = await action(inputData);
    console.log(response); // Debug API response
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
      setSignupInput({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    }
    if (registerError) {
      toast.error(registerError.data.message || "Signup Failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/user/dashboard");
    }
    if (loginError) {
      toast.error(loginError.data.message || "login Failed");
    }
  }, [
    loginisLoading,
    registerisLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-50">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#001a33] mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to continue to your account</p>
        </div>

        {/* Tabs */}
        <div className="flex mb-8 bg-indigo-50 rounded-lg p-1">
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === "login"
                ? "bg-white text-[#001a33] shadow-sm"
                : "text-gray-600 hover:text-[#001a33]"
            }`}
            onClick={() => setActiveTab("login")}
          >
            <LogIn className="h-4 w-4" />
            Login
          </button>
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === "signup"
                ? "bg-white text-[#001a33] shadow-sm"
                : "text-gray-600 hover:text-[#001a33]"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            <UserPlus className="h-4 w-4" />
            Sign Up
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
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-900 group-focus-within:text-[#001a33]" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001a33] focus:border-transparent bg-white/60 backdrop-blur-sm transition-all"
                  placeholder="Enter your email or username"
                  value={loginInput.email}
                  onChange={(e) =>
                    setLoginInput({
                      ...loginInput,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-900 group-focus-within:text-[#001a33]" />
                </div>
                <input
                  type="password"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001a33] focus:border-transparent bg-white/60 backdrop-blur-sm transition-all"
                  placeholder="Enter your password"
                  value={loginInput.password}
                  onChange={(e) =>
                    setLoginInput({ ...loginInput, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#001a33] shadow-sm focus:border-[#001a33] focus:ring focus:ring-[#001a33] focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-[#001a33] hover:text-[#001a33] hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Link to="/user/dashboard">
              <button
                type="submit"
                onClick={() => handleRegistration(event, "login")}
                className="w-full bg-[#001a33] text-white py-3 px-4 rounded-lg hover:bg-[#001a33] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-medium"
              >
                Sign in to your account
              </button>
            </Link>
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
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#001a33]" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001a33] focus:border-transparent bg-white/60 backdrop-blur-sm transition-all"
                  placeholder="Enter your email"
                  value={signupInput.email}
                  onChange={(e) =>
                    setSignupInput({ ...signupInput, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#001a33]" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001a33] focus:border-transparent bg-white/60 backdrop-blur-sm transition-all"
                  placeholder="Choose a username"
                  value={signupInput.username}
                  onChange={(e) =>
                    setSignupInput({ ...signupInput, username: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#001a33]" />
                </div>
                <input
                  type="password"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001a33] focus:border-transparent bg-white/60 backdrop-blur-sm transition-all"
                  placeholder="Create a password"
                  value={signupInput.password}
                  onChange={(e) =>
                    setSignupInput({ ...signupInput, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#001a33]" />
                </div>
                <input
                  type="password"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001a33] focus:border-transparent bg-white/60 backdrop-blur-sm transition-all"
                  placeholder="Confirm your password"
                  value={signupInput.confirmPassword}
                  onChange={(e) =>
                    setSignupInput({
                      ...signupInput,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <button
                // type="submit"
                onClick={() => handleRegistration(event, "signup")}
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
