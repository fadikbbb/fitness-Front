import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useFetchContent from "../../../hooks/settings/useFetchContent";
import useUpdateContent from "../../../hooks/settings/useUpdateHero";

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
      heroTitle: "",
      heroDescription: "",
    },
  });

  const { hero,fetchError, fetchMessage } = useFetchContent({
    changes,
    setChanges,
  });

  const { updateHero, updateMessage, updateError } = useUpdateContent({
    setError,
    handleReset,
  });

  useEffect(() => {
    reset({
      heroTitle: hero?.heroTitle || "",
      heroDescription: hero?.heroDescription || "",
    });
  }, [hero, reset]);

  const onSubmit = async (data) => {
    await updateHero(data);
  };

  return (
    <form className="space-y-4" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
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
          htmlFor="heroTitle"
          className="block text-sm font-medium text-gray-700"
        >
          Hero Title
        </label>
        <input
          id="heroTitle"
          type="text"
          {...register("heroTitle", {
            required: "Hero Title is required",
          })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.heroTitle && (
          <p className="text-red-500 text-sm mt-1">{errors.heroTitle.message}</p>
        )}
      </div>

      {/* Hero Description */}
      <div>
        <label
          htmlFor="heroDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Hero Description
        </label>
        <textarea
          id="heroDescription"
          {...register("heroDescription", {
            required: "Hero Description is required",
          })}
          rows="4"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
        {errors.heroDescription && (
          <p className="text-red-500 text-sm mt-1">{errors.heroDescription.message}</p>
        )}
      </div>

      {/* Hero Image Upload */}
      <div>
        <label
          htmlFor="heroImage"
          className="block text-sm font-medium text-gray-700"
        >
          Hero Image
        </label>
        <input
          id="heroImage"
          type="file"
          {...register("heroImage")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          accept="image/*"
        />
        {errors.heroImage && (
          <p className="text-red-500 text-sm mt-1">{errors.heroImage.message}</p>
        )}
      </div>

      {/* Hero Video Upload */}
      <div>
        <label
          htmlFor="heroVideo"
          className="block text-sm font-medium text-gray-700"
        >
          Hero Video
        </label>
        <input
          id="heroVideo"
          type="file"
          {...register("heroVideo")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          accept="video/*"
        />
        {errors.heroVideo && (
          <p className="text-red-500 text-sm mt-1">{errors.heroVideo.message}</p>
        )}
      </div>

      {/* Submission and Reset Buttons */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleReset}
          className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 text-white rounded-md ${
            isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      {fetchMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          aria-live="polite"
        >
          <span className="block sm:inline">{fetchMessage}</span>
        </div>
      )}
      {fetchError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          aria-live="polite"
        >
          <span className="block sm:inline">{fetchError}</span>
        </div>
      )}

      {/* Error and Success Messages */}
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
