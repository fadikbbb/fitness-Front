import React, { useState } from "react";
import AddNutrition from "./addNutrition";
import DisplayMeals from "./displayMeals";
import useNutritionPlanFetching from "../../../hooks/nutritionPlans/useNutritionPlanFetching";

function NutritionPlanBody() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [changes, setChanges] = useState(false);

  const { nutritionPlan } = useNutritionPlanFetching({
    changes,
    setIsLoading,
    setError,
    setMessage,
  });

  const handleRefresh = () => {
    setChanges(!changes);
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <p className="text-lg text-gray-700">Loading nutrition plan...</p>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
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
      {error && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}

export default NutritionPlanBody;
