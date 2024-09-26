import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

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
        reset();
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
            className="space-y-4"
        >
            <div className="mb-4">
                <label htmlFor="name" className="mr-2">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="p-2 border border-gray-300 rounded-md"
                />
                {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="image" className="mr-2">
                    image URL:
                </label>
                <input
                    type="file"
                    id="image"
                    {...register("image")}
                    className="p-2 border border-gray-300 rounded-md"
                />
                {errors.image && (
                    <p className="text-red-500">{errors.image.message}</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="category" className="mr-2">
                    Category:
                </label>
                <select
                    id="category"
                    {...register("category")}
                    className="p-2 border border-gray-300 rounded-md"
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
                    <p className="text-red-500">{errors.category.message}</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="calories" className="mr-2">
                    Calories:
                </label>
                <input
                    type="number"
                    step={0.1}
                    id="calories"
                    {...register("calories")}
                    className="p-2 border border-gray-300 rounded-md"
                />
                {errors.calories && (
                    <p className="text-red-500">{errors.calories.message}</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="weight" className="mr-2">
                    Serving Size:
                </label>
                <input
                    type="number"
                    step={0.1}
                    id="weight"
                    {...register("weight")}
                    className="p-2 border border-gray-300 rounded-md"
                />
                {errors.weight && (
                    <p className="text-red-500">{errors.weight.message}</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="fat" className="mr-2">
                    Fat:
                </label>
                <input
                    type="number"
                    step={0.1}
                    id="fat"
                    {...register("fat")}
                    className="p-2 border border-gray-300 rounded-md"
                />
                {errors.fat && (
                    <p className="text-red-500">{errors.fat.message}</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="protein" className="mr-2">
                    protein:
                </label>
                <input
                    type="number"
                    step={0.1}
                    id="protein"
                    {...register("protein")}
                    className="p-2 border border-gray-300 rounded-md"
                />
                {errors.protein && (
                    <p className="text-red-500">{errors.protein.message}</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="carbohydrates" className="mr-2">
                    Carbohydrates:
                </label>
                <input
                    type="number"
                    step={0.1}
                    id="carbohydrates"
                    {...register("carbohydrates")}
                    className="p-2 border border-gray-300 rounded-md"
                />
                {errors.carbohydrates && (
                    <p className="text-red-500">{errors.carbohydrates.message}</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="fiber" className="mr-2">
                    Fiber:
                </label>
                <input
                    type="number"
                    step={0.1}
                    id="fiber"
                    {...register("fiber")}
                    className="p-2 border border-gray-300 rounded-md"
                />
                {errors.fiber && (
                    <p className="text-red-500">{errors.fiber.message}</p>
                )}
            </div>


            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    disabled={food ?
                        (isEditing ? true : false)
                        : (isAdding ? true : false)}
                >
                    {food ?
                        (isEditing ? "editing..." : "edit")
                        : (isAdding ? "Creating..." : "Create")}

                </button>
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