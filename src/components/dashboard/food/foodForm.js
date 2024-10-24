import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";

const FoodForm = ({
  handleEditSubmit,
  handleAddSubmit,
  isAdding = false,
  isEditing = false,
  setEditFormOpen = () => {},
  setAddFormOpen = () => {},
  food = null,
  setFormErrors = () => {},
  formErrors = {},
  setGlobalError = () => {},
  globalError = null,
  setGlobalMessage = () => {},
  globalMessage = null
}) => {
  const foodCategories = useSelector((state) => state.food.foodCategories);
  const formRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset
  } = useForm({
    defaultValues: {
      name: food?.name || "",
      image: food?.image || "",
      category: food?.category || "",
      calories: food?.calories || "",
      weight: food?.weight || "",
      fat: food?.fat || "",
      protein: food?.protein || "",
      carbohydrates: food?.carbohydrates || "",
      fiber: food?.fiber || "",
    },
  });

  useEffect(() => {
    if (formErrors) {
      Object.keys(formErrors).forEach((key) => {
        setError(formErrors[key].path, {
          type: "manual",
          message: formErrors[key].msg,
        });
      });
    } else {
      clearErrors();
    }
  }, [formErrors, setError, clearErrors]);

  useEffect(() => {
    reset({
      name: food?.name || "",
      image: food?.image || "",
      category: food?.category || "",
      calories: food?.calories || "",
      weight: food?.weight || "",
      fat: food?.fat || "",
      protein: food?.protein || "",
      carbohydrates: food?.carbohydrates || "",
      fiber: food?.fiber || "",
    });
  }, [food, reset]);

  const onSubmit = (data) => {
    if (food) {
      handleEditSubmit(data);
    } else {
      handleAddSubmit(data);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-1">
      <div className="flex flex-col items-start">
        <label htmlFor="name" className="mr-2">
          Name:
        </label>
        <input
          disabled={isAdding || isEditing}
          type="text"
          id="name"
          {...register("name", {
            required: "Name is required",
          })}
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          autoComplete="name"
        />
        {errors.name && (
          <small className="text-red-500">{errors.name.message}</small>
        )}
      </div>

      <div className="flex flex-col items-start">
        <label htmlFor="image" className="mr-2">
          Image:
        </label>
        <input
          disabled={isAdding || isEditing}
          type="file"
          id="image"
          accept="image/*"
          {...register("image", {
            required: !food ? "Image is required" : false,
            validate: {
              requiredFile: (value) => {
                if (!value[0]) return !food ? "Image is required" : false;
                const fileType = value[0].type;
                const validTypes = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                  "image/gif",
                  "image/bmp",
                  "image/webp",
                ];
                if (!food && !validTypes.includes(fileType))
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
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.image ? "border-red-500" : "border-gray-300"
          }`}
          autoComplete="image"
        />
        {errors.image && (
          <small className="text-red-500">{errors.image.message}</small>
        )}
      </div>

      <div className="flex flex-col items-start">
        <label htmlFor="category" className="mr-2">
          Category:
        </label>
        <select
          id="category"
          disabled={isAdding || isEditing}
          {...register("category", {
            required: "Category is required",
          })}
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.category ? "border-red-500" : "border-gray-300"
          }`}
          autoComplete="category"
          defaultValue={food?.category || ""}
        >
          <option value="" disabled>
            Select a category
          </option>
          {foodCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <small className="text-red-500">{errors.category.message}</small>
        )}
      </div>

      {/* Nutritional information fields */}
      {["calories", "weight", "fat", "protein", "carbohydrates", "fiber"].map((field) => (
        <div key={field} className="flex flex-col items-start">
          <label htmlFor={field} className="mr-2">
            {field.charAt(0).toUpperCase() + field.slice(1)}: (g)
          </label>
          <input
            disabled={isAdding || isEditing}
            type="number"
            step={0.1}
            id={field}
            {...register(field, {
              required: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
              valueAsNumber: true,
              min: {
                value: "0",
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} must be greater than 0`,
              },
            })}
            className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${
              errors[field] ? "border-red-500" : "border-gray-300"
            }`}
            autoComplete={field}
          />
          {errors[field] && (
            <small className="text-red-500">{errors[field].message}</small>
          )}
        </div>
      ))}

      {globalError && <small className="text-red-500">{globalError}</small>}
      {globalMessage && <small className="text-green-500">{globalMessage}</small>}

      <div className="flex justify-center">
        {food ? (
          <button
            type="submit"
            className={`${
              isEditing
                ? "bg-button opacity-50 cursor-not-allowed"
                : "bg-button hover:bg-buttonHover"
            } text-white font-bold py-2 px-4 rounded mr-2 flex items-center`}
            disabled={isEditing}
          >
            {isEditing ? (
              <FaSpinner className="animate-spin text-2xl" />
            ) : (
              "Edit Food"
            )}
          </button>
        ) : (
          <button
            type="submit"
            className={`${
              isAdding
                ? "bg-button opacity-50 cursor-not-allowed"
                : "bg-button hover:bg-buttonHover"
            } text-white font-bold py-2 px-4 rounded mr-2 flex items-center`}
            disabled={isAdding}
          >
            {isAdding ? (
              <FaSpinner className="animate-spin text-2xl" />
            ) : (
              "Add Food"
            )}
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setFormErrors({});
            setGlobalError(null);
            setGlobalMessage(null);
            if (food) {
              setEditFormOpen(false);
            } else {
              setAddFormOpen(false);
            }
          }}
          className={`bg-red-500 text-white font-bold py-2 px-4 rounded ${
            isAdding || isEditing ? "opacity-50" : ""
          }`}
          disabled={isAdding || isEditing}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FoodForm;