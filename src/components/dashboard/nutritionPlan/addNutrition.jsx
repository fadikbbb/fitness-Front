import React from "react";
import FoodModal from "./FoodModal";
import useAddFoodToNutritionPlan from "../../../hooks/nutritionPlans/useAddFoodToNutritionPlan";

function AddFoodToNutritionPlan({ handleRefresh }) {
  const { showModal, error, handleAddToNutritionPlan, toggleModal } =
    useAddFoodToNutritionPlan(handleRefresh);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white p-2 rounded-md mb-4"
      >
        Add meals to Nutrition Plan
      </button>
      {showModal && (
        <FoodModal onClose={toggleModal} onAdd={handleAddToNutritionPlan} />
      )}
    </div>
  );
}

export default AddFoodToNutritionPlan;
