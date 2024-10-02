import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../../utils/axiosConfig";

const Setting = () => {
  const [message, setMessage] = useState(null);
  const [globalError, setGlobalError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      heroTitle: "",
      heroDescription: "",
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
  });

  // Fetch existing content on component mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await apiClient.get("/contents");
        const data = response.data.data;
        setMessage("");
        setGlobalError(null);
        reset({
          heroTitle: data.heroTitle,
          heroDescription: data.heroDescription,
          facebook: data.socialMediaLinks?.facebook || "",
          twitter: data.socialMediaLinks?.twitter || "",
          instagram: data.socialMediaLinks?.instagram || "",
          linkedin: data.socialMediaLinks?.linkedin || "",
        });
      } catch (error) {
        setMessage("");
        setGlobalError(error.response.data.message);
      }
    };

    fetchContent();
  }, [reset]);

  const onSubmit = async (data) => {
    setMessage(null);
    setGlobalError(null); // Reset errors before submission

    const formData = new FormData();
    formData.append("heroTitle", data.heroTitle);
    formData.append("heroDescription", data.heroDescription);
    formData.append("facebook", data.facebook);
    formData.append("twitter", data.twitter);
    formData.append("instagram", data.instagram);
    formData.append("linkedin", data.linkedin);

    if (data.heroImage && data.heroImage[0]) {
      formData.append("heroImage", data.heroImage[0]);
    }
    if (data.logo && data.logo[0]) {
      formData.append("logo", data.logo[0]);
    }

    if (data.heroVideo && data.heroVideo[0]) {
      console.log(data.heroVideo[0]);
      formData.append("heroVideo", data.heroVideo[0]);
    }

    try {
      const response = await apiClient.patch(
        "/contents/update-content",
        formData
      );
      setMessage(response.data.message);
      reset();
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        setGlobalError(error.response.data.message);
      } else if (error.response.data.errors) {
        const formErrors = error.response.data.errors;
        Object.keys(formErrors).forEach((key) => {
          setError(formErrors[key].path, {
            type: "manual",
            message: formErrors[key].msg,
          });
        });
      } else {
        setGlobalError("An error occurred");
      }
      setMessage("");
    }
  };

  return (
    <div className="max-w-4xl p-8">
      <h1 className="text-2xl font-bold mb-6">Page Settings</h1>

      {message && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          aria-live="polite"
        >
          <span className="block sm:inline">{message}</span>
        </div>
      )}

      {globalError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          aria-live="polite"
        >
          <span className="block sm:inline">{globalError}</span>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        encType="multipart/form-data"
      >
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
            {...register("heroTitle", { required: "Hero Title is required" })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.heroTitle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.heroTitle.message}
            </p>
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
            <p className="text-red-500 text-sm mt-1">
              {errors.heroDescription.message}
            </p>
          )}
        </div>

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
            <p className="text-red-500 text-sm mt-1">
              {errors.heroImage.message}
            </p>
          )}
        </div>
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
            <p className="text-red-500 text-sm mt-1">
              {errors.heroVideo.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="logo"
            className="block text-sm font-medium text-gray-700"
          >
            logo
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

        <div className="space-y-4">
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
          </div>
          {errors.facebook && (
            <p className="text-red-500 text-sm mt-1">
              {errors.facebook.message}
            </p>
          )}

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
          </div>
          {errors.twitter && (
            <p className="text-red-500 text-sm mt-1">
              {errors.twitter.message}
            </p>
          )}

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
          </div>
          {errors.instagram && (
            <p className="text-red-500 text-sm mt-1">
              {errors.instagram.message}
            </p>
          )}

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
          </div>
          {errors.linkedin && (
            <p className="text-red-500 text-sm mt-1">
              {errors.linkedin.message}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitting ? "Updating..." : "Update Content"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
