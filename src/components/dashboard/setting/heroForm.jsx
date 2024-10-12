import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useFetchContent from "../../../hooks/settings/useFetchContents";
import useUpdateContent from "../../../hooks/settings/useUpdateContents";

function HeroForm() {
  const [changes, setChanges] = useState(false);
  const handleReset = () => {
    setChanges(!changes);
  };

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { hero, viewError, viewHero } = useFetchContent(); // Destructure viewHero from the hook

  // Trigger viewHero when the component mounts
  useEffect(() => {
    viewHero();
  }, []);

  const { updateHero, updateMessage, updateError } = useUpdateContent({
    setError,
    handleReset,
  });

  useEffect(() => {
    reset({
      title: hero?.title || "",
      description: hero?.description || "",
    });
  }, [hero, reset]);

  const onSubmit = async (data) => {
    await updateHero(data);
  };

  return (
    <form
      className="space-y-4"
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-xl my-2 font-semibold">Hero Contents</h3>

      {/* Logo Upload */}
      <div>
        <label
          htmlFor="logo"
          className="block text-sm font-medium text-gray-700"
        >
          Logo
        </label>
        <input
          id="logo"
          type="file"
          {...register("logo")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          accept="image/*"
        />
        {errors.logo && (
          <p className="text-red-500 text-sm mt-1">{errors.logo.message}</p>
        )}
      </div>

      {/* Hero Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Hero Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title", {
            required: "Hero Title is required",
          })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Hero Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Hero Description
        </label>
        <textarea
          id="description"
          {...register("description", {
            required: "Hero Description is required",
          })}
          rows="4"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Hero Image Upload */}
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Hero Image
        </label>
        <input
          id="image"
          type="file"
          {...register("image")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          accept="image/*"
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
        )}
      </div>

      {/* Hero Video Upload */}
      <div>
        <label
          htmlFor="video"
          className="block text-sm font-medium text-gray-700"
        >
          Hero Video
        </label>
        <input
          id="video"
          type="file"
          {...register("video")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          accept="video/*"
        />
        {errors.video && (
          <p className="text-red-500 text-sm mt-1">{errors.video.message}</p>
        )}
      </div>

      {/* Submission Buttons */}
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 text-white rounded-md ${
            isSubmitting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>

      {updateError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          aria-live="polite"
        >
          <span className="block sm:inline">{updateError}</span>
        </div>
      )}

      {/* Error and Success Messages */}
      {viewError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          aria-live="polite"
        >
          <span className="block sm:inline">{viewError}</span>
        </div>
      )}
      {updateError && (
        <p className="text-red-500 text-sm mt-1">{updateError.message}</p>
      )}
      {updateMessage && (
        <p className="text-green-500 text-sm mt-1">{updateMessage}</p>
      )}
    </form>
  );
}

export default HeroForm;
