import useEditFood from "../../../hooks/nutritionPlans/useEditFood";
import { useState } from "react";
import { useForm } from "react-hook-form";

function EditFoodInMeals({ meal, food, handleRefresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const { editFood, isEditing, message, error } = useEditFood({
    setIsOpen,
    handleRefresh,
    
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: food.quantity || 1,
    },
  });

  const onSubmit = async (data) => {
    await editFood(food.foodId._id, meal._id, data.quantity);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center  bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-text text-center">
              Edit Food
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <label className="block mb-4 text-text">
                Quantity:
                <input
                  type="number"
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: { value: 1, message: "Quantity must be at least 1" },
                  })}
                  className={`border p-2 w-full rounded-md text-text bg-white ${
                    errors.quantity ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </label>
              {errors.quantity && (
                <span className="text-red-500 text-sm">
                  {errors.quantity.message}
                </span>
              )}
              <div className="flex justify-around items-center mt-4">
                <button
                  type="submit"
                  className="bg-button hover:bg-buttonHover text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-muted hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(true)}
        className="text-primary hover:text-hover"
      >
        {isEditing ? "Editing..." : "Edit"}
      </button>
    </>
  );
}

export default EditFoodInMeals;
