import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
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
  globalError,
  globalMessage,
  setGlobalMessage,
  setGlobalError
}) {
  const onSubmit = (data) => {
    if (exercise) {
      handleEditSubmit(data);
    } else {
      handleAddSubmit(data);
    }

  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: exercise?.name,
      description: exercise?.description,
      image: exercise?.image,
      video: exercise?.video,
      category: exercise?.category,
      restDuration: exercise?.restDuration,
      sets: exercise?.sets,
      minReps: exercise?.minReps,
      maxReps: exercise?.maxReps,
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
  }, [formErrors, setError, clearErrors]); // Add setError and clearErrors to the dependency array


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
      <div className="flex flex-col items-start ">
        <label htmlFor="name" className="block mb-1 text-left">
          Name:
        </label>
        <input
          disabled={isAdding || isEditing ? true : false}
          type="text"
          id="name"
          {...register("name", {
            required: "Name is required",
            maxLength: {
              value: 50,
              message: "Name must be less than 50 characters",
            },
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
            validate: {
              noSpaces: value => {
                if (value.trim() === "") {
                  return "Name cannot be just spaces";
                }
                return true; // Return true if valid
              },
            }
          })

          }
          autoComplete="name"
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.name && <small className="text-red-500">{errors.name.message}</small>}
      </div>

      <div className="flex flex-col items-start">
        <label htmlFor="description" className="block mb-1 text-left">
          Description:
        </label>
        <textarea
          disabled={isAdding || isEditing ? true : false}
          id="description"
          {...register("description",
            {
              required: "description is required",
              validate: {
                noSpaces: value => {
                  if (value.trim() === "") {
                    return "description cannot be just spaces";
                  }
                  return true; // Return true if valid
                },
              }
            }
          )}
          autoComplete="description"
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.description ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.description && (
          <small className="text-red-500">{errors.description.message}</small>
        )}
      </div>

      <div className="flex flex-col items-start">
        <label htmlFor="image" className="block mb-1 text-left">
          Image:
        </label>
        <input
          disabled={isAdding || isEditing ? true : false}
          type="file"
          id="image"
          accept="image/*"
          {...register("image", {
            required:
              !exercise ?
                "Image is required" :
                false,
            validate: {
              requiredFile: value => {
                if (!value[0]) return !exercise ?
                  "Image is required" :
                  false;
                const fileType = value[0].type;
                const validTypes = ['image/jpeg',
                  'image/jpg',
                  'image/png',
                  'image/gif',
                  'image/bmp',
                  'image/webp',];
                if (!exercise && !validTypes.includes(fileType)) return "Only JPG, JPEG, PNG, GIF, and WEBP image formats are allowed."; // Type validation
                return true; // Return true if valid
              },
              maxSize: value => {
                if (value[0] && value[0].size > (2 * 1024 * 1024)) return "File size must be less than 2MB"; // Size validation
                return true;
              },
            }
          }
          )}
          autoComplete="image"
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.image ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.image && <small className="text-red-500">{errors.image.message}</small>}
      </div>

      <div className="flex flex-col items-start">
        <label htmlFor="video" className="block mb-1 text-left">
          Video:
        </label>
        <input
          disabled={isAdding || isEditing ? true : false}
          type="file"
          id="video"
          accept="video/*"
          {...register("video", {
            required: !exercise ? "Video is required" : false,
            validate: {
              requiredFile: value => {

                if (!value[0]) return !exercise ? "Video is required" : true;

                const fileType = value[0].type;
                const validTypes = [
                  'video/mp4',
                  'video/mpeg',
                  'video/avi',
                  'video/mov',
                  'video/webm',
                  'video/mkv',
                  'video/wmv',
                  'video/flv',
                ];

                if (!validTypes.includes(fileType)) {
                  return "Only MP4, MPEG, AVI, MOV, and WEBM video formats are allowed.";
                }
                return true;
              },
              maxSize: value => {
                if (value[0] && value[0].size > (60 * 1024 * 1024)) {
                  return "File size must be less than 60MB";
                }
                return true;
              },
            },
          })}
          autoComplete="video"
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.video ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.video && <small className="text-red-500">{errors.video.message}</small>}
      </div>

      <div className="flex flex-col items-start">
        <label htmlFor="category" className="block mb-1 text-left">
          Category:
        </label>
        <select
          disabled={isAdding || isEditing ? true : false}
          id="category"
          {...register("category", { required: "Category is required" })}
          autoComplete="category"
          defaultValue={exercise?.category || ""}
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.category ? "border-red-500" : "border-gray-300"}`}
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
          <small className="text-red-500">{errors.category.message}</small>
        )}
      </div>

      <div className="flex flex-col items-start">
        <label htmlFor="intensity" className="block mb-1 text-left">
          Intensity:
        </label>
        <select
          disabled={isAdding || isEditing ? true : false}
          id="intensity"
          {...register("intensity", { required: "Intensity is required" })}
          autoComplete="intensity"
          defaultValue={exercise?.intensity || ""}
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.intensity ? "border-red-500 " : "border-gray-300"}`}
        >
          <option value="" disabled>
            Select an intensity
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.intensity && (
          <small className="text-red-500">{errors.intensity.message}</small>
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col justify-between text-sm items-center w-[calc(50%-1rem)]">
          <label htmlFor="restDuration" className="block mb-1 text-left">
            Rest Duration (min):
          </label>
          <input
            disabled={isAdding || isEditing ? true : false}
            type="number"
            id="restDuration"
            {...register("restDuration", {
              required: "Rest Duration is required",
              min: {
                value: 1,
                message: "Rest Duration should be greater than 0",
              },
              validate: {
                minDuration: value => {
                  if (value < "1") return "Rest Duration should be greater than 0";
                  return true;
                },
              },
            })}
            autoComplete="restDuration"
            className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.restDuration ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.restDuration && (
            <small className="text-red-500">{errors.restDuration.message}</small>
          )}
        </div>
        <div className="flex flex-col justify-between text-sm items-center w-[calc(50%-1rem)]">
          <label htmlFor="maxReps" className="block mb-1 text-left">
            max reps:
          </label>
          <input
            disabled={isAdding || isEditing ? true : false}
            type="number"
            id="maxReps"
            {...register("maxReps", {
              required: "Max Reps is required",
              min: {
                value: 1,
                message: "Max Reps should be greater than 0",
              },
              validate: {
                minReps: value => {
                  if (value < "1") return "Max Reps should be greater than 0";
                  return true;
                },
              },
              max: {
                value: 200,
                message: "Max Reps should be less than 200",
              }
            })}
            autoComplete="maxReps"
            className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.maxReps ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.maxReps && (
            <small className="text-red-500">{errors.maxReps.message}</small>
          )}
        </div>
        <div className="flex flex-col justify-between text-sm items-center w-[calc(50%-1rem)]">
          <label htmlFor="minReps" className="block mb-1 text-left">
            min reps:
          </label>
          <input
            disabled={isAdding || isEditing ? true : false}
            type="number"
            id="minReps"
            {...register("minReps",
              {
                required: "Min Reps is required",
                min: {
                  value: 1,
                  message: "Min Reps should be greater than 0",
                },
                validate: {
                  minReps: value => {
                    if (value < "1") return "Min Reps should be greater than 0";
                    return true;
                  },
                },
                max: {
                  value: 200,
                  message: "Min Reps should be less than 200",
                }
              })}
            autoComplete="minReps"
            className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.minReps ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.minReps && (
            <small className="text-red-500">{errors.minReps.message}</small>
          )}
        </div>
        <div className="flex flex-col justify-between text-sm items-center w-[calc(50%-1rem)]">
          <label htmlFor="sets" className="block mb-1 text-left">
            sets:
          </label>
          <input
            disabled={isAdding || isEditing ? true : false}
            type="number"
            id="sets"
            {...register("sets",
              {
                required: "Sets is required",
                min: {
                  value: 1,
                  message: "Sets should be greater than 0",
                },
                validate: {
                  minSets: value => {
                    if (value < "1") return "Sets should be greater than 0";
                    return true;
                  },
                },
                max: {
                  value: 20,
                  message: "Sets should be less than 20",
                }
              }
            )}
            autoComplete="sets"
            className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.sets ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.sets && (
            <small className="text-red-500">{errors.sets.message}</small>
          )}
        </div>
      </div>
      {globalError && (
        <small className="text-red-500">{globalError}</small>
      )}
      {globalMessage && (
        <small className="text-green-500">{globalMessage}</small>
      )}
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
              <div>
                Add Exercise
              </div>

            )}
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            setFormErrors({});
            setGlobalMessage(null);
            setGlobalError(null);
            if (exercise) {
              setEditFormOpen(false);
            } else {
              setAddFormOpen(false);
            }
          }}
          className={`bg-red-500  text-white font-bold py-2 px-4 rounded ${isEditing || isAdding
            ? "opacity-[0.5] cursor-not-allowed "
            : "hover:bg-red-700"
            }`}
          disabled={isEditing || isAdding ? true : false}
        >
          Cancel
        </button>

      </div>
    </form>
  );
} export default ExerciseForm;
