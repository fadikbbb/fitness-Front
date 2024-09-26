import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FaPlusCircle, FaSpinner } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
function ExerciseForm({
  handleEditSubmit,
  handleAddSubmit,
  isAdding,
  isEditing,
  categories,
  setEditFormOpen,
  setAddFormOpen,
  exercise,
  formErrors,
  setFormErrors,
  setMessage,
  setGlobalError
}) {
  const onSubmit = (data) => {
    if (exercise) {
      handleEditSubmit(data);
    } else {
      handleAddSubmit(data);
    }
    reset();
  };
  // Initialize useForm with defaultValues
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      name: exercise?.name,
      description: exercise?.description,
      image: exercise?.image,
      video: exercise?.video,
      category: exercise?.category,
      restDuration: exercise?.restDuration,
      intensity: exercise?.intensity,
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
  }, [formErrors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data" className="space-y-4">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 text-left">
          Name:
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block mb-1 text-left">
          Description:
        </label>
        <textarea
          id="description"
          {...register("description")} // Added validation
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.description ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block mb-1 text-left">
          Image:
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          {...register("image")} // File inputs don't need default values
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.image ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="video" className="block mb-1 text-left">
          Video:
        </label>
        <input
          type="file"
          id="video"
          accept="video/*"
          {...register("video")}
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.video ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.video && <p className="text-red-500">{errors.video.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block mb-1 text-left">
          Category:
        </label>
        <select
          id="category"
          {...register("category")}
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.category ? "border-red-500" : "border-gray-300"
            }`}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="intensity" className="block mb-1 text-left">
          Intensity:
        </label>
        <select
          id="intensity"
          {...register("intensity")}
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.intensity ? "border-red-500" : "border-gray-300"
            }`}
        >
          <option value="" disabled>
            Select an intensity
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.intensity && (
          <p className="text-red-500">{errors.intensity.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="restDuration" className="block mb-1 text-left">
          Rest Duration (in minutes):
        </label>
        <input
          type="number"
          id="restDuration"
          {...register("restDuration")}
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.restDuration ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.restDuration && (
          <p className="text-red-500">{errors.restDuration.message}</p>
        )}
      </div>
      <div className="flex justify-center">
        {exercise ? (
          <button
            type="submit"
            className={`${isEditing
              ? "bg-button opacity-[0.5] cursor-not-allowed "
              : "bg-button hover:bg-buttonHover"
              } text-white font-bold py-2 px-4 rounded mr-2 flex items-center`}
            disabled={isEditing}
          >
            {isEditing ? (
              <FaSpinner className="animate-spin text-2xl" />
            ) : (
              <>
                <FaEdit className="text-md mr-2" />
                Edit Exercise
              </>
            )}
          </button>
        ) : (
          <button
            type="submit"
            className={`${isAdding
              ? " bg-button opacity-[0.5] cursor-not-allowed "
              : " bg-button hover:bg-buttonHover "
              } text-white font-bold py-2 px-4 rounded mr-2 flex items-center`}
            disabled={isAdding ? true : false}
          >
            {isAdding ? (
              <FaSpinner className="animate-spin text-2xl " />
            ) : (
              <>
                <FaPlusCircle className="text-md mr-2" />
                Add Exercise
              </>
            )}
          </button>
        )}
        {exercise ? (
          <button
            type="button"
            onClick={() => {
              setFormErrors({});
              setGlobalError(null);
              setMessage(null);
              if (exercise) {
                setEditFormOpen(false);
              } else {
                setAddFormOpen(false);
              }
            }}
            className={`bg-red-500  text-white font-bold py-2 px-4 rounded ${isEditing
              ? "opacity-[0.5] cursor-not-allowed "
              : "hover:bg-red-700"
              }`}
            disabled={isEditing}
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setFormErrors({});
              setGlobalError(null);
              setMessage(null);
              if (exercise) {
                setEditFormOpen(false);
              } else {
                setAddFormOpen(false);
              }
            }}
            className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${isAdding ? "opacity-[0.5] cursor-not-allowed " : ""
              }`}
            disabled={isAdding}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ExerciseForm;
