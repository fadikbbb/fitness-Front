import React from "react";
import EditExerciseInWorkoutPlan from "./editExerciseInWorkoutPlan";
import RemoveExerciseInWorkoutPlan from "./removeExerciseInWorkoutPlan";

function DisplayWorkoutPlan({ workoutPlan, handleRefresh }) {
    return (
        <div>
            {workoutPlan?.days?.length ? (
                <ul>
                    {workoutPlan.days.map((dayPlan) => (
                        <li key={dayPlan.day} className="mb-6">
                            <h2 className="text-xl font-semibold text-indigo-600">
                                Day {dayPlan.day}
                            </h2>
                            <ul className="mt-3">
                                {dayPlan.exercises.map((exercise) => (
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
                                                alt={`${exercise.exerciseId.name} exercise`}
                                                className="w-16 h-16 rounded"
                                            />
                                            <>
                                                <div className="flex space-x-6">
                                                    <span className="text-sm text-gray-600">
                                                        Sets: {exercise.sets}
                                                    </span>
                                                    <span className="text-sm text-gray-600">
                                                        Reps: {exercise.reps}
                                                    </span>
                                                    <span className="text-sm text-gray-600">
                                                        Rest Duration: {exercise.restDuration}
                                                    </span>
                                                    <EditExerciseInWorkoutPlan
                                                        handleRefresh={handleRefresh}
                                                        exercise={exercise}
                                                        planId={workoutPlan._id}
                                                        day={dayPlan.day}
                                                    />
                                                    <RemoveExerciseInWorkoutPlan
                                                        handleRefresh={handleRefresh}
                                                        exerciseId={exercise.exerciseId._id}
                                                        day={dayPlan.day}
                                                        planId={workoutPlan._id}
                                                    />
                                                </div>
                                            </>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-lg">No exercises added yet</p>
            )}
        </div>
    );
}

export default DisplayWorkoutPlan;
