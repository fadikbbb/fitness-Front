import React, { useState } from "react";
import AddExerciseToWorkoutPlan from "./addExerciseToWorkoutPlan";
import useWorkoutPlan from "../../../hooks/workoutPlans/useWorkoutPlanFetching";
import DisplayWorkoutPlan from "./displayWorkoutPlan";

function WorkoutPlanBody() {
  const [changes, setChanges] = useState(false);
  const { workoutPlan, error, isLoading } = useWorkoutPlan({
    changes,
    setChanges,
  });

  const handleRefresh = () => {
    setChanges(!changes);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100 p-4">
      {isLoading ? (
        <p className="text-lg text-gray-700">Loading...</p>
      ) : (
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-text">
            {workoutPlan?.userId?.firstName
              ? `Workout Plan for ${workoutPlan.userId.firstName} ${workoutPlan.userId.lastName}`
              : "Workout Plan"}
          </h1>
          <AddExerciseToWorkoutPlan handleRefresh={handleRefresh} />
          {workoutPlan ? (
            <DisplayWorkoutPlan
              workoutPlan={workoutPlan}
              handleRefresh={handleRefresh}
            />
          ) : error ? (
            <p className="text-red-500 text-lg">{error}</p>
          ) : (
            <p className="text-gray-500 text-lg">No exercises added yet</p>
          )}
        </div>
      )}
    </div>
  );
}

export default WorkoutPlanBody;
