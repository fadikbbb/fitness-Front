import { Filter } from '../filter';
import { Pagination } from '../pagination';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFoodsFetching from "../../../hooks/foods/useFoodsFetching";
import { useSelector } from 'react-redux'
function FoodModal({ onClose, onAdd, addError }) {
    const [page, setPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedFoods, setSelectedFoods] = useState(new Set());

    const { register, handleSubmit,
        setError,
        reset, watch, formState: { errors } } = useForm({
            defaultValues: {
                search: "",
                category: "",
                limit: 5,
                selectedFoods: [],
            },
        });

    const formValues = watch();

    const { foods, foodFetchingLoading, foodFetchingError } = useFoodsFetching({
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

    const foodCategories = useSelector((state) => state.food.foodCategories);

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
    
      const handlePageChange = (newPage) => setPage(newPage);
    

    return (
        <div className=" fixed  z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white overflow-auto p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative max-h-screen ">
                <h1 className="text-3xl text-center my-2 font-bold text-text">Add Meal to Nutrition Plan</h1>
                <div className="flex flex-row sm:space-y-0 items-center justify-between mb-4">
                    <input
                        type="text"
                        className="h-fit p-2 border rounded-md w-[100%] shadow focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Search by name"
                        {...register("search")}
                    />
                </div>

                <Filter isOpen={isOpen} setIsOpen={setIsOpen} register={register} categories={foodCategories} />

                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Meal Name"
                        {...register("nameMeal", { required: "Meal name is required" })}
                        className="h-fit p-2 border rounded-md w-[100%] shadow focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.nameMeal && <p className="text-red-500">{errors.nameMeal.message}</p>}

                    <div className="mt-4">
                        {foodFetchingLoading ? (
                            <p>Loading...</p>
                        ) : foods.length === 0 ? (
                            <p>No foods found</p>
                        ) : (
                            foods.map((food, i) => {
                                const isSelected = selectedFoods.has(food._id)
                                return (


                                    <label
                                        key={i}
                                        className="relative z-10 bg-transparent  cursor-pointer flex justify-between items-center  p-2 border border-gray-300 rounded-md mb-2"
                                    >
                                        <div className={`layer -z-10 bg-background absolute right-0 top-0 w-full h-full duration-300 ${isSelected ? "max-w-full" : "max-w-0"}`}></div>
                                        <input
                                            type="checkbox"
                                            checked={
                                                isSelected
                                            }
                                            onChange={() => handleSelect(food._id)}
                                            className="hidden"
                                        />
                                        <div className="w-full selection:bg-transparent">
                                            <p className="text-gray-700">{food.name}</p>
                                            <p className="text-gray-400">{food.calories} calories</p>
                                        </div>
                                        <div className={`flex flex-col w-full duration-500 ${!isSelected ? " max-w-0 " : "max-w-full "} `}>
                                            <input
                                                type="number"
                                                placeholder="Quantity (g)"
                                                disabled={!isSelected}
                                                {...register(`quantity-${food._id}`, {
                                                    required: isSelected ? "Quantity is required" : false,
                                                    valueAsNumber: true,
                                                    min: { value: isSelected ? 1 : undefined, message: "Quantity must be at least 1" },
                                                })}
                                                className={`${!isSelected ? "shadow-none" : " shadow-lg"} 
                                                    w-full h-8  border-gray-300 focus:border-gray-100 focus-visible:outline-none 
                                                    rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary`}
                                            />
                                            {errors[`quantity-${food._id}`] && (
                                                <p className={` text-xs min-w-full text- ${!isSelected ? "   h-0" : " h-full"} duration-300 h-0 overflow-hidden transition duration-600 text-red-500 `}>
                                                    {errors[`quantity-${food._id}`]?.message}
                                                </p>
                                            )}
                                        </div>
                                    </label>
                                )
                            })
                        )}
                        {foodFetchingError && <p className="text-red-500">{foodFetchingError}</p>}
                        {addError && <p className="text-red-500 ">{addError}</p>}
                    </div>
                    <div className="flex gap-2 items-center my-4">
                        <button
                            type="submit"
                            className={`w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300  ${selectedFoods.size === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={selectedFoods.size === 0}
                        >
                            Add Meal
                        </button>
                        <button
                            type="button"
                            className="w-fit h-fit inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500  "
                            onClick={() => {
                                setError("");
                                onClose();
                            }}
                        >
                            Close
                        </button>
                    </div>
                </form>
                <Pagination
                    items={foods}
                    handlePageChange={handlePageChange}
                    page={page}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
}

export default FoodModal;
