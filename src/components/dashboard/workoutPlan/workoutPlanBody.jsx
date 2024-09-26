import React, { useState, useEffect } from "react";
import AddExerciseToWorkoutPlan from "./addExerciseToWorkoutPlan";
import { useParams } from "react-router-dom";
import apiClient from "../../../utils/axiosConfig";

function WorkoutPlanBody() {
  const { userId } = useParams();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [editExerciseId, setEditExerciseId] = useState(null);
  const [editForm, setEditForm] = useState({
    sets: "",
    reps: "",
    restDuration: "",
  });

  // Fetch workout plan data
  const fetchWorkoutPlan = async () => {
    try {
      const response = await apiClient.get(`/workout-plans/${userId}`);
      setWorkoutPlan(response.data.workoutPlan);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  const handleEditExercise = async (planId, exerciseId, day) => {
    try {
      const response = await apiClient.patch(
        `/workout-plans/${userId}/workoutPlan/${planId}/exercise/${exerciseId}?day=${encodeURIComponent(
          day
        )}`,
        {
          sets: editForm.sets,
          reps: editForm.reps,
          restDuration: editForm.restDuration,
        }
      );
      setMessage(response.data.message);
      handleRefresh();
      setEditExerciseId(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update exercise");
    }
  };

  const handleRemoveExercise = async (planId, exerciseId, day) => {
    try {
      await apiClient.delete(
        `/workout-plans/${userId}/workoutPlan/${planId}/exercise/${exerciseId}?day=${encodeURIComponent(
          day
        )}`
      );
      handleRefresh();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to remove exercise");
    }
  };
  useEffect(() => {
    fetchWorkoutPlan();
  }, [userId]);

  // Handle refresh
  const handleRefresh = () => {
    fetchWorkoutPlan();
  };

  // Handle input changes and prevent negative numbers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value >= 0) {
      setEditForm({
        ...editForm,
        [name]: value,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      {isLoading ? (
        <p className="text-lg text-gray-700">Loading...</p>
      ) : (
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
          <AddExerciseToWorkoutPlan userId={userId} onAdd={handleRefresh} />
          <h1 className="text-3xl font-bold mb-6 text-center">
            Workout Plan for {workoutPlan?.userId.firstName}{" "}
            {workoutPlan?.userId.lastName}
          </h1>
          {workoutPlan?.days?.length ? (
            <ul>
              {workoutPlan.days.map((dayPlan) => (
                <li key={dayPlan.day} className="mb-6">
                  <div className="text-xl font-semibold text-indigo-600">
                    Day {dayPlan.day}
                  </div>
                  <ul className="mt-3">
                    {dayPlan.exercises.map((exercise, i) => (
                      <li
                        key={exercise._id}
                        className="bg-gray-50 p-4 mb-4 rounded-md shadow"
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-lg font-medium text-gray-800">
                            {exercise.exerciseId.name}
                          </div>
                          <img
                            src={exercise.exerciseId.image}
                            alt={exercise.exerciseId.name}
                            className="w-16 h-16"
                          />
                          {editExerciseId === exercise.exerciseId ? (
                            // Modal Form for Editing Exercise
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                              <div className="bg-white p-6 rounded-md shadow-lg">
                                <h2 className="text-xl font-semibold mb-4">
                                  Edit Exercise
                                </h2>
                                <form>
                                  <label className="block mb-2">
                                    Sets:
                                    <input
                                      type="number"
                                      name="sets"
                                      value={editForm.sets}
                                      onChange={handleInputChange}
                                      min="0"
                                      className="border p-1 w-full"
                                    />
                                  </label>
                                  <label className="block mb-4">
                                    Reps:
                                    <input
                                      type="number"
                                      name="reps"
                                      value={editForm.reps}
                                      onChange={handleInputChange}
                                      min="0"
                                      className="border p-1 w-full"
                                    />
                                  </label>
                                  <label className="block mb-4">
                                    restDuration:
                                    <input
                                      type="number"
                                      name="restDuration"
                                      value={editForm.restDuration}
                                      onChange={handleInputChange}
                                      min="0"
                                      className="border p-1 w-full"
                                    />
                                  </label>
                                  <div className="flex space-x-4">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleEditExercise(
                                          dayPlan._id,
                                          exercise.exerciseId._id,
                                          dayPlan.day
                                        )
                                      }
                                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setEditExerciseId(null)}
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
                              <div className="flex space-x-6">
                                <span className="text-sm text-gray-600">
                                  Sets: {exercise.sets}
                                </span>
                                <span className="text-sm text-gray-600">
                                  Reps: {exercise.reps}
                                </span>
                                <span className="text-sm text-gray-600">
                                  rest duration: {exercise.restDuration}
                                </span>
                              </div>
                              <button
                                onClick={() => {
                                  setEditExerciseId(exercise.exerciseId);
                                  setEditForm({
                                    sets: exercise.sets,
                                    reps: exercise.reps,
                                    restDuration: exercise.restDuration,
                                  });
                                }}
                                className="text-blue-500"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleRemoveExercise(
                                    dayPlan._id,
                                    exercise.exerciseId._id,
                                    dayPlan.day
                                  )
                                }
                                className="text-red-500"
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
