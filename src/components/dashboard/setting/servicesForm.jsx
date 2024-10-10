import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useFetchContent from "../../../hooks/settings/useFetchContent";
import useUpdateContent from "../../../hooks/settings/useUpdateHero";
function ServicesForm() {
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
  
    const { contentData, fetchMessage, fetchError } = useFetchContent({
      changes,
      setChanges,
    });
  
    const { updateContent, updateMessage, updateError } = useUpdateContent({
      setError,
      handleReset,
    });
  
    useEffect(() => {
      reset(
        {
          facebook: contentData?.facebook || "",
          twitter: contentData?.twitter || "",
          instagram: contentData?.instagram || "",
          linkedin: contentData?.linkedin || "",
        },
        {
          keepDefaultValues: true,
        }
      );
    }, [contentData, reset]);
  
    const onSubmit = async (data) => {
      await updateContent(data);
    };
  
  return (
    <>
    <div>
    <label
          htmlFor="serviceImage"
          className="block text-sm font-medium text-gray-700"
        >
          Service image
        </label>
        <input
          id="serviceImage"
          type="file"
          {...register("serviceImage")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          accept="image/*"
        />
        {errors.serviceImage && (
          <p className="text-red-500 text-sm mt-1">{errors.serviceImage.message}</p>
        )}
    </div>
      <div>
        <label
          htmlFor="serviceTitle"
          className="block text-sm font-medium text-gray-700"
        >
          service title
        </label>
        <input
          type="text"
          id="serviceTitle"
          {...register("serviceTitle", {
            required: "service title is required",
          })}
          rows="4"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.serviceTitle && (
          <p className="text-red-500 text-sm mt-1">
            {errors.serviceTitle.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="serviceDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Service Description
        </label>
        <textarea
          id="serviceDescription"
          {...register("serviceDescription", {
            required: "Service Description is required",
          })}
          rows="4"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
        {errors.serviceDescription && (
          <p className="text-red-500 text-sm mt-1">
            {errors.serviceDescription.message}
          </p>
        )}
      </div>
    </>
  );
}

export default ServicesForm;
