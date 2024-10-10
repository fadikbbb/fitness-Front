import useRemoveFood from "../../../hooks/nutritionPlans/useRemoveFood";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
function DeleteFoodInMeals({ meal, food, handleRefresh }) {
  const { removeFood, isRemoving, error } = useRemoveFood();
  const [isOpen, setIsOpen] = useState(false);

  const handleRemoveFood = async (foodId, mealId) => {
    removeFood(foodId, mealId, handleRefresh);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
          role="dialog"
          aria-labelledby="delete-confirm-title"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2
              id="delete-confirm-title"
              className="mb-4 text-red-500 text-2xl font-bold"
            >
              Confirm Deletion
            </h2>
            <p className="text-gray-900 text-lg">
              Are you sure you want to delete this food from {meal.mealName}?
            </p>
            <p className="text-gray-400 text-sm my-4">
              This action cannot be undone.
            </p>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {isRemoving && <p className="text-green-500 mb-4">Removing...</p>}
            <div className="flex justify-around">
              <button
                className="ml-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                onClick={() => handleRemoveFood(food.foodId._id, meal._id)}
              >
                {isRemoving ? "Removing..." : "Remove"}
              </button>
              <button
                className="bg-gray-100 border-[1px] text-text p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(true)}
        className="m-2 flex items-center text-red-600 hover:text-red-800 transition-colors duration-200"
      >
        <FaTrash className="h-5 w-5 md:hidden block" />
        <span className="md:flex hidden ml-2">Delete</span>
      </button>
    </>
  );
}

export default DeleteFoodInMeals;
