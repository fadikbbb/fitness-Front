import React, { useState } from "react";
import AddNutrition from "./addNutrition";
import DisplayMeals from "./displayMeals";
import useNutritionPlanFetching from "../../../hooks/nutritionPlans/useNutritionPlanFetching";

function NutritionPlanBody() {
  const [changes, setChanges] = useState(false);

  const { nutritionPlan, error, isLoading, message } = useNutritionPlanFetching(
    {
      changes,
      setChanges,
    }
  );

  const handleRefresh = () => {
    setChanges(!changes);
  };

  return (
    <div className="w-full ">
      {isLoading ? (
        <p className="text-lg text-gray-700">Loading nutrition plan...</p>
      ) : error ? (
        <div className="w-full h-full bg-white shadow-lg rounded-lg p-8">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      ) : (
        <div className="w-full h-full bg-white shadow-lg rounded-lg p-8">
          <AddNutrition handleRefresh={handleRefresh} />
          <DisplayMeals
            nutritionPlan={nutritionPlan}
            handleRefresh={handleRefresh}
          />
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
