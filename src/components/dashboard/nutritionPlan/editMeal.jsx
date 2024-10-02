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
    <div 
      onClick={() => setIsOpen(!isOpen)}
    className="ml-2 flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200">
      <FaEdit
        className="h-6 w-6 "
        />
      <h3 className="md:flex hidden ml-2">Edit</h3>
        </div>
      {isOpen && (
        <div className="fixed z-50 inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">

         
            <h2 className="text-2xl font-semibold text-blue-500 text-center mb-4">
              Edit Meal 
            </h2>
          <form
            className=""
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="my-4"> 

            <label className="text-xs text-blue-400 font-medium">Meal Name</label>

            <input
              className="w-full p-3 border text-text border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("mealName", { required: "Meal name is required" })} // Register the input
              placeholder="Enter meal name"
              />
              </div>
            <div className="flex justify-between">
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                type="submit"
              >
                Save
              </button>
              <button
                className="w-full bg-gray-100 text-text border-[1px] border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200 ml-4"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div> </div>
      )}
    </>
  );
}

export default EditMeal;
