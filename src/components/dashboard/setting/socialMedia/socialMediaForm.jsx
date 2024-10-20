import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useUpdateContent from "../../../../hooks/settings/useUpdateSettings";

function SocialMediaForm() {
  const { socialMedia, error } = useSelector((state) => state.settings);
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
      whatsApp: "",
    },
  });
  const { updateSocialMedia, updateMessage, updateError } = useUpdateContent({
    setError,
  });

  useEffect(() => {
    reset(
      {
        facebook: socialMedia?.facebook || "",
        twitter: socialMedia?.twitter || "",
        instagram: socialMedia?.instagram || "",
        linkedin: socialMedia?.linkedin || "",
        whatsApp: socialMedia?.whatsApp || "",
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
          {...register("facebook", {
            required: {
              value: true,
              message: "Facebook link is required",
            },
            pattern: {
              value:
                /^(http\:\/\/|https\:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/i,
              message: "Please enter a valid Facebook link",
            },
          })}
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
          {...register("twitter", {
            required: {
              value: true,
              message: "Twitter link is required",
            },
            pattern: {
              value:
                /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/([a-zA-Z0-9_]{1,15})\/?$/i,
              message: "Please enter a valid Twitter link",
            },
          })}
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
          {...register("instagram", {
            required: {
              value: true,
              message: "Instagram link is required",
            },
            pattern: {
              value:
                /^(https?:\/\/)?(www\.)?instagram\.com\/([a-zA-Z0-9_.]{1,30})\/?$/i,
              message: "Please enter a valid Instagram link",
            },
          })}
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
          {...register("linkedin", {
            required: {
              value: true,
              message: "LinkedIn link is required",
            },
            pattern: {
              value:
                /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+\/?$/i,
              message: "Please enter a valid LinkedIn link",
            },
          })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.linkedin && (
          <p className="text-red-500 text-sm mt-1">{errors.linkedin.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="whatsApp"
          className="block text-sm font-medium text-gray-700"
        >
          WhatsApp
        </label>
        <input
          id="whatsApp"
          type="number"
          {...register("whatsApp", {
            required: {
              value: true,
              message: "WhatsApp number is required",
            },
            pattern: {
              value: /^\d+$/,
              message: "Please enter a valid WhatsApp number",
            },
          })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.whatsApp && (
          <p className="text-red-500 text-sm mt-1">{errors.whatsApp.message}</p>
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
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          aria-live="polite"
        >
          <span className="block sm:inline">{error}</span>
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
