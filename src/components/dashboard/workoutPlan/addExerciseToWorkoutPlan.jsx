import React, { useState } from "react";
import apiClient from "../../../utils/axiosConfig";
import ExerciseModal from "./ExerciseModal";

function AddExerciseToWorkoutPlan({ userId, onAdd }) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const handleAddToWorkout = async (exerciseDetails) => {
    try {
      const response = await apiClient.post(`/workout-plans/${userId}`, {
        day: exerciseDetails.day,
        exercises: exerciseDetails.exercises,
      });
      onAdd();
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white p-2 rounded-md mb-4"
      >
        Add Exercise to Workout
      </button>
      {showModal && (
        <ExerciseModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddToWorkout}
        />
      )}
    </div>
  );
}

export default AddExerciseToWorkoutPlan;
