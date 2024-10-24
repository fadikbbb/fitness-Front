import { TableAboutUs } from "./viewAboutUs";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAddContentsHook from "../../../../hooks/settings/useAddSettings";
function AboutUsForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: "",
      title: "",
      description: "",
    },
  });
  const {
    handleAddAbout,
    addError,
    addMessage,
    isAdding,
    setAddMessage,
    setAddError,
  } = useAddContentsHook();
  useEffect(() => {
    reset({
      image: "",
      title: "",
      description: "",
    });
  }, [reset]);

  const onSubmit = async (data) => {
    setTimeout(() => {
      setAddMessage(null);
    }, 5000);
    setAddError(null);
    clearErrors();

    if (!data.image.length) {
      setError("image", {
        type: "manual",
        message: "Service image is required",
      });
      return;
    }
    await handleAddAbout(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Service Image
          </label>
          <input
            id="image"
            type="file"
            {...register("image", {
              required: "Image is required",
              validate: {
                requiredFile: (value) => {
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            accept="image/*"
            onChange={(e) => {
              clearErrors("image");
              if (e.target.files.length === 0) {
                setError("image", {
                  type: "manual",
                  message: "Service image is required",
                });
              }
            }}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Service Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: "Service title is required",
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            onChange={() => clearErrors("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Service Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Service description is required",
            })}
            rows="4"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            onChange={() => clearErrors("description")}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {addError && <p className="text-red-500 text-sm mt-1">{addError}</p>}

        {addMessage ? (
          <p className="text-green-500 text-sm mt-1">{addMessage}</p>
        ) : null}

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={isAdding}
            className={`px-4 py-2 text-white rounded-md ${
              isAdding ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isAdding ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      <TableAboutUs setError={setError}/>
    </div>
  );
}

export default AboutUsForm;
