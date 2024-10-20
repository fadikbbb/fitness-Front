import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RenderForm } from "./renderForm";
import { ButtonSwitch } from "./buttonSwitch";
import RenderPreview from "./renderPreview";
import useUpdateSettings from "../../../../hooks/settings/useUpdateSettings";
import { useSelector } from "react-redux";

function HeroForm() {
  const [activeMode, setActiveMode] = useState("edit");
  const { hero, error } = useSelector((state) => state.settings);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      companyName: "",
      description: "",
      logo: null,
      image: null,
      video: null,
    },
  });

  const { updateHero, updateMessage, updateError } = useUpdateSettings({
    setError,
  });

  const onSubmit = async (data) => {
    await updateHero(data, "hero");
  };

  useEffect(() => {
    if (hero) {
      reset({
        heroTitle: hero?.heroTitle || "",
        companyName: hero?.companyName || "",
        heroDescription: hero?.heroDescription || "",
      });
    }
  }, [hero]);

  const toggleMode = () => {
    setActiveMode(activeMode === "edit" ? "preview" : "edit");
  };

  return (
    <div className="w-full">
      <div className="w-fit">
        <ButtonSwitch activeMode={activeMode} toggleMode={toggleMode} />
      </div>
      {activeMode === "edit" ? (
        <RenderForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          isSubmitting={isSubmitting}
          errors={errors}
        />
      ) : (
        <RenderPreview hero={hero} />
      )}
      {(updateError || error) && (
        <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-600 text-red-700 rounded-md shadow-lg flex items-center">
          <svg
            className="w-6 h-6 mr-3 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0zM12 8v4m0 4h.01"
            ></path>
          </svg>
          <span className="font-semibold">{updateError || error}</span>
        </div>
      )}
      {updateMessage && (
        <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-600 text-green-700 rounded-md shadow-lg flex items-center">
          <svg
            className="w-6 h-6 mr-3 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m0 0a9 9 0 11-12.728 0 9 9 0 0112.728 0z"
            ></path>
          </svg>
          <span className="font-semibold">{updateMessage}</span>
        </div>
      )}
    </div>
  );
}

export default HeroForm;
