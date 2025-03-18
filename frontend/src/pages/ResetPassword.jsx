import React, { useState } from "react";
import { KeyRound, ArrowLeft, Mail, Lock } from "lucide-react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { id, token } = useParams();

  const [resetPassErrors, setResetPassErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validateResetPassForm = () => {
    const errors = {
      password: "",
      confirmPassword: "",
    };
    if (!password) errors.password = "Password is required";
    else if (password.length < 6)
      errors.password = "Password must be at least 6 characters";

    if (!confirmPassword)
      errors.confirmPassword = "Confirm password is required";
    else if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    setResetPassErrors(errors);

    return Object.values(errors).every((error) => error === "");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateResetPassForm()) return;
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form
    setIsSubmitting(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    await axios
      .post(`http://localhost:8080/api/auth/reset-password/${id}/${token}`, {
        password,
      })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Password updated successfully");
          navigate("/login");
        }
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-screen bg-[#001a33] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-[#001a33]/10 flex items-center justify-center">
            <KeyRound className="h-6 w-6 text-[#001a33]" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-[#001a33]">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email and new password below
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-900" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  //   required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#001a33] focus:border-[#001a33]"
                  placeholder="Enter new password"
                />
              </div>
              {resetPassErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {resetPassErrors.password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-900" />
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  //   required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#001a33] focus:border-[#001a33]"
                  placeholder="Confirm new password"
                />
              </div>
              {resetPassErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {resetPassErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#001a33] hover:bg-[#001a33]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001a33] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </div>

          <div className="flex items-center justify-center">
            <Link
              to="/login"
              className="flex items-center text-sm text-[#001a33] hover:text-[#001a33]/80 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
