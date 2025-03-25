import React, { useEffect, useState } from "react";
import { Mail, Lock, User, LogIn, UserPlus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailError, setResetEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateSignupForm = () => {
    const errors = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };


 

    if (!signupInput.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signupInput.email))
      errors.email = "Please enter a valid email address";

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

      setIsLoading(true);

      const API_BASE_URL = "http://localhost:8080/api";
      const endpoint = type === "login" ? "/auth/login" : "/auth/signup";
      const payload = type === "login" ? loginInput : signupInput;

      const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data?.success) {
        if (type === "signup") {
          toast.success("Account created successfully!");
          setActiveTab("login");
        } else {
          toast.success(response.data.message || "Login successful!");
          navigate("/user/dashboard");
        }
      } else {
        toast.error(
          response.data.message || "Invalid credentials. Please try again."
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message ||
        (error.code === "ERR_NETWORK"
          ? "Network error. Please check your connection."
          : "An error occurred. Please try again.");
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      setResetEmailError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setResetEmailError("Please enter a valid email address");
      return;
    }
    setResetEmailError("");

    try {
      setIsLoading(true);
      const API_BASE_URL = "http://localhost:8080/api";
      const response = await axios.post(
        `${API_BASE_URL}/auth/reset-password`,
        {
          email: resetEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.success) {
        toast.success("Reset link has been sent to your email");
        setShowForgotPassword(false);
        setResetEmail("");
      } else {
        toast.error(response.data.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      const errorMessage =
        error.response?.data?.message ||
        (error.code === "ERR_NETWORK"
          ? "Network error. Please check your connection."
          : "Failed to send reset link");
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
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

  const buttonClass = `w-full py-3 rounded-lg transition-all duration-200 font-medium ${
    isLoading ? "opacity-70 cursor-not-allowed" : ""
  }`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-50">
      <div className="text-center mb-8 flex items-center justify-center relative">
  <button
    onClick={() => navigate("/")}
    className="absolute left-0 text-[#001a33] hover:text-[#002b4d] p-1"
  >
    <ArrowLeft className="w-6 h-6" />
  </button>
  <h1 className="text-3xl font-bold text-[#001a33] ml-8">Welcome Back</h1>
</div>
<p className="text-gray-600 text-center">
  Sign in to continue to your account
</p>


        <div className="flex mb-8 bg-indigo-50 rounded-lg p-1">
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-md ${
              activeTab === "login"
                ? "bg-white text-[#001a33] shadow-sm"
                : "text-gray-600 hover:text-[#001a33]"
            }`}
            onClick={() => {
              setActiveTab("login");
              setShowForgotPassword(false);
            }}
            disabled={isLoading}
          >
            <LogIn className="h-4 w-4" /> Login
          </button>
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-md ${
              activeTab === "signup"
                ? "bg-white text-[#001a33] shadow-sm"
                : "text-gray-600 hover:text-[#001a33]"
            }`}
            onClick={() => {
              setActiveTab("signup");
              setShowForgotPassword(false);
            }}
            disabled={isLoading}
          >
            <UserPlus className="h-4 w-4" /> Sign Up
          </button>
        </div>
        

        {/* Forgot Password Form */}
        {showForgotPassword && (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold text-[#001a33]">
                Reset Password
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Enter your email to receive a reset link
              </p>
            </div>
            <div>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-900" />
                <input
                  type="email"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#001a33]"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              {resetEmailError && (
                <p className="text-red-500 text-sm mt-1">{resetEmailError}</p>
              )}
            </div>
            <div className="space-y-4">
              <button
                onClick={handleResetPassword}
                className={`${buttonClass} bg-[#001a33] text-white hover:bg-[#002b4d]`}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmail("");
                  setResetEmailError("");
                }}
                className={`${buttonClass} text-[#001a33] hover:bg-indigo-50`}
                disabled={isLoading}
              >
                Back to Login
              </button>
            </div>
          </div>
        )}

        {/* Login Form */}
        {activeTab === "login" && !showForgotPassword && (
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
                  disabled={isLoading}
                  required
                />
              </div>
              {loginErrors.email && (
                <p className="text-red-500 text-sm mt-1">{loginErrors.email}</p>
              )}
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
              </div>
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
                  disabled={isLoading}
                  required
                />
              </div>
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-[#001a33] hover:underline"
                disabled={isLoading}
              >
                Forgot Password?
              </button>
              {loginErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {loginErrors.password}
                </p>
              )}
            </div>
            <button
              onClick={() => handleRegistration("login")}
              className={`${buttonClass} bg-[#001a33] text-white hover:bg-[#002b4d]`}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in to your account"}
            </button>
          </div>
        )}

        {/* Sign Up Form */}
        {activeTab === "signup" && !showForgotPassword && (
          <div className="space-y-2">
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                className={`${buttonClass} bg-[#001a33] text-white hover:bg-[#001a33] focus:ring-2 focus:ring-[#001a33] focus:ring-offset-2`}
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create your account"}
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
