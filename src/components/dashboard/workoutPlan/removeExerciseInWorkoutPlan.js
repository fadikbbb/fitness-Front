import React from "react";
import useRemoveExercise from "../../../hooks/workoutPlans/useRemoveExercise";
function RemoveExerciseInWorkoutPlan({ planId, day, exerciseId, handleRefresh }) {

    const { removeExercise, loading } = useRemoveExercise({ handleRefresh });
    const handleRemoveExercise = async () => {
        await removeExercise(planId, exerciseId, day);
    }
    return (
        <div>
            <button
                onClick={handleRemoveExercise}
                className="text-red-500 hover:underline"
            >
                {loading ? "Removing..." : "Remove"}
            </button>
        </div>
    );
}

export default RemoveExerciseInWorkoutPlan;
