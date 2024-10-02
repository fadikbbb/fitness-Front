import React from "react";
import FoodModal from "./FoodModal";
import useAddFoodToNutritionPlan from "../../../hooks/nutritionPlans/useAddFoodToNutritionPlan";

function AddFoodToNutritionPlan({ handleRefresh }) {
  const { showModal, error, handleAddToNutritionPlan, toggleModal } =
    useAddFoodToNutritionPlan(handleRefresh);

  return (
    <div className="w-full h-full bg-white text-center">
     
      <button
        onClick={toggleModal}
        className="bg-blue-500 hover:bg-blue-600 duration-300 text-white p-2 rounded-md mb-4"
      >
        Add meals to Nutrition Plan
      </button>
      {showModal && (
        <FoodModal onClose={toggleModal} addError={error} onAdd={handleAddToNutritionPlan} />
      )}
    </div>
  );
}

export default AddFoodToNutritionPlan;
