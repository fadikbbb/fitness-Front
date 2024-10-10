import useEditFood from "../../../hooks/nutritionPlans/useEditFood";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
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
            <h2 className="text-2xl font-semibold mb-4 text-blue-500 text-center">
              Edit Food
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <label className="block mb-4 text-blue-400">
                Quantity:
                <input
                  type="number"
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: { value: 1, message: "Quantity must be at least 1" },
                  })}
                  className={`border p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-text bg-white ${
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
                  className="bg-blue-500 hover:bg-blue-700 duration-300 text-white px-4 py-2 rounded-md"
                >
                   {isEditing ? "Editing..." : "Edit"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-100 border-[1px] text-text hover:bg-gray-200 duration-300  px-4 py-2 rounded-md"
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
        className="m-2 flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
      >
        <FaEdit className="h-5 w-5 md:hidden block" />
     <span className="md:flex hidden ml-2">Edit</span>
      </button>
    </>
  );
}

export default EditFoodInMeals;
