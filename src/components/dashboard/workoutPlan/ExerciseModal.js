import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useExercisesFetching from "../../../hooks/exercises/useExercisesFetching";
import { IoFilterOutline } from "react-icons/io5";

function ExerciseModal({ onClose, onAdd }) {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedExercises, setSelectedExercises] = useState(new Set());

    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            selectedExercises: [],
            category: "",
            search: "",
            limit: 5,
            page: 1,
        },
    });

    const formValues = watch();

    const { exercises, loading } = useExercisesFetching({
        limit: formValues.limit,
        setPage,
        search: formValues.search,
        category: formValues.category,
        intensity: formValues.intensity,
        page,
        setTotalPages,
    });

    const handlePageChange = (newPage) => setPage(newPage);
    useEffect(() => {
        if (page > totalPages) {
            if (totalPages > 0) {
                setPage(totalPages);
            } else {
                setPage(1);
                setTotalPages(1);
            }
        }
    }, [totalPages, page]);

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
        console.log(data);
        const exerciseData = Array.from(selectedExercises).map((exerciseId) => ({
            exerciseId: exerciseId,
            sets: data[`sets-${exerciseId}`] || 12,
            reps: data[`reps-${exerciseId}`] || 3,
            restDuration: data[`restDuration-${exerciseId}`] || 60,
            note: data[`note-${exerciseId}`] || "",
        }));

        if (exerciseData.length > 0) {
            onAdd({
                exercises: exerciseData,
                day: data.day,
            });
            onClose();
            reset();
            setSelectedExercises(new Set());
        }
    };

    const categories = [
        "strength", "cardio", "flexibility", "balance", "endurance",
        "team_sports", "combat_sports", "agility", "recreational",
    ];

    return (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
                <h1 className="text-3xl font-bold mb-4">Add Exercise for Workout Plan</h1>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    <span className="text-lg">&times;</span>
                </button>
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        className="h-fit p-2 border rounded-md w-full shadow focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Search by name"
                        {...register("search")}
                    />
                </div>
                <div
                    className={`flex flex-col md:flex-row bg-white rounded-md transition-all duration-500 ease-in-out
                        ${isOpen ? "max-h-full" : "max-h-[60px]"}`}
                >
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-4 min-h-[55px] text-left rounded-b-md w-full flex justify-between items-center transition-all duration-300 ease-in-out focus:outline-none"
                    >
                        <span>Filters</span>
                        <IoFilterOutline className="w-4 h-4" />
                    </button>
                    <div
                        className={`w-full overflow-hidden rounded-md transition-all duration-500 ease-in-out ${isOpen ? "max-h-[300px]" : "max-h-0"}`}
                    >
                        <form className="space-y-4 p-4 flex flex-col md:flex-row md:p-2 md:space-y-0 md:space-x-2 justify-between">
                            <select
                                {...register("category")}
                                defaultValue=""
                                className="w-full md:w-[calc(100%/3 - 5px)] p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="" disabled>Select category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                                <option value="">All</option>
                            </select>
                            <select
                                {...register("intensity")}
                                defaultValue=""
                                className="w-full md:w-[calc(100%/3 - 5px)] p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="" disabled>Select intensity</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="">All</option>
                            </select>
                            <select
                                {...register("limit")}
                                defaultValue="5"
                                className="w-full md:w-[calc(100%/3 - 5px)] p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="" disabled>Select limit</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </form>
                    </div>
                </div>
                <div className="mt-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : exercises.length === 0 ? (
                        <p>No exercises found</p>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {exercises.map((exercise) => (
                                <div key={exercise._id} className="flex justify-between items-center p-2 border border-gray-300 rounded-md mb-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedExercises.has(exercise._id)}
                                        onChange={() => handleSelect(exercise._id)}
                                        className="border-gray-300 rounded-md shadow-sm mt-1"
                                    />
                                    <p className="text-gray-700 w-full">{exercise.name}</p>
                                    <input
                                        type="number"
                                        placeholder="Sets"
                                        {...register(`sets-${exercise._id}`, { valueAsNumber: true })}
                                        className="border-gray-300 rounded-md shadow-sm mt-1 w-1/4"
                                        aria-label={`Sets for ${exercise.name}`}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Reps"
                                        {...register(`reps-${exercise._id}`, { valueAsNumber: true })}
                                        className="border-gray-300 rounded-md shadow-sm mt-1 w-1/4"
                                        aria-label={`Reps for ${exercise.name}`}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Rest Duration"
                                        {...register(`restDuration-${exercise._id}`, { valueAsNumber: true })}
                                        className="border-gray-300 rounded-md shadow-sm mt-1 w-1/4"
                                        aria-label={`Rest Duration for ${exercise.name}`}
                                    />
                                    <input
                                        type="text"
                                        placeholder="note"
                                        {...register(`note-${exercise._id}`)}
                                        className="border-gray-300 rounded-md shadow-sm mt-1 w-1/4"
                                        aria-label={`note for ${exercise.name}`}
                                    />
                                </div>
                            ))}

                            <select
                                id="day"
                                {...register("day")}
                                className="border-gray-300 rounded-md shadow-sm mt-4 block w-full"
                                aria-label="Select day"
                            >
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                                    (day) => (
                                        <option key={day} value={day}>{day}</option>
                                    )
                                )}
                            </select>

                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
                            >
                                Add
                            </button>
                        </form>
                    )}

                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className={`px-4 py-2 border rounded-md mr-2 ${page === 1 ? "cursor-not-allowed opacity-50" : "bg-button hover:bg-buttonHover text-white"}`}
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className={`px-4 py-2 border rounded-md ml-2 ${page === totalPages ? "cursor-not-allowed opacity-50" : "bg-button hover:bg-buttonHover text-white"}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExerciseModal;
