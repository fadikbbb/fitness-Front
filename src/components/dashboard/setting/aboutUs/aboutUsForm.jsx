import { TableAboutUs } from "./viewAboutUs";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useContentsHook from "../../../../hooks/settings/useFetchContents";
import useAddContentsHook from "../../../../hooks/settings/useAddContents";

function AboutUsForm() {
  const [changes, setChanges] = useState(false);

  const handleRefresh = () => {
    setChanges((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      image: "",
      title: "",
      description: "",
    },
  });

  const { about, viewAbout, viewError } = useContentsHook();

  useEffect(() => {
    viewAbout({ changes, setChanges });
  }, [changes]);

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

    await handleAddAbout(data, handleRefresh);
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
              required: "Service image is required",
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
            disabled={isSubmitting}
            className={`px-4 py-2 text-white rounded-md ${
              isSubmitting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      <TableAboutUs
        viewError={viewError}
        aboutUs={about}
        handleRefresh={handleRefresh}
      />
    </div>
  );
}

export default AboutUsForm;
