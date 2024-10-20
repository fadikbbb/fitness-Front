import { useState } from "react";
import { useForm } from "react-hook-form";

function ExerciseModal({ onAdd, onClose, error, setError, exercises, loading }) {
    const [selectedExercises, setSelectedExercises] = useState(new Set());
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            selectedExercises: [
                {
                    sets: 0,
                    minReps: 0,
                    maxReps: 0,
                    restDuration: 0,
                    note: "",
                }
            ],
        },
    });

    const handleSelect = (exerciseId) => {
        setSelectedExercises((prev) => {
            const newSelections = new Set(prev);
            if (newSelections.has(exerciseId)) {
                newSelections.delete(exerciseId);
                errors["minReps-" + exerciseId] = undefined;
                errors["maxReps-" + exerciseId] = undefined;
                errors["sets-" + exerciseId] = undefined;
                errors["restDuration-" + exerciseId] = undefined;
                errors["note-" + exerciseId] = undefined;
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
            minReps: data[`minReps-${exerciseId}`],
            maxReps: data[`maxReps-${exerciseId}`],
            restDuration: data[`restDuration-${exerciseId}`],
            note: data[`note-${exerciseId}`],
        }));

        if (exerciseData.length > 0) {
            onAdd({
                exercises: exerciseData,
                day: data.day,
            });
        }
    };

    return (
        <div className="mt-4">
            {loading ? (
                <p>Loading...</p>
            ) : exercises.length === 0 ? (
                <p>No exercises found</p>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 h-fit">
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
                            <label
                                htmlFor={exercise._id}
                                key={exercise._id}
                                className={`relative h-full flex flex-col overflow-hidden p-2 justify-between items-center  border ${isSelected ? "border-primary shadow-md shadow-primary" : "border-gray-300"} rounded-md`}
                            >
                                <div className={`absolute left-0 top-0 z-[0] w-full transition-all duration-300 bg-background ${isSelected ? " min-h-[100%] w-full" : "min-h-0 max-h-0 "} rounded-md`}></div>
                                <input
                                    id={exercise._id}
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleSelect(exercise._id)}
                                    className="hidden"
                                />
                                <p className="text-gray-700 w-full text-center z-10">{exercise.name}</p>
                                <div className={`${!isSelected ? "max-h-0" : "max-h-[130px] p-2"} overflow-hidden  w-full  duration-300`}>
                                    <div className={`flex  gap-2 w-full  h-full transition-all duration-300 `}>
                                        {['sets', 'minReps', 'maxReps'].map((field) => (
                                            <div key={field} className={`w-full`}>
                                                <input
                                                    type="number"
                                                    disabled={!isSelected}
                                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                                    {...register(`${field}-${exercise._id}`, {
                                                        valueAsNumber: true,
                                                        required: isSelected && `Please enter ${field}.`,
                                                        min: {
                                                            value: isSelected ? 1 : undefined,
                                                            message: `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least 1`,
                                                        },
                                                        max: {
                                                            value: field === "sets" ? 20 : 200,
                                                            message: field === "sets"
                                                                ? "Sets must be less than 20"
                                                                : "Reps must be less than 200",
                                                        },
                                                    })}
                                                    className={`z-10 relative py-4 ${!isSelected ? "shadow-none" : "shadow-lg border-2"} ${errors[`${field}-${exercise._id}`] ? "border-red-500" : "border-gray-300"} text-xs w-full h-1/2 rounded-md`}
                                                    aria-label={`${field.charAt(0).toUpperCase() + field.slice(1)} for ${exercise.name}`}
                                                />
                                                {errors[`${field}-${exercise._id}`] && (
                                                    <p className={`text-red-500 text-[10px] relative z-10`}>{errors[`${field}-${exercise._id}`]?.message}</p>
                                                )}
                                            </div>
                                        ))}

                                    </div>
                                    <div className="flex gap-2 w-full h-full">
                                        <div className="w-1/2 h-full">
                                            <input
                                                type="number"
                                                disabled={!isSelected}
                                                placeholder="restDuration"
                                                {...register(`restDuration-${exercise._id}`, {
                                                    valueAsNumber: true,
                                                    required: isSelected && `Please enter restDuration.`,
                                                    min: {
                                                        value: isSelected ? 1 : undefined,
                                                        message: `restDuration must be at least 1`,
                                                    },
                                                })}
                                                className={`z-10 relative p-2  text-xs w-full h-1/2 rounded-md ${!isSelected ? "shadow-none" : "border-gray-300 focus:border-gray-100 focus-visible:outline-none focus:outline-none focus:ring-2 focus:ring-primary shadow-lg border-2"}`}
                                                aria-label={`restDuration for ${exercise.name}`}
                                            />
                                            {errors[`restDuration-${exercise._id}`] && (
                                                <p className={`text-red-500 text-[10px] relative z-10`}>{errors[`restDuration-${exercise._id}`]?.message}</p>
                                            )}
                                        </div>
                                        <div className="w-1/2 h-full">
                                            <input
                                                type="text"
                                                disabled={!isSelected}
                                                placeholder="Note"
                                                {...register(`note-${exercise._id}`)}
                                                className={`z-10 relative p-2  text-xs w-full h-1/2 rounded-md ${!isSelected ? "shadow-none" : "border-gray-300 focus:border-gray-100 focus-visible:outline-none focus:outline-none focus:ring-2 focus:ring-primary shadow-lg border-2"}`}
                                                aria-label={`Note for ${exercise.name}`}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </label>
                        );
                    })}

                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex gap-x-6 items-center">
                        <button
                            disabled={selectedExercises.size === 0}
                            type="submit"
                            className={`bg-blue-500 ${selectedExercises.size === 0 ? "cursor-not-allowed opacity-50" : ""} flex justify-center items-center text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full`}
                        >
                            {loading ? "Adding..." : "Add Exercises"}
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500  "
                            onClick={() => {
                                setError(null);
                                onClose();
                            }}
                        >
                            Close
                        </button>

                    </div>
                </form>
            )}
        </div>
    );
}

export default ExerciseModal;
