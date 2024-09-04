import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/axiosConfig";
import { clearAuthState } from "../../store/authSlice";
import { useDispatch } from "react-redux";
function ChangePassword() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [error, setError] = useState(""); // State to hold error message
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await apiClient.patch(
        `/users/update-password`,
        data
      );
      setError(response?.data?.message);
      dispatch(clearAuthState());
      navigate("/auth/login");
    } catch (error) {
      // Extract and set the error message
      setError(
        error.response?.data?.error || error.response?.data?.errors[0]?.msg
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
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
                  type="text"
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
                  type="text"
                  id="newPassword"
                  {...register("newPassword", {
                    required: "New password is required",
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
                  type="text"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Please confirm your new password",
                    validate: (value, { newPassword }) =>
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
              {error && <p className="text-red-500 text-sm">{error}</p>}
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
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
