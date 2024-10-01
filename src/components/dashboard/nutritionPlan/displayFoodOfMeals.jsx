import DeleteFoodInMeals from "./deleteFoodInMeals";
import EditFoodInMeals from "./editFoodInMeals";
function DisplayFoodOfMeals({ meal, handleRefresh }) {
  return (
    <ul className="space-y-4">
      {meal.foods.map((food) => (
        <li
          key={food._id}
          className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
        >
          <div>
            <span className="text-lg font-medium text-gray-800">
              {food.foodId.name}
            </span>
            <p className="text-sm text-gray-500 mt-1">
              weight: {food.quantity}g
            </p>
          </div>

          <div className="flex space-x-4">
            <EditFoodInMeals
              {...{
                handleRefresh,
                meal,
                food,
              }}
            />
            <DeleteFoodInMeals {...{ meal, food, handleRefresh }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default DisplayFoodOfMeals;
