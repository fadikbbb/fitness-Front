import EditMeals from "./editMeal";
import DisplayFoodOfMeals from "./displayFoodOfMeals";
import DeleteMeals from "./deleteMeals";
function DisplayMeals({ nutritionPlan, handleRefresh }) {
  return (
    <div className="w-full h-full bg-white ">
      <h1 className="text-3xl font-bold mb-8 text-center text-text">
        Nutrition Plan
        {nutritionPlan?.userId.firstName &&
          nutritionPlan?.userId.lastName &&
          `for ${nutritionPlan?.userId.firstName} ${nutritionPlan?.userId.lastName}`}
      </h1>
      <div className="flex flex-col ">
        {nutritionPlan?.meals.length ? (
          <ul>
            {nutritionPlan.meals.map((meal) => (
              <li key={meal._id} className="mb-8 shadow-lg rounded-lg p-8">
                <div className="flex flex-wrap justify-between items-center m-2">
                  Meal: {meal.mealName} ({meal.mealCalories.toFixed(2)}{" "}
                  calories)
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
          <p className="text-red-500 text-lg text-center">No meals added yet</p>
        )}
      </div>
    </div>
  );
}
export default DisplayMeals;
