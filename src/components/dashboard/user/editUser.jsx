import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useEditUserStatus from "../../../hooks/users/useEditUserStatus";

function EditUser({ user, onEdit }) {
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const { editUserError, editUserMessage, editUser, isEditing } =
    useEditUserStatus({ onEdit, setEditFormOpen });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      subscriptionStatus: user.subscriptionStatus || "free",
    },
  });

  useEffect(() => {
    reset({
      subscriptionStatus: user.subscriptionStatus || "free",
    });
  }, [user, reset]);

  const handleEditUser = async (data) => {
    await editUser(user._id, data);
  };

  return (
    <div>
      {isEditFormOpen && (
        <div className="bg-black bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg text-center">
            <h2 className="text-lg font-bold mb-4">Edit user</h2>
            <form onSubmit={handleSubmit(handleEditUser)} className="space-y-4">
              <h1>
                {user.firstName} {user.lastName}
              </h1>
              <div className="mb-4">
                <label htmlFor="subscriptionStatus" className="mr-2">
                  Subscription Status:
                </label>
                <select
                  id="subscriptionStatus"
                  name="subscriptionStatus"
                  {...register("subscriptionStatus", {
                    required: "Subscription status is required",
                  })}
                  autoComplete="subscriptionStatus"
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option disabled value="">
                    Select a subscription status
                  </option>
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
                {errors.subscriptionStatus && (
                  <p className="text-red-500">
                    {errors.subscriptionStatus.message}
                  </p>
                )}
              </div>

              {editUserMessage && (
                <p className="text-green-500 mb-4">{editUserMessage}</p>
              )}
              {editUserError && (
                <p className="text-red-500 mb-4">{editUserError}</p>
              )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  disabled={isEditing}
                >
                  {isEditing ? "Saving..." : "Save"}
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
        className="md:flex items-center duration-300  text-blue-500 hover:text-blue-700"
        aria-label="Edit user"
      >
        <FaEdit className="w-4 h-4 md:hidden flex" />
        <div className="hidden md:flex">Edit</div>
      </button>
    </div>
  );
}

export default EditUser;
