import React, { useState, useEffect } from "react";
import AddNutrition from "./addNutrition";
import { useParams } from "react-router-dom";
import apiClient from "../../../utils/axiosConfig";
import { FaEdit, FaTrash } from "react-icons/fa";

function NutritionPlanBody() {
  const { userId } = useParams();
  const [nutritionPlan, setNutritionPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editMealId, setEditMealId] = useState(null);
  const [editFormFood, setEditFormFood] = useState(1);
  const [editFormMeal, setEditFormMeal] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isOpenMealEdit, setIsOpenMealEdit] = useState(false);
  // Fetch nutrition plan data
  const fetchNutritionPlan = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`/nutrition-plans/${userId}`);
      setNutritionPlan(response.data.nutritionPlan);
      console.log(response.data.nutritionPlan);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  const handleEditFood = async (e, foodId, mealId) => {
    e.preventDefault();
    try {
      console.log(editFormFood);
      const response = await apiClient.patch(
        `/nutrition-plans/${userId}/meals/${mealId}/foods/${foodId}`,
        { quantity: editFormFood }
      );
      setMessage(response.data.message);
      handleRefresh();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update food");
    }
  };

  const handleEditMeal = async (e, mealId, planId) => {
    e.preventDefault();
    try {
      const response = await apiClient.patch(
        `/nutrition-plans/${userId}/plans/${planId}/meals/${mealId}`,
        { nameMeal: editFormMeal } // Updated key to match what the backend expects
      );
      setMessage(response.data.message);
      handleRefresh();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update meal");
    }
  };

  const handleRemoveMeal = async (mealId, planId) => {
    try {
      const response = await apiClient.delete(
        `/nutrition-plans/${userId}/plans/${planId}/meals/${mealId}` // Removed extra argument
      );
      setMessage(response.data.message);
      handleRefresh();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete meal");
    }
  };

  // Input change handlers for controlled components
  const handleFoodQuantityChange = (e) => {
    setEditFormFood(e.target.value);
  };

  const handleMealNameChange = (e) => {
    setEditFormMeal(e.target.value);
  };

  const handleRemoveFood = async (foodId, mealId) => {
    try {
      await apiClient.delete(
        `/nutrition-plans/${userId}/meals/${mealId}/foods/${foodId}`
      );
      handleRefresh();
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to remove meal");
    }
  };

  useEffect(() => {
    fetchNutritionPlan();
  }, [userId]);

  // Handle refresh
  const handleRefresh = () => {
    fetchNutritionPlan();
  };

  // Handle input changes and prevent negative numbers
  return (
    <div className="w-full">
      {isLoading ? (
        <p className="text-lg text-gray-700">Loading nutrition plan...</p>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
          {/* Adding New Meal */}
          <AddNutrition userId={userId} onAdd={handleRefresh} />
          {/* Plan Header */}
          <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">
            Nutrition Plan for {nutritionPlan?.userId.firstName}{" "}
            {nutritionPlan?.userId.lastName}
          </h1>
          {nutritionPlan?.meals.length ? (
            <ul>
              {nutritionPlan.meals.map((meal) => (
                <li key={meal._id} className="mb-8">
                  <div className="text-2xl font-semibold text-indigo-600 mb-2">
                    Meal: {meal.nameMeal} ({meal.mealCalories} calories)
                    <FaTrash
                      onClick={() =>
                        handleRemoveMeal(meal._id, nutritionPlan._id)
                      }
                      className="inline-block ml-2 text-red-500 cursor-pointer"
                    />
                    {isOpenMealEdit && (
                     <div className="fixed z-50 inset-0 flex items-center justify-center  bg-black bg-opacity-50">
                        <form className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
                          <input
                            className="mb-2"
                            value={editFormMeal}
                            onChange={handleMealNameChange}
                            type="text"
                            name="nameMeal"
                            placeholder="Enter meal name"
                          />
                          <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            type="submit"
                            onClick={(e) =>
                              handleEditMeal(e, meal._id, nutritionPlan._id)
                            }
                          >
                            Save
                          </button>
                          <button
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 ml-2"
                            onClick={() => setIsOpenMealEdit(!isOpenMealEdit)}
                          >
                            Cancel
                          </button>
                        </form>
                      </div>
                    )}
                    <FaEdit
                      onClick={() => setIsOpenMealEdit(!isOpenMealEdit)}
                      className="inline-block ml-2 text-blue-500 cursor-pointer"
                    />
                  </div>
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
                          {editMealId === meal._id ? (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                              <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-xl font-semibold mb-4">
                                  Edit Meal
                                </h2>
                                <form>
                                  <label className="block mb-4">
                                    Quantity:
                                    <input
                                      type="number"
                                      name="quantity"
                                      value={editFormFood} // Corrected
                                      onChange={handleFoodQuantityChange} // Corrected
                                      min="0"
                                      className="border p-2 w-full rounded-md"
                                    />
                                  </label>
                                  <div className="flex space-x-4 mt-4">
                                    <button
                                      type="button"
                                      onClick={(e) =>
                                        handleEditFood(
                                          e,
                                          food.foodId._id,
                                          meal._id
                                        )
                                      } // Corrected
                                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setEditMealId(null)}
                                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setEditMealId(meal._id);
                                  setEditFormFood(food.quantity); // Set the initial value properly
                                }}
                                className="text-blue-600 hover:text-blue-400"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleRemoveFood(food.foodId._id, meal._id)
                                } // Ensure correct ID usage
                                className="text-red-600 hover:text-red-400"
                              >
                                Remove
                              </button>
                            </>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : error ? (
            <p className="text-red-600 text-lg">{error}</p>
          ) : (
            <p className="text-gray-500 text-lg">No meals added yet</p>
          )}
        </div>
      )}

      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
}

export default NutritionPlanBody;
