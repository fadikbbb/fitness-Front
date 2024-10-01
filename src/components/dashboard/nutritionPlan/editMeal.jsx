import { FaEdit } from "react-icons/fa";
import useEditMeal from "../../../hooks/nutritionPlans/useEditMeal";
import { useState } from "react";
import { useForm } from "react-hook-form";

function EditMeal({ meal, nutritionPlan, handleRefresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const { editMeal, isEditingMeal, error } = useEditMeal({
    setIsOpen,
  });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      mealName: meal.mealName,
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    await editMeal(data.mealName, meal._id, nutritionPlan._id, handleRefresh);
  };

  return (
    <>
      <FaEdit
        onClick={() => setIsOpen(!isOpen)}
        className="inline-block ml-2 text-primary cursor-pointer hover:text-hover transition-colors duration-200"
      />
      {isOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form
            className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-2xl font-semibold text-text text-center mb-4">
              Edit Meal Name
            </h2>
            <input
              className="w-full p-3 border text-text border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("mealName", { required: "Meal name is required" })} // Register the input
              placeholder="Enter meal name"
            />
            <div className="flex justify-between">
              <button
                className="w-full bg-button text-white py-2 px-4 rounded-lg hover:bg-buttonHover transition duration-200"
                type="submit"
              >
                Save
              </button>
              <button
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200 ml-4"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditMeal;
