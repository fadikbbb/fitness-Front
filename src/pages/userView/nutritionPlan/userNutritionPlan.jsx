import React, { useState } from "react";
import { Link } from "react-router-dom";
import useNutritionPlanFetching from "../../../hooks/nutritionPlans/useNutritionPlanFetching";

function ViewNutritionPlan() {
  const [changes, setChanges] = useState(false);
  const { nutritionPlan, isLoading, error } = useNutritionPlanFetching({
    changes,
    setChanges,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <p className="text-gray-600 text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <p className="text-red-600 text-xl">Error: {error.message}</p>
      </div>
    );
  }

  const colors = [
    "bg-red-100 border-red-400",
    "bg-green-100 border-green-400",
    "bg-blue-100 border-blue-400",
    "bg-yellow-100 border-yellow-400",
    "bg-purple-100 border-purple-400",
    "bg-pink-100 border-pink-400",
    "bg-teal-100 border-teal-400",
    "bg-orange-100 border-orange-400",
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto mt-6">
        {nutritionPlan ? (
          <>
            <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-8 mb-8">
              <div className="md:w-2/3">
                {nutritionPlan.userId ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {nutritionPlan.userId.firstName}{" "}
                      {nutritionPlan.userId.lastName}
                    </h2>
                    <p className="text-gray-600">
                      Subscription:{" "}
                      <span className="text-blue-500">
                        {nutritionPlan.userId.subscriptionStatus}
                      </span>
                    </p>
                  </>
                ) : (
                  <p className="text-red-600">
                    User information is not available.
                  </p>
                )}
              </div>
            </div>

            {/* Nutrition Plan Section */}
            <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Nutrition Plan Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-lg">
                    Total Calories:{" "}
                    <span className="font-semibold">
                      {nutritionPlan.totalCalories.toFixed(2)} kcal
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-lg">
                    Last Updated:{" "}
                    <span className="font-semibold">
                      {new Date(nutritionPlan.updatedAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Meals Section */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h4 className="text-xl font-semibold text-gray-800 mb-6">
                Meals
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {nutritionPlan.meals.map((meal, index) => (
                  <div
                    key={index}
                    className={`shadow-md p-6 rounded-lg hover:shadow-lg transition duration-300 border-2 ${
                      colors[index % colors.length]
                    }`}
                  >
                    <h5 className="text-lg font-semibold text-gray-800 mb-4">
                      {meal.mealName}
                    </h5>
                    <p className="text-gray-600 mb-2">
                      Calories: {meal.mealCalories.toFixed(2)} kcal
                    </p>
                    <p className="text-gray-700 font-medium">Contents:</p>
                    <ul className="list-disc list-inside mb-4">
                      {meal.foods.map((food) => (
                        <li key={food.foodId._id} className="text-gray-700">
                          <Link
                            to={`/user/nutrition-plan/${nutritionPlan.userId._id}/food/${food.foodId._id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {food.foodId.name}
                          </Link>{" "}
                          ({food.quantity}g)
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-600 text-xl">No nutrition plan found.</p>
        )}
      </div>
    </div>
  );
}

export default ViewNutritionPlan;
