import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useUpdateContent from "../../../../hooks/settings/useUpdateContents";

export function EditService({ id, currentData, handleRefresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateService, loading, error } = useUpdateContent({ handleRefresh });

  // useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Load existing data into the form when the modal opens
  useEffect(() => {
    if (isOpen) {
      reset({
        image: "", // Resetting image since it's a file input
        title: currentData.title,
        description: currentData.description,
      });
    }
  }, [isOpen, reset, currentData]);

  const handleEditService = async (data) => {
    await updateService(data, id);
    reset(); // Reset the form after submission
    setIsOpen(false); // Close modal after submission
  };

  return (
    <div>
      {/* Edit button */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => setIsOpen(true)}
      >
        Edit
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)} // Close modal on outside click
        >
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()} // Stop propagation to prevent modal close when clicking inside
          >
            <h1 className="text-xl font-semibold mb-4">Edit Service</h1>

            {/* Form */}
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit(handleEditService)}
            >
              {/* Image field */}
              <div className="mb-4">
                <label className="block mb-1" htmlFor="image">
                  Image
                </label>
                <input
                  type="file"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  {...register("image")}
                />
                {errors.image && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              {/* Title field */}
              <div className="mb-4">
                <label className="block mb-1" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              {/* Description field */}
              <div className="mb-4">
                <label className="block mb-1" htmlFor="description">
                  Description
                </label>
                <input
                  type="text"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Error message */}
            {error && <p className="text-red-500 mt-4">{error.message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
