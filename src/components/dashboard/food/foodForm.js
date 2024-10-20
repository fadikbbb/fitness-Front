import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
function FoodForm({
    handleEditSubmit,
    handleAddSubmit,
    isAdding,
    isEditing,
    setEditFormOpen,
    setAddFormOpen,
    food,
    setFormErrors,
    formErrors,
    setGlobalError,
    globalError,
    setGlobalMessage,
    globalMessage,
}) {
    const foodCategories = useSelector((state) => state.food.foodCategories)
    const onSubmit = (data) => {
        if (food) {
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
    }, [formErrors]);

    useEffect(() => {
        reset({
            name: food?.name,
            image: food?.image,
            category: food?.category,
            calories: food?.calories,
            weight: food?.weight,
            fat: food?.fat,
            protein: food?.protein,
            carbohydrates: food?.carbohydrates,
            fiber: food?.fiber,
        });
    }, [food, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-1">
            <div className="flex flex-col items-start">
                <label htmlFor="name" className="mr-2">
                    Name:
                </label>
                <input
                    disabled={isAdding || isEditing ? true : false}
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "Name is required",
                    })}
                    className={`p-2 border
                        rounded-md w-full 
                        focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? "border-red-500" : "border-gray-300"}`}
                    autoComplete="name"
                />
                {errors.name && (
                    <small className="text-red-500">{errors.name.message}</small>
                )}
            </div>
            <div className="flex flex-col items-start">
                <label htmlFor="image" className="mr-2">
                    image:
                </label>
                <input
                    disabled={isAdding || isEditing ? true : false}
                    type="file"
                    id="image"
                    {...register("image", {
                        required:
                            !food ?
                                "Image is required" :
                                false,
                        validate: {
                            requiredFile: value => {
                                if (!value[0]) return !food ?
                                    "Image is required" :
                                    false;
                                const fileType = value[0].type;
                                const validTypes = ['image/jpeg',
                                    'image/jpg',
                                    'image/png',
                                    'image/gif',
                                    'image/bmp',
                                    'image/webp',];
                                if (!food && !validTypes.includes(fileType)) return "Only JPG, JPEG, PNG, GIF, and WEBP image formats are allowed.";
                                return true;
                            },
                            maxSize: value => {
                                if (value[0] && value[0].size > (2 * 1024 * 1024)) return "File size must be less than 2MB";
                                return true;
                            },
                        }
                    })}
                    className={`p-2 border
                        rounded-md w-full 
                        focus:outline-none focus:ring-2 focus:ring-primary ${errors.image ? "border-red-500" : "border-gray-300"}`}
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
                    disabled={isAdding || isEditing ? true : false}
                    {...register("category", {
                        required: "Category is required",
                    })}
                    className={`p-2 border rounded-md w-full
                        focus:outline-none focus:ring-2
                        focus:ring-primary
                        ${errors.category ?
                            "border-red-500" :
                            "border-gray-300"}`}
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
            <div className="flex flex-col items-start">
                <label htmlFor="calories" className="mr-2">
                    Calories: (kJ)
                </label>
                <input
                    disabled={isAdding || isEditing ? true : false}
                    type="number"
                    step={0.1}
                    id="calories"
                    {...register("calories", {
                        required: "Calories is required",
                        valueAsNumber: true,
                        min: {
                            value: "0",
                            message: "Calories must be greater than 0",

                        }
                    })}
                    className={`p-2 border
                        rounded-md w-full 
                        focus:outline-none focus:ring-2 focus:ring-primary ${errors.calories ? "border-red-500" : "border-gray-300"}`}

                    autoComplete="calories"
                />
                {errors.calories && (
                    <small className="text-red-500">{errors.calories.message}</small>
                )}
            </div>
            <div className="flex flex-col items-start">
                <label htmlFor="weight" className="mr-2">
                    Weight: (g)
                </label>
                <input
                    disabled={isAdding || isEditing ? true : false}
                    type="number"
                    step={0.1}
                    id="weight"

                    {...register("weight"

                        , {
                            required: "Weight is required",
                            valueAsNumber: true,
                            min: {
                                value: "0",
                                message: "Weight must be greater than 0",
                            }
                        }
                    )}
                    className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.weight ? "border-red-500" : "border-gray-300"}`}
                    autoComplete="weight"
                />
                {errors.weight && (
                    <small className="text-red-500">{errors.weight.message}</small>
                )}
            </div>
            <div className="flex flex-col items-start">
                <label htmlFor="fat" className="mr-2">
                    Fat: (g)
                </label>
                <input
                    disabled={isAdding || isEditing ? true : false}
                    type="number"
                    step={0.1}
                    id="fat"
                    {...register("fat",
                        {
                            required: "Fat is required",
                            valueAsNumber: true,
                            min: {
                                value: "0",
                                message: "Fat must be greater than 0",
                            }
                        }
                    )}
                    className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.fat ? "border-red-500" : "border-gray-300"}`}
                    autoComplete="fat"
                />
                {errors.fat && (
                    <small className="text-red-500">{errors.fat.message}</small>
                )}
            </div>
            <div className="flex flex-col items-start">
                <label htmlFor="protein" className="mr-2">
                    protein: (g)
                </label>
                <input
                    disabled={isAdding || isEditing ? true : false}
                    type="number"
                    step={0.1}
                    id="protein"
                    {...register("protein",
                        {
                            required: "Protein is required",
                            valueAsNumber: true,
                            min: {
                                value: "0",
                                message: "Protein must be greater than 0",
                            }

                        }
                    )}
                    className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.protein ? "border-red-500" : "border-gray-300"}`}
                    autoComplete="protein"
                />
                {errors.protein && (
                    <small className="text-red-500">{errors.protein.message}</small>
                )}
            </div>
            <div className="flex flex-col items-start">
                <label htmlFor="carbohydrates" className="mr-2">
                    Carbohydrates: (g)
                </label>
                <input
                    disabled={isAdding || isEditing ? true : false}
                    type="number"
                    step={0.1}
                    id="carbohydrates"
                    {...register("carbohydrates",
                        {
                            required: "Carbohydrates is required",
                            valueAsNumber: true,
                            min: {
                                value: "0",
                                message: "Carbohydrates must be greater than 0",
                            }
                        }
                    )}
                    className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.carbohydrates ? "border-red-500" : "border-gray-300"}`}
                    autoComplete="carbohydrates"
                />
                {errors.carbohydrates && (
                    <small className="text-red-500">{errors.carbohydrates.message}</small>
                )}
            </div>
            <div className="flex flex-col items-start">
                <label htmlFor="fiber" className="mr-2">
                    Fiber: (g)
                </label>
                <input
                    disabled={isAdding || isEditing ? true : false}
                    type="number"
                    step={0.1}
                    id="fiber"
                    {...register("fiber",
                        {
                            required: "Fiber is required",
                            valueAsNumber: true,
                            min: {
                                value: "0",
                                message: "Fiber must be greater than 0",
                            }
                        })}
                    className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.fiber ? "border-red-500" : "border-gray-300"}`}
                    autoComplete="fiber"
                />
                {errors.fiber && (
                    <small className="text-red-500">{errors.fiber.message}</small>
                )}
            </div>
            {globalError && (
                <small className="text-red-500">{globalError}</small>
            )}
            {globalMessage && (
                <small className="text-green-500">{globalMessage}</small>
            )}
            <div className="flex justify-center">
                {food ? (
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
                                Edit Food
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

                                Add Food
                            </>
                        )}
                    </button>
                )}
                <button
                    type="button"
                    onClick={() => {
                        setFormErrors({})
                        setGlobalError(null)
                        setGlobalMessage(null)
                        if (food) {
                            setEditFormOpen(false)
                        }
                        else {
                            setAddFormOpen(false)
                        }
                    }
                    }
                    className={`bg-red-500 text-white font-bold py-2 px-4 rounded
                    ${isAdding || isEditing ? "opacity-[0.5]" : ""}`}
                    disabled={isAdding || isEditing ? true : false}>
                    Cancel
                </button>
            </div>
        </form >
    )
}

export default FoodForm;