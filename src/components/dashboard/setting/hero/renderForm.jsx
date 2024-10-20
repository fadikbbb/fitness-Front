import React from "react";

export function RenderForm({
  handleSubmit,
  onSubmit,
  register,
  isSubmitting,
  errors,
}) {
  return (
    <form
      className="space-y-6"
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
    >
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
          {...register("logo", {
            validate: {
              requiredFile: (value) => {
                if (!value[0]) return true; // Allow no file if it's optional
                const fileType = value[0].type;
                const validTypes = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                  "image/gif",
                  "image/bmp",
                  "image/webp",
                ];
                if (!validTypes.includes(fileType))
                  return "Only JPG, JPEG, PNG, GIF, and WEBP image formats are allowed.";
                return true;
              },
              maxSize: (value) => {
                if (value[0] && value[0].size > 2 * 1024 * 1024)
                  return "File size must be less than 2MB";
                return true;
              },
            },
          })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          accept="image/*"
        />
        {errors.logo && (
          <p className="text-red-500 text-sm mt-1">{errors.logo.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-700"
        >
          company name:
        </label>
        <input
          id="companyName"
          type="text"
          {...register("companyName")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.companyName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.companyName.message}
          </p>
        )}
      </div>
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
          {...register("heroTitle")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.heroTitle && (
          <p className="text-red-500 text-sm mt-1">
            {errors.heroTitle.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="heroDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Hero Description
        </label>
        <textarea
          id="heroDescription"
          {...register("heroDescription")}
          rows="4"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
          {...register("heroImage", {
            validate: {
              requiredFile: (value) => {
                if (!value[0]) return true; // Allow no file if it's optional
                const fileType = value[0].type;
                const validTypes = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                  "image/gif",
                  "image/bmp",
                  "image/webp",
                ];
                if (!validTypes.includes(fileType))
                  return "Only JPG, JPEG, PNG, GIF, and WEBP image formats are allowed.";
                return true;
              },
              maxSize: (value) => {
                if (value[0] && value[0].size > 2 * 1024 * 1024)
                  return "File size must be less than 2MB";
                return true;
              },
            },
          })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
          {...register("heroVideo", {
            validate: {
              requiredFile: (value) => {
                if (!value[0]) return true; // Allow no file if it's optional
                const fileType = value[0].type;
                const validTypes = [
                  "video/mp4",
                  "video/mpeg",
                  "video/x-msvideo",
                  "video/quicktime",
                  "video/webm",
                ];
                if (!validTypes.includes(fileType))
                  return "Only video/mp4 , video/mpeg, video/x-msvideo, video/quicktime and video/webm image formats are allowed.";
                return true;
              },
              maxSize: (value) => {
                if (value[0] && value[0].size > 60 * 1024 * 1024)
                  return "File size must be less than 2MB";
                return true;
              },
            },
          })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          accept="video/*"
        />
        {errors.heroVideo && (
          <p className="text-red-500 text-sm mt-1">
            {errors.heroVideo.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 text-white font-medium rounded-lg ${
            isSubmitting
              ? "bg-gray-400"
              : "bg-indigo-600 hover:bg-indigo-700 transition-colors"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
