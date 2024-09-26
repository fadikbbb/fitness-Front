import React, { useState } from "react";
import apiClient from "../../../utils/axiosConfig";
import FoodModal from "./FoodModal";

function AddFoodToNutritionPlan({ userId, onAdd }) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const handleAddToNutritionPlan = async (mealDetails) => {
    try {
      console.log(mealDetails);
      const response = await apiClient.post(
        `/nutrition-plans/${userId}`,
        mealDetails
      );
      onAdd(response.data.nutritionPlan); // You might want to pass the updated nutrition plan to refresh the UI
      setShowModal(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to add food to the nutrition plan."
      );
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white p-2 rounded-md mb-4"
      >
        Add Food to Nutrition Plan
      </button>
      {showModal && (
        <FoodModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddToNutritionPlan}
        />
      )}
    </div>
  );
}

export default AddFoodToNutritionPlan;
