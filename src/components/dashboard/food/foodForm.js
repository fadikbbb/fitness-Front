import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { FaPlusCircle, FaSpinner } from "react-icons/fa";
function FoodForm({
    handleEditSubmit,
    handleAddSubmit,
    isAdding,
    isEditing,
    foodCategories,
    setEditFormOpen,
    setAddFormOpen,
    food,
    setFormErrors,
    formErrors,
    setGlobalError,
    setMessage,
}) {
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
            name: food?.name,
            description: food?.description,
            image: food?.image,
            category: food?.category,
            calories: food?.calories,
            weight: food?.weight,
            fat: food?.fat,
            protein: food?.protein,
            carbohydrates: food?.carbohydrates,
            fiber: food?.fiber,
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
            description: food?.description,
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
        <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="space-y-1"
        >
            <div className="flex flex-col items-start">
                <label htmlFor="name" className="mr-2">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className={`p-2 border
                         rounded-md w-full 
                         focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? "border-red-500" : "border-gray-300"}`}
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
                    type="file"
                    id="image"
                    {...register("image")}
                    className={`p-2 border
                         rounded-md w-full 
                         focus:outline-none focus:ring-2 focus:ring-primary ${errors.image ? "border-red-500" : "border-gray-300"}`}

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
                    {...register("category")}
                    className={`p-2 border
                         rounded-md w-full 
                         focus:outline-none focus:ring-2 focus:ring-primary ${errors.category ? "border-red-500" : "border-gray-300"}`}

                >
                    <option value="" disabled selected >Select a category</option>
                    {foodCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                    <option value="">all</option>
                </select>
                {errors.category && (
                    <small className="text-red-500">{errors.category.message}</small>
                )}
            </div>

            <div className="flex flex-col items-start">
                <label htmlFor="calories" className="mr-2">
                    Calories:
                </label>
                <input
                    type="number"
                    step={0.1}
                    id="calories"
                    {...register("calories")}
                    className={`p-2 border
                         rounded-md w-full 
                         focus:outline-none focus:ring-2 focus:ring-primary ${errors.calories ? "border-red-500" : "border-gray-300"}`}

                />
                {errors.calories && (
                    <small className="text-red-500">{errors.calories.message}</small>
                )}
            </div>

            <div className="flex flex-col items-start">
                <label htmlFor="weight" className="mr-2">
                    Serving Size:
                </label>
                <input
                    type="number"
                    step={0.1}
                    id="weight"
                    {...register("weight")}
                    className={`p-2 border
                         rounded-md w-full 
                         focus:outline-none focus:ring-2 focus:ring-primary ${errors.weight ? "border-red-500" : "border-gray-300"}`}

                />
                {errors.weight && (
                    <small className="text-red-500">{errors.weight.message}</small>
                )}
            </div>

            <div className="flex flex-col items-start">
                <label htmlFor="fat" className="mr-2">
                    Fat:
                </label>
                <input
                    type="number"
                    step={0.1}
                    id="fat"
                    {...register("fat")}
                    className={`p-2 border
                         rounded-md w-full 
                         focus:outline-none focus:ring-2 focus:ring-primary ${errors.fat ? "border-red-500" : "border-gray-300"}`}

                />
                {errors.fat && (
                    <small className="text-red-500">{errors.fat.message}</small>
                )}
            </div>

            <div className="flex flex-col items-start">
                <label htmlFor="protein" className="mr-2">
                    protein:
                </label>
                <input
                    type="number"
                    step={0.1}
                    id="protein"
                    {...register("protein")}
                    className={`p-2 border
                         rounded-md w-full 
                         focus:outline-none focus:ring-2 focus:ring-primary ${errors.protein ? "border-red-500" : "border-gray-300"}`}

                />
                {errors.protein && (
                    <small className="text-red-500">{errors.protein.message}</small>
                )}
            </div>

            <div className="flex flex-col items-start">
                <label htmlFor="carbohydrates" className="mr-2">
                    Carbohydrates:
                </label>
                <input
                    type="number"
                    step={0.1}
                    id="carbohydrates"
                    {...register("carbohydrates")}
                    className={`p-2 border
                         rounded-md w-full 
                         focus:outline-none focus:ring-2 focus:ring-primary ${errors.carbohydrates ? "border-red-500" : "border-gray-300"}`}

                />
                {errors.carbohydrates && (
                    <small className="text-red-500">{errors.carbohydrates.message}</small>
                )}
            </div>

            <div className="flex flex-col items-start">
                <label htmlFor="fiber" className="mr-2">
                    Fiber:
                </label>
                <input
                    type="number"
                    step={0.1}
                    id="fiber"
                    {...register("fiber")}
                    className={`p-2 border
                         rounded-md w-full 
                         focus:outline-none focus:ring-2 focus:ring-primary ${errors.fiber ? "border-red-500" : "border-gray-300"}`}

                />
                {errors.fiber && (
                    <small className="text-red-500">{errors.fiber.message}</small>
                )}
            </div>


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
                                <FaEdit className="text-md mr-2" />
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
                                <FaPlusCircle className="text-md mr-2" />
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
                        setMessage(null)
                        if (food) {
                            setEditFormOpen(false)
                        }
                        else {
                            setAddFormOpen(false)
                        }
                    }
                    }
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Cancel
                </button>
            </div>
        </form >
    )
}

export default FoodForm;