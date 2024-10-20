import React, { useState } from "react";
import useEditExercise from "../../../hooks/workoutPlans/useEditExercise";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";

function EditExerciseInWorkoutPlan({ handleRefresh, exercise, day, planId }) {
    const [isOpen, setIsOpen] = useState(false);
    const { editExercise, loading, error } = useEditExercise({ handleRefresh, setIsOpen });
    const { register, handleSubmit } = useForm({
        defaultValues: {
            sets: exercise.sets || 0,
            minReps: exercise.minReps || 0,
            maxReps: exercise.maxReps || 0,
            restDuration: exercise.restDuration || 0,
            note: exercise.note || "",
        },
    });
    const onSubmit = async (editForm) => {
        await editExercise(planId, exercise.exerciseId._id, day, editForm);
    };
    return (
        <div>
            <button onClick={() => setIsOpen(true)} className="m-2 flex items-center text-blue-500 hover:text-blue-700">
                <FaEdit className="h-6 w-6 md:hidden" />
                <span className="md:flex hidden">edit</span>
            </button>
            {isOpen && (
                <div className="fixed z-50 inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-500 text-center">
                            Edit Exercise
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                            <label className="block mb-2">
                                Sets:
                                <input
                                    placeholder="Sets"
                                    type="number"
                                    {...register("sets", { required: true, min: 0 })}
                                    className="border p-1 w-full"
                                />
                            </label>
                            <label className="block mb-4">
                                minReps:
                                <input
                                    placeholder="minReps"
                                    type="number"
                                    {...register("minReps", { required: true, min: 0 })}
                                    className="border p-1 w-full"
                                />
                            </label>
                            <label className="block mb-4">
                                maxReps:
                                <input
                                    placeholder="maxReps"
                                    type="number"
                                    {...register("maxReps", { required: true, min: 0 })}
                                    className="border p-1 w-full"
                                />
                            </label>
                            <label className="block mb-4">
                                Rest Duration:
                                <input
                                    placeholder="Rest Duration"
                                    type="number"
                                    {...register("restDuration", { required: true, min: 0 })}
                                    className="border p-1 w-full"
                                />
                            </label>
                            <label className="block mb-4">
                                Note:
                                <textarea
                                    type="text"
                                    {...register("note")}
                                    className="border p-1 w-full"
                                    placeholder="Note"
                                />
                            </label>
                            <div className="flex justify-around">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 duration-300 text-white px-4 py-2 rounded-md"
                                    disabled={loading}
                                >
                                    {loading ? "Saving..." : "Save"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-gray-100 text-text border-[1px] duration-300 hover:bg-gray-200 px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                            {error && <p className="text-red-500">{error.message}</p>}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
export default EditExerciseInWorkoutPlan;
