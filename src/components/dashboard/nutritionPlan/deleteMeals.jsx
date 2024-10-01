import { FaTrash } from "react-icons/fa";
import useRemoveMeal from "../../../hooks/nutritionPlans/useRemoveMeal";

function DeleteMeals({ meal, nutritionPlan, handleRefresh }) {
  const { removeMeal, error, message, isRemoveLoading } = useRemoveMeal({
    handleRefresh,
  });
  const handleRemoveMeal = async (mealId, planId) => {
    removeMeal(mealId, planId);
  };
  return (
    <button
      className="flex ml-2 text-red-500 cursor-pointer"
      onClick={() => handleRemoveMeal(meal._id, nutritionPlan._id)}
    >
      <FaTrash className="w-8 h-8 md:h-6 md:w-6 flex" />
      <span className="md:flex hidden">Delete Meal</span>
    </button>
  );
}
export default DeleteMeals;
