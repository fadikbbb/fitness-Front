import { FaTrash } from "react-icons/fa";
import useRemoveMeal from "../../../hooks/nutritionPlans/useRemoveMeal";
import { useState } from "react";

function DeleteMeals({ meal, nutritionPlan, handleRefresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const { removeMeal, error, message, isRemoveLoading } = useRemoveMeal({
    handleRefresh,
  });

  const handleRemoveMeal = async (mealId, planId) => {
    removeMeal(mealId, planId);
  };

  return (
    <>
      <button
        className="flex items-center ml-2 text-red-600 hover:text-red-800 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Delete Meal"
      >
        <FaTrash className="w-6 h-6" />
        <span className="md:flex hidden ml-2">Delete Meal</span>
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
          role="dialog"
          aria-labelledby="delete-confirm-title"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 id="delete-confirm-title" className="mb-4 text-red-500 text-2xl font-bold">
              Confirm Deletion
            </h2>
            <p className="mb-4 text-lg text-gray-700">
              Are you sure you want to delete this meal?
              
            </p>
            <p className="text-gray-400 text-sm my-2">This action cannot be undone.</p>
            {message && <p className="text-green-600 mb-4">{message}</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="flex justify-around ">
              <button
                className="text-xl  bg-red-500 hover:bg-red-700 text-white  py-2 px-4 rounded-lg transition duration-200"
                onClick={() => handleRemoveMeal(meal._id, nutritionPlan._id)}
                disabled={isRemoveLoading}
              >
                {isRemoveLoading ? "Deleting..." : "Delete"}
              </button>
              <button
                className="border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition duration-200"
                onClick={() => setIsOpen(false)}
                disabled={isRemoveLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteMeals;
