import { useState } from "react";
import { useForm } from "react-hook-form";

function ExerciseModal({ onClose, onAdd, error, exercises, loading }) {
    const [selectedExercises, setSelectedExercises] = useState(new Set());
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            selectedExercises: [
                {
                    sets: 0,
                    reps: 0,
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
                errors["reps-" + exerciseId] = undefined;
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
            reps: data[`reps-${exerciseId}`],
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
                                className={`relative flex flex-col overflow-hidden justify-between items-center p-2 border ${isSelected ? "border-blue-300 shadow-md shadow-blue-300" : "border-gray-300"} rounded-md`}
                            >
                                <div className={`absolute left-0 top-0 z-[0] w-full transition-all duration-300 bg-blue-300 ${isSelected ? " min-h-[300px] w-full" : "min-h-0 max-h-0 "} rounded-md`}></div>
                                <input
                                    id={exercise._id}
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleSelect(exercise._id)}
                                    className="hidden"
                                />
                                <p className="text-gray-700 w-full text-center z-10">{exercise.name}</p>
                                <div className={`${!isSelected ? "max-h-0" : "max-h-[100px]"}  duration-300`}>
                                    <div className={`flex  gap-2 w-full  h-full transition-all duration-300 `}>
                                        {['sets', 'reps', 'restDuration'].map((field) => (
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
                                    <div className="w-full">
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
                            </label>
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
