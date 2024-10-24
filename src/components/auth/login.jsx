import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSpinner, FaEnvelope, FaLock } from "react-icons/fa";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [emailChangePassword, setEmailChangePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { email, password } = location?.state || {};

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const initialEmail = email || '';
    const initialPassword = password || '';

    setValue("email", initialEmail);
    setEmailChangePassword(initialEmail);
    setValue("password", initialPassword);
  }, [email, password, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setEmailChangePassword(data.email);
    
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        ...data,
        purpose: "login",
      });

      if (response.status === 200 || response.status === 201) {
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
      if (error.response) {
        setError(error.response.data.message || "An error occurred. Please try again.");
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

  const goToPasswordResetRequest = () => {
    navigate("/auth/reset-password-request", {
      state: { email: emailChangePassword },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-primary">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 text-sm font-bold text-gray-700 flex items-center">
              <FaEnvelope className="mr-2" /> Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              autoComplete="email"
              id="email"
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              disabled={loading}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="mb-2 text-sm font-bold text-gray-700 flex items-center">
              <FaLock className="mr-2" /> Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                autoComplete="current-password"
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded-md bg-blue-600 hover:bg-blue-700 transition-transform transform flex items-center justify-center ${
              loading ? "animate-pulse" : ""
            }`}
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin mr-2" /> : "Login"}
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-center text-green-500">{message}</p>}
        {error && <p className="mt-4 text-sm text-center text-red-500">{error}</p>}
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={goToHome}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
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