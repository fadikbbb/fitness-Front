import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoFilterOutline } from "react-icons/io5";

function ExerciseModal({ onClose, onAdd, error, exercises, loading }) {
    const [selectedExercises, setSelectedExercises] = useState(new Set());
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({
        defaultValues: {
            selectedExercises: [],
        },
    });

    const handleSelect = (exerciseId) => {
        setSelectedExercises((prev) => {
            const newSelections = new Set(prev);
            if (newSelections.has(exerciseId)) {
                newSelections.delete(exerciseId);
            } else {
                newSelections.add(exerciseId);
            }
            return newSelections;
        });
    };

    const onSubmit = (data) => {
        const exerciseData = [...selectedExercises].map((exerciseId) => ({
            exerciseId,
            sets: data[`sets-${exerciseId}`],
            reps: data[`reps-${exerciseId}`],
            restDuration: data[`restDuration-${exerciseId}`],
            note: data[`note-${exerciseId}`],
        }));

        if (exerciseData.length > 0) {
            onAdd({
                exercises: exerciseData,
                day: data.day,
            });
            reset(); // Clear form after submission
            setSelectedExercises(new Set()); // Clear selected exercises
        }
    };

    return (
        <div className="mt-4">
            {loading ? (
                <p>Loading...</p>
            ) : exercises.length === 0 ? (
                <p>No exercises found</p>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <select
                        id="day"
                        {...register("day", { required: "Please select a day." })}
                        className="w-full p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Select day"
                    >
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                    {errors.day && <p className="text-red-500">{errors.day.message}</p>}

                    {exercises.map((exercise) => {
                        const isSelected = selectedExercises.has(exercise._id);
                        return (
                            <div
                                key={exercise._id}
                                className="flex justify-between items-center min-h-[110px] p-2 border border-gray-300 rounded-md"
                            >
                                <div className="flex items-center w-1/2 justify-between">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleSelect(exercise._id)}
                                        className="scaled-input h-6 w-6 border border-gray-300 rounded-md shadow-sm mt-1"
                                    />
                                    <p className="text-gray-700 w-full text-center">{exercise.name}</p>
                                </div>

                                <div
                                    className={`flex flex-wrap gap-2 w-full h-full duration-500 ${!isSelected ? "max-w-0" : "max-w-full"}`}
                                >
                                    <div className="w-[calc(100%/2-5px)] h-1/2">
                                        <input
                                            type="number"
                                            disabled={!isSelected}
                                            placeholder="Sets"
                                            {...register(`sets-${exercise._id}`, {
                                                valueAsNumber: true,
                                                required: isSelected && "Please enter sets.",
                                            })}
                                            className={`${!isSelected ? "shadow-none" : "shadow-lg"} w-full h-1/2 border-gray-300 focus:border-gray-100 focus-visible:outline-none rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary`}
                                            aria-label={`Sets for ${exercise.name}`}
                                        />
                                        {errors[`sets-${exercise._id}`] && (
                                            <p className={`w-full h-1/2 text-red-500 text-[10px] ${isSelected?" block ":" hidden "}`}>{errors[`sets-${exercise._id}`]?.message}</p>
                                        )}
                                    </div>

                                    <div className="w-[calc(100%/2-5px)] h-1/2">
                                        <input
                                            type="number"
                                            disabled={!isSelected}
                                            placeholder="Reps"
                                            {...register(`reps-${exercise._id}`, {
                                                valueAsNumber: true,
                                                required: isSelected && "Please enter reps.",
                                            })}
                                            className={`${!isSelected ? "shadow-none" : "shadow-lg"} w-full h-1/2 border-gray-300 focus:border-gray-100 focus-visible:outline-none rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary`}
                                            aria-label={`Reps for ${exercise.name}`}
                                        />
                                        {errors[`reps-${exercise._id}`] && (
                                            <p className={`w-full h-1/2 text-red-500 text-[10px] ${isSelected?"block":"hidden"}`}>{errors[`reps-${exercise._id}`]?.message}</p>
                                        )}
                                    </div>

                                    <div className="w-[calc(100%/2-5px)] h-1/2">
                                        <input
                                            type="number"
                                            disabled={!isSelected}
                                            placeholder="Rest Duration"
                                            {...register(`restDuration-${exercise._id}`, {
                                                valueAsNumber: true,
                                                required: isSelected && "Please enter rest duration.",
                                            })}
                                            className={`${!isSelected ? "shadow-none" : "shadow-lg"} w-full h-1/2 border-gray-300 focus:border-gray-100 focus-visible:outline-none rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary`}
                                            aria-label={`Rest Duration for ${exercise.name}`}
                                        />
                                        {errors[`restDuration-${exercise._id}`] && (
                                            <p className={`w-full h-1/2 text-red-500 text-[10px] ${isSelected?"block":"hidden"}`}>{errors[`restDuration-${exercise._id}`]?.message}</p>
                                        )}
                                    </div>

                                    <div className="w-[calc(100%/2-5px)] h-1/2">
                                        <input
                                            type="text"
                                            disabled={!isSelected}
                                            placeholder="Note"
                                            {...register(`note-${exercise._id}`)}
                                            className={`${!isSelected ? "shadow-none" : "shadow-lg"} w-full h-1/2 border-gray-300 focus:border-gray-100 focus-visible:outline-none rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary`}
                                            aria-label={`Note for ${exercise.name}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {error && <p className="text-red-500">{error}</p>}

                    <button
                        disabled={selectedExercises.size === 0}
                        type="submit"
                        className={`bg-blue-500 ${selectedExercises.size === 0 ? "cursor-not-allowed opacity-50" : ""} flex justify-center items-center text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4`}
                    >
                        {loading ? "Adding..." : "Add Exercises"}
                    </button>
                </form>
            )}
        </div>
    );
}

export default ExerciseModal;
