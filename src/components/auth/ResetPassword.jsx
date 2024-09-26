import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function ResetPassword() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [globalError, setGlobalError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  
  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/"); // Redirect to home if token exists
    }
  }, [navigate]);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/reset-password/reset/${token}`,
        {
          password: data.password,
          confirmPassword: data.confirmPassword,
        }
      );

      setMessage(response.data.message);
      setGlobalError("");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    } catch (error) {
      setMessage("");
      if (error.response?.data && error.response.data?.errors) {
        error.response.data.errors.forEach((err) => {
          setError(err.path, {
            type: "manual",
            message: err.msg,
          });
        });
      } else {
        setGlobalError(error.response?.data?.error || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-primary mb-6">
        Reset Password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            {...register("password", {
              required: "New password is required",
            })}
            className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          {errors.password && (
            <p className="text-red-600 mt-1">{errors.password.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
            })}
            className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {message && (
          <p className="mt-4 text-green-600 text-center">{message}</p>
        )}
        {globalError && (
          <p className="mt-4 text-red-600 text-center">{globalError}</p>
        )}
        <button
          type="submit"
          className={`w-full py-3 text-white rounded-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary ${
            loading ? "bg-button" : "bg-button"
          } ${loading ? "cursor-not-allowed" : "hover:bg-buttonHover"}`}
          disabled={loading}
        >
          {loading ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  </div>
  
  );
}

export default ResetPassword;
