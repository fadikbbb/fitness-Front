import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../../utils/axiosConfig";

function FoodModal({ onClose, onAdd }) {
    const [foods, setFoods] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [limit, setLimit] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFoods, setSelectedFoods] = useState(new Set());
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            selectedFoods: [],
        },
    });

    useEffect(() => {
        const fetchFoods = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get(
                    `/foods?page=${currentPage}&limit=${limit}${searchQuery ? `&search=${searchQuery}` : ""
                    }${category ? `&category=${category}` : ""}`
                );
                setFoods(response.data.foods);
                setTotalPages(Math.ceil(response.data.totalFoods / limit));
            } catch (error) {
                console.error(error.response?.data?.message || "Failed to fetch foods");
            } finally {
                setLoading(false);
            }
        };
        fetchFoods();
    }, [currentPage, limit, category, searchQuery]);

    const handleSelect = (foodId) => {
        setSelectedFoods((prev) => {
            const newSelections = new Set(prev);
            if (newSelections.has(foodId)) {
                newSelections.delete(foodId);
            } else {
                newSelections.add(foodId);
            }
            return newSelections;
        });
    };

    const onSubmit = (data) => {
        const foodData = Array.from(selectedFoods).map((foodId) => ({
            foodId: foodId,
            quantity: data[`quantity-${foodId}`] || 1,
        }));

        if (foodData.length > 0) {
            // Pass the meal structure with foods and total calories to the onAdd function
            onAdd({
                nameMeal: data.nameMeal,
                foods: foodData,
             
            });
            onClose();
            reset();
            setSelectedFoods(new Set());
        }
    };

    const categories = [
        "protein",
        "carbs",
        "fats",
        "fiber",
        "vitamins",
        "minerals",
    ];

    return (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
                <h1 className="text-3xl font-bold">Add Meal to Nutrition Plan</h1>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    <span className="text-lg">&times;</span>
                </button>
                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Meal Name"
                        {...register("nameMeal", { required: true })}
                        className="p-2 border border-gray-300 rounded-md w-full mb-2"
                        aria-label="Meal name"
                    />

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
                        placeholder="Search foods"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                        aria-label="Search foods"
                    />
                    <div className="mt-4">
                        {loading ? (
                            <p>Loading...</p>
                        ) : foods.length === 0 ? (
                            <p>No foods found</p>
                        ) : (
                            foods.map((food, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center p-2 border border-gray-300 rounded-md mb-2"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedFoods.has(food._id)}
                                        onChange={() => handleSelect(food._id)}
                                        className="border-gray-300 rounded-md shadow-sm mt-1"
                                    />
                                    <p className="text-gray-700 w-full">{food.name}</p>
                                    <input
                                        type="number"
                                        placeholder="Quantity"
                                        {...register(`quantity-${food._id}`)}
                                        className="border-gray-300 rounded-md shadow-sm mt-1 w-1/4"
                                        aria-label={`Quantity for ${food.name}`}
                                    />
                                   
                                </div>
                            ))
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
                    >
                        Add Meal
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

export default FoodModal;
