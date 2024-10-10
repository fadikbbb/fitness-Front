import React from "react";
import EditExerciseInWorkoutPlan from "./editExerciseInWorkoutPlan";
import RemoveExerciseInWorkoutPlan from "./removeExerciseInWorkoutPlan";
import DeleteDayOfExercises from "./deleteDayOfExercises";

function DisplayWorkoutPlan({ workoutPlan, handleRefresh }) {
    return (
        <div>
            {workoutPlan?.days?.length ? (
                <ul>
                    {workoutPlan.days.map((dayPlan) => (
                        <li key={dayPlan.day} className="mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-2xl text-center font-semibold text-text">
                                    Day {dayPlan.day}
                                </h2>
                                <DeleteDayOfExercises
                                    handleRefresh={handleRefresh}
                                    planId={workoutPlan._id}
                                    day={dayPlan.day}
                                />
                            </div>
                            {/* Exercise List */}
                            <ul className="mt-3">
                                {dayPlan.exercises.map((exercise) => (
                                    <li
                                        key={exercise._id}
                                        className="bg-gray-50 mb-4 rounded-md shadow-md p-4 hover:bg-gray-100 transition"
                                    >
                                        <div className="flex flex-col gap-4 md:flex-row justify-between items-start md:items-center">
                                            <div className="flex flex-col gap-4 md:flex-row justify-between items-center w-full">
                                                {/* Left Section: Image and Exercise Name */}
                                                <div className="flex items-center justify-center flex-col md:flex-row flex-wrap gap-4 w-full md:w-1/2">
                                                        <img
                                                            src={exercise.exerciseId.image}
                                                            alt={`${exercise.exerciseId.name} exercise`}
                                                            className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary"
                                                        />
                                                        <div className="text-sm font-bold text-primary mt-2 md:mt-0">
                                                            {exercise.exerciseId.name}
                                                    </div>
                                                </div>

                                                {/* Right Section: Sets, Reps, Rest, and Note */}
                                                <div className="flex flex-row flex-wrap justify-center text-left gap-2 w-full md:w-1/2">
                                                    {/* Sets */}
                                                    <span className="text-sm text-gray-600">
                                                        <small className="font-bold text-primary">Sets:</small> {exercise.sets}
                                                    </span>
                                                    {/* Reps */}
                                                    <span className="text-sm text-gray-600">
                                                        <small className="font-bold text-primary">Reps:</small> {exercise.minReps} - {exercise.maxReps}
                                                    </span>
                                                    {/* Rest Duration */}
                                                    <span className="text-sm text-gray-600">
                                                        <small className="font-bold text-primary">Rest Duration:</small>{" "}
                                                        {exercise.restDuration}
                                                    </span>

                                                    {/* Note (optional) */}
                                                    {exercise.note && (
                                                        <div className="text-sm text-gray-600">
                                                            <small className="font-bold text-primary">Note:</small> {exercise.note}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2 w-full md:w-fit justify-around">
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
