import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useFetchContent from "../../../hooks/settings/useFetchContents";
import useUpdateContent from "../../../hooks/settings/useUpdateContents";

function SocialMediaForm() {
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
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
  });

  const { socialMedia, viewError, viewSocialMedia } = useFetchContent(); // Destructure fetchSocialMedia from the hook
  // Trigger fetchSocialMedia when the component mounts
  useEffect(() => {
    viewSocialMedia();
  }, []);

  console.log(socialMedia);
  const { updateSocialMedia, updateMessage, updateError } = useUpdateContent({
    setError,
    handleReset,
  });

  useEffect(() => {
    reset(
      {
        facebook: socialMedia?.facebook || "",
        twitter: socialMedia?.twitter || "",
        instagram: socialMedia?.instagram || "",
        linkedin: socialMedia?.linkedin || "",
      },
      {
        keepDefaultValues: true,
      }
    );
  }, [socialMedia, reset]);

  const onSubmit = async (data) => {
    console.log(data);
    await updateSocialMedia(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-lg font-semibold">Social Media Links</h3>

      <div>
        <label
          htmlFor="facebook"
          className="block text-sm font-medium text-gray-700"
        >
          Facebook
        </label>
        <input
          id="facebook"
          type="text"
          {...register("facebook")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.facebook && (
          <p className="text-red-500 text-sm mt-1">{errors.facebook.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="twitter"
          className="block text-sm font-medium text-gray-700"
        >
          Twitter
        </label>
        <input
          id="twitter"
          type="text"
          {...register("twitter")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.twitter && (
          <p className="text-red-500 text-sm mt-1">{errors.twitter.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="instagram"
          className="block text-sm font-medium text-gray-700"
        >
          Instagram
        </label>
        <input
          id="instagram"
          type="text"
          {...register("instagram")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.instagram && (
          <p className="text-red-500 text-sm mt-1">
            {errors.instagram.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="linkedin"
          className="block text-sm font-medium text-gray-700"
        >
          LinkedIn
        </label>
        <input
          id="linkedin"
          type="text"
          {...register("linkedin")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.linkedin && (
          <p className="text-red-500 text-sm mt-1">{errors.linkedin.message}</p>
        )}
      </div>

      <div className="flex justify-end">
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
      {/* Display error messages */}
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

export default SocialMediaForm;
