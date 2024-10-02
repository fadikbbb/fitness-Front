import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoFilterOutline } from "react-icons/io5";
import useFoodsFetching from "../../../hooks/foods/useFoodsFetching";

function FoodModal({ onClose, onAdd, addError }) {
    const [page, setPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedFoods, setSelectedFoods] = useState(new Set());

    const { register, handleSubmit,
        reset, watch, formState: { errors } } = useForm({
            defaultValues: {
                search: "",
                category: "",
                limit: 5,
                selectedFoods: [],
            },
        });

    const formValues = watch();

    const { foods, loading, error } = useFoodsFetching({
        limit: formValues.limit,
        setPage,
        setTotalPages,
        page,
        search: formValues.search,
        category: formValues.category,
    });

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
            foodId,
            quantity: data[`quantity-${foodId}`],
        }));
        if (foodData.length > 0) {
            onAdd({
                mealName: data.nameMeal,
                foods: foodData,
            });
            reset();
            setSelectedFoods(new Set());
        }
    };

    const foodCategories = [
        "Fruit", "Meat", "Nuts", "Fish", "Grain", "Dairy", "Snack", "Vegetable"
    ];

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages > 0 ? totalPages : 1);
        }
    }, [totalPages, page]);

    const handlePageChange = (newPage) => setPage(newPage);

    return (
        <div className=" fixed  z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white overflow-auto p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative max-h-screen ">
                <h1 className="text-3xl text-center my-2 font-bold text-text">Add Meal to Nutrition Plan</h1>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    aria-label="Close Modal"
                >
                    <span className="text-3xl hover:text-red-500">&times;</span>
                </button>

                <div className="flex flex-row sm:space-y-0 items-center justify-between mb-4">
                    <input
                        type="text"
                        className="h-fit p-2 border rounded-md w-[100%] shadow focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Search by name"
                        {...register("search")}
                    />
                </div>

                <div
                    className={`items-start  flex flex-col md:flex-row bg-white rounded-md 
      transition-all duration-500 ease-in-out
      ${isOpen
                            ? "md:min-w-full md:max-w-full md:h-fit max-h-full"
                            : "max-h-[60px] w-full md:min-w-[90px] md:max-w-[92px]"
                        }`}
                >
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-4 min-h-[55px] text-left overflow-hidden
             rounded-b-md w-full  md:min-w-[100px] md:w-fit transition-all duration-300
              ease-in-out focus:outline-none"
                    >
                        <div className="flex justify-between items-center">
                            <div className=" min-h-full w-full  flex items-center justify-between space-x-2">
                                <span>Filters</span>
                                <IoFilterOutline className="w-4 h-4" />
                            </div>
                        </div>
                    </button>
                    <div
                        className={`w-full  overflow-hidden rounded-md transition-all duration-500 ease-in-out ${isOpen ? "max-h-[300px]" : "max-h-0"
                            }`}
                    >
                        <form
                            className={`space-y-4 p-4 flex flex-col md:flex-row
                 md:p-2 md:space-y-0 md:space-x-2 justify-between
                  transition-opacity duration-300 ease-in-out`}
                        >
                            <select
                                {...register("category")}
                                className="w-full md:w-[calc(100%/2 - 5px)] p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="" disabled selected>Select a category</option>
                                {foodCategories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                                <option value="">All</option>
                            </select>

                            <select
                                {...register("limit")}
                                className="w-full md:w-[calc(100%/2 - 5px)] p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </form>
                    </div>
                </div>

                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Meal Name"
                        {...register("nameMeal", { required: "Meal name is required" })}
                        className="h-fit p-2 border rounded-md w-[100%] shadow focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.nameMeal && <p className="text-red-500">{errors.nameMeal.message}</p>}

                    <div className="mt-4">
                        {loading ? (
                            <p>Loading...</p>
                        ) : foods.length === 0 ? (
                            <p>No foods found</p>
                        ) : (
                            foods.map((food, i) => (

                                <div
                                    key={i}
                                    className="flex justify-between items-center  p-2 border border-gray-300 rounded-md mb-2"
                                >
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedFoods.has(food._id)
                                        }
                                        onChange={() => handleSelect(food._id)}
                                        className="scaled-input  h-6 w-6 border border-gray-300 rounded-md shadow-sm mt-1"
                                    />
                                    <div className="w-full">
                                        <p className="text-gray-700">{food.name}</p>
                                        <p className="text-gray-400">{food.calories} calories</p>
                                    </div>
                                    <div className={`flex flex-col w-full duration-500 ${!selectedFoods.has(food._id) ? " max-w-0 " : "max-w-full "} `}>
                                        <input
                                            type="number"
                                            placeholder="Quantity"
                                            disabled={!selectedFoods.has(food._id)}
                                            {...register(`quantity-${food._id}`, {
                                                required: selectedFoods.has(food._id) ? "Quantity is required" : false,
                                                valueAsNumber: true,
                                                min: { value: selectedFoods.has(food._id) ? 1 : undefined, message: "Quantity must be at least 1" },
                                            })}
                                            className={`${!selectedFoods.has(food._id) ? "  shadow-none" : " shadow-lg"} 
                                         w-full h-8  border-gray-300 focus:border-gray-100 focus-visible:outline-none 
                                         rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary`}
                                        />
                                        {errors[`quantity-${food._id}`] && (
                                            <p className={` text-xs min-w-full text- ${!selectedFoods.has(food._id) ? "   h-0" : " h-full"} duration-300 h-0 overflow-hidden transition duration-600 text-red-500 `}>
                                                {errors[`quantity-${food._id}`]?.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                        {addError && <p className="text-red-500 ">{addError}</p>}
                    </div>

                    <button
                        type="submit"
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4 ${selectedFoods.size === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={selectedFoods.size === 0}
                    >
                        Add Meal
                    </button>

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
                            disabled={page === totalPages || foods.length === 0}
                            className={`px-4 py-2 border rounded-md ml-2 ${page === totalPages ? "cursor-not-allowed opacity-50" : "bg-button hover:bg-buttonHover text-white"}`}
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
