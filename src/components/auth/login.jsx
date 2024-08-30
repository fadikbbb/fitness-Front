import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true); // Start loading animation
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        data
      );
      if (response.data.error) {
        setError(response.data.error);
        setEmailSent(false);
      } else if (response.data.message) {
        // Assuming success response contains a message
        setEmailSent(true);
        navigate("/auth/verify-code", {
          state: { email: data.email, password: data.password }, // Pass email and password to verification page
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  // Navigate to home page
  const goToHome = () => {
    navigate("/");
  };

  // Navigate to password reset request page with email state
  const goToPasswordResetRequest = () => {
    navigate("/auth/password-reset-request", {
      state: { email: document.getElementById("email").value }, // Pass email from input field
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded-md hover:bg-blue-600 transition-transform transform flex items-center justify-center ${
              loading ? "bg-blue-400" : "bg-blue-500"
            } ${loading ? "animate-pulse" : ""}`}
            disabled={loading}
          >
            {loading && <FaSpinner className="animate-spin mr-2" />}
            {!loading && "Login"}
          </button>
        </form>
        {emailSent && (
          <p className="mt-4 text-sm text-center text-green-500">
            Verification code sent to your email. Please check your inbox.
          </p>
        )}
        {error && (
          <p className="mt-4 text-sm text-center text-red-500">{error}</p>
        )}
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={goToHome}
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Back
          </button>
          <button
            type="button"
            onClick={goToPasswordResetRequest}
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
