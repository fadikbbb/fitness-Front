import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // to set values from location state
  } = useForm();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const { email, password } = location.state || {};

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/"); // Redirect to home if token exists
    }
  }, [navigate]);

  useEffect(() => {
    if (email) {
      setValue("email", email); // use setValue to set the email field value
    }
    if (password) {
      setValue("password", password); // use setValue to set the password field value
    }
  }, [email, password, setValue]);

  const onSubmit = async (data) => {
    setLoading(true); // Start loading animation
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        ...data,
        purpose: "login",
      });

      // Check if response status is OK (200) or Created (201)
      if (response.status === 200 || response.status === 201) {
        setEmailSent(true);
        setError("");
        setMessage(response.data.message);
        navigate("/auth/verify-code", {
          state: {
            email: data.email,
            password: data.password,
            purpose: "login",
          },
        });
      }
    } catch (error) {
      setMessage("");
      console.log(error);
      if (error.response) {
        setError(
          error.response.data.error || "An error occurred. Please try again."
        );
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  // Navigate to password reset request page with email state
  const goToPasswordResetRequest = () => {
    navigate("/auth/reset-password-request", {
      state: { email: document.getElementById("email").value },
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
        {emailSent && message && (
          <p className="mt-4 text-sm text-center text-green-500">{message}</p>
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
