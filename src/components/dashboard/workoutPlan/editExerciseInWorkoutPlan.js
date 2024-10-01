import React, { useState } from "react";
import useEditExercise from "../../../hooks/workoutPlans/useEditExercise";
import { useForm } from "react-hook-form";

function EditExerciseInWorkoutPlan({ exercise, day, planId }) {
    const [isOpen, setIsOpen] = useState(false);
    const { editExercise, loading, error } = useEditExercise(setIsOpen);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            sets: exercise.sets || 0,
            reps: exercise.reps || 0,
            restDuration: exercise.restDuration || 0,
            note: exercise.note || "",
        },
    });

    const onSubmit = async (editForm) => {
        await editExercise(planId, exercise.exerciseId._id, day, editForm);
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)} className="text-xl font-semibold mb-4">Edit</button>
            {isOpen && (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <label className="block mb-2">
                        Sets:
                        <input
                            type="number"
                            {...register("sets", { required: true, min: 0 })}
                            className="border p-1 w-full"
                        />
                    </label>
                    <label className="block mb-4">
                        Reps:
                        <input
                            type="number"
                            {...register("reps", { required: true, min: 0 })}
                            className="border p-1 w-full"
                        />
                    </label>
                    <label className="block mb-4">
                        Rest Duration:
                        <input
                            type="number"
                            {...register("restDuration", { required: true, min: 0 })}
                            className="border p-1 w-full"
                        />
                    </label>
                    <label className="block mb-4">
                        Note:
                        <input
                            type="text"
                            {...register("note")}
                            className="border p-1 w-full"
                        />
                    </label>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                    {error && <p className="text-red-500">{error.message}</p>}
                </form>
            )}
        </div>
    );
}

export default EditExerciseInWorkoutPlan;
