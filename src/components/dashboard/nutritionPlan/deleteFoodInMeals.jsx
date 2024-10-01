import useRemoveFood from "../../../hooks/nutritionPlans/useRemoveFood";

function DeleteFoodInMeals({ meal, food, handleRefresh }) {
  const { removeFood, isRemoving, error } = useRemoveFood();

  const handleRemoveFood = async (foodId, mealId) => {
    removeFood(foodId, mealId, handleRefresh);
  };
  
  return (
    <button
      onClick={() => handleRemoveFood(food.foodId._id, meal._id)}
      className="text-red-600 hover:text-red-400"
    >
      {isRemoving ? "Removing..." : "Remove"}
    </button>
  );
}

export default DeleteFoodInMeals;
