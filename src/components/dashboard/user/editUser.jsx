import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import apiClient from "../../../utils/axiosConfig";

function EditUser({ user, onSuccess }) {
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      subscriptionStatus: user.subscriptionStatus || "free",
      role: user.role || "",
    },
  });

  useEffect(() => {
    reset({
      subscriptionStatus: user.subscriptionStatus || "free",
      role: user.role || "",
    });
  }, [user, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log(data, user._id);
      const response = await apiClient.patch(`/users/${user._id}`, data);
      setMessage(response.data.message);
      setError(null);
      onSuccess();
      setTimeout(() => {
        setEditFormOpen(false);
        setMessage(null); // Clear the message
      }, 500);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      {isEditFormOpen && (
        <div className="bg-black bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg text-center">
            <h2 className="text-lg font-bold mb-4">Edit user</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <h1>
                {user.firstName} {user.lastName}
              </h1>
              <div className="mb-4">
                <label htmlFor="role" className="mr-2">
                  role:
                </label>
                <select
                  id="role"
                  {...register("role", {
                    required: "role is required",
                  })}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option disabled value="">
                    Select a role
                  </option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
                {errors.role && (
                  <p className="text-red-500">{errors.role.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="subscriptionStatus" className="mr-2">
                  subscriptionStatus:
                </label>
                <select
                  id="subscriptionStatus"
                  {...register("subscriptionStatus", {
                    required: "subscription status is required",
                  })}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option disabled value="">
                    Select a subscription status
                  </option>
                  <option value="free">free</option>
                  <option value="premium">premium</option>
                </select>
                {errors.subscriptionStatus && (
                  <p className="text-red-500">
                    {errors.subscriptionStatus.message}
                  </p>
                )}
              </div>

              {message && <p className="text-green-500 mb-4">{message}</p>}
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {isSubmitting && <p className="text-gray-500 mb-4">Saving...</p>}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditFormOpen(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setEditFormOpen(true)}
        className="md:flex items-center text-gray-500 hover:text-gray-700"
        aria-label="Delete user"
      >
        <FaEdit className="w-8 h-8 sm:w-4 sm:h-4 " />
        <div className="hidden md:flex">Edit</div>
      </button>
    </div>
  );
}

export default EditUser;
