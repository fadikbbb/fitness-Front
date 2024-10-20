import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/axiosConfig";
import { clearAuthState } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { FaArrowRight } from "react-icons/fa";

function ChangePassword() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const navigate = useNavigate();

  // Watch the newPassword to compare with confirmPassword in real-time
  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    setLoading(true);
    setUpdateError(""); // Clear previous error
    try {
 await apiClient.patch(`/users/update-password`, data);
      dispatch(clearAuthState());
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        setUpdateError(error.response.data.message);
      } else if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          setError(err.path, {
            type: "manual",
            message: err.msg,
          });
        });
      } else {
        setUpdateError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      {/* Button to show the popup */}
      <button
        onClick={() => setShowPopup(true)}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Change Password
      </button>

      {/* Popup form */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <div
              className="flex items-center justify-end cursor-pointer mb-4"
              onClick={() => setShowPopup(false)}
            >
              <FaArrowRight className="w-4 h-4 text-gray-300 duration-300 hover:text-gray-600" />
            </div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Change Password
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="oldPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  {...register("oldPassword", {
                    required: "Current password is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.oldPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
                      message:
                        "Password must contain an uppercase letter, lowercase letter, a number, and a special character",
                    },
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Please confirm your new password",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              {updateError && (
                <p className="text-red-500 text-sm">{updateError}</p>
              )}
              <button
                type="submit"
                className={`w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
