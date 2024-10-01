import EditMeals from "./editMeal";
import DisplayFoodOfMeals from "./displayFoodOfMeals";
import DeleteMeals from "./deleteMeals";
function DisplayMeals({ nutritionPlan, handleRefresh }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        Nutrition Plan for {nutritionPlan?.userId.firstName}{" "}
        {nutritionPlan?.userId.lastName}
      </h1>
      {nutritionPlan?.meals.length ? (
        <ul>
          {nutritionPlan.meals.map((meal) => (
            <li key={meal._id} className="mb-8">
              <div className="text-2xl font-semibold text-indigo-600 mb-2">
                Meal: {meal.mealName} ({meal.mealCalories.toFixed(2)} calories)
                <DeleteMeals {...{ meal, nutritionPlan, handleRefresh }} />
                <EditMeals
                  {...{
                    nutritionPlan,
                    meal,
                    handleRefresh,
                  }}
                />
              </div>
              <DisplayFoodOfMeals
                {...{
                  meal,
                  handleRefresh,
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-lg">No meals added yet</p>
      )}
    </div>
  );
}
export default DisplayMeals;
