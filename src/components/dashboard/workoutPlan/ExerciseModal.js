import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../../utils/axiosConfig";

function ExerciseModal({ onClose, onAdd }) {
    const [exercises, setExercises] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [limit, setLimit] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedExercises, setSelectedExercises] = useState(new Set());
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            selectedExercises: [],
        },
    });

    useEffect(() => {
        const fetchExercises = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get(
                    `/exercises?page=${currentPage}&limit=${limit}${searchQuery ? `&search=${searchQuery}` : ""}${category ? `&category=${category}` : ""}`
                );
                setExercises(response.data.exercises);
                setTotalPages(Math.ceil(response.data.totalExercises / limit));
            } catch (error) {
                console.error(error.response?.data?.message || "Failed to fetch exercises");
            } finally {
                setLoading(false);
            }
        };
        fetchExercises();
    }, [currentPage, limit, category, searchQuery]);

    const handleSelect = (exerciseId) => {
        setSelectedExercises(prev => {
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
        "team_sports", "combat_sports", "agility", "recreational"
    ];

    return (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
                <h1 className="text-3xl font-bold">Add exercise for Workout plan</h1>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    <span className="text-lg">&times;</span>
                </button>
                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setCurrentPage(1); // Reset page to 1 on category change
                        }}
                        className="p-2 border border-gray-300 rounded-md"
                        aria-label="Select category"
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>
                    <select
                        id="limit"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                        aria-label="Select max results"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search exercises"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                        aria-label="Search exercises"
                    />
                    <div className="mt-4">
                        {loading ? (
                            <p>Loading...</p>
                        ) : exercises.length === 0 ? (
                            <p>No exercises found</p>
                        ) : (
                            exercises.map((exercise, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center p-2 border border-gray-300 rounded-md mb-2"
                                >
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
                                        {...register(`sets-${exercise._id}`)}
                                        className="border-gray-300 rounded-md shadow-sm mt-1 w-1/4"
                                        aria-label={`Sets for ${exercise.name}`}
                                    />
                                    <input
                                        type="number"
                                        placeholder="restDuration"
                                        {...register(`restDuration-${exercise._id}`)}
                                        className="border-gray-300 rounded-md shadow-sm mt-1 w-1/4"
                                        aria-label={`restDuration for ${exercise.name}`}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Reps"
                                        {...register(`reps-${exercise._id}`)}
                                        className="border-gray-300 rounded-md shadow-sm mt-1 w-1/4"
                                        aria-label={`Reps for ${exercise.name}`}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                    <select
                        id="day"
                        {...register("day")}
                        className="border-gray-300 rounded-md shadow-sm mt-1 block w-full"
                        aria-label="Select day"
                    >
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
                    >
                        Add
                    </button>

                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className="bg-gray-200 text-gray-700 p-2 rounded-md"
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                        >
                            Previous
                        </button>
                        <span className="text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            type="button"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className="bg-gray-200 text-gray-700 p-2 rounded-md"
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ExerciseModal;
