import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../../utils/axiosConfig";
import AddExercise from "./addExercise";
import ExerciseCard from "./exerciseCard";
import { IoFilterOutline } from "react-icons/io5";

function ExerciseBody() {
  const [exercises, setExercises] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Initialize React Hook Form
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      search: "",
      category: "",
      limit: 5,
    },
  });

  const formValues = watch();

  const fetchExercises = async () => {
    setLoading(true);
    try {
      const response = await apiClient(
        `/exercises?page=${page}&limit=${formValues.limit}${
          formValues.search ? `&search=${formValues.search}` : ""
        }${formValues.category ? `&category=${formValues.category}` : ""}${
          formValues.intensity ? `&intensity=${formValues.intensity}` : ""
        }`
      );
console.log(response.data)
      setExercises(response.data.exercises);
      setTotalPages(Math.ceil(response.data.totalExercises / formValues.limit));
      if (response.data.exercises.length === 0) {
        setTotalPages(1);
        setPage(1);
      }
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch exercises");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchExercises();
  }, [page,formValues.limit,formValues.search,formValues.category,formValues.intensity,]);

  const handlePageChange = (newPage) => setPage(newPage);


  const handleRefresh = () => {
    fetchExercises();
  };
  const categories = [
    "strength",
    "cardio",
    "flexibility",
    "balance",
    "endurance",
    "team_sports",
    "combat_sports",
    "agility",
    "recreational",
  ];
  return (
    <main className="w-full p-4 flex flex-col justify-between h-full">
      <div className="w-full flex-col">
        <div className="flex flex-row  sm:space-y-0 items-center justify-between mb-4">
          <input
            type="text"
            className="h-fit p-2 border rounded-md  w-[70%] shadow focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search by name"
            {...register("search")}
          />

          <AddExercise categories={categories} onAdd={handleRefresh} />
        </div>

        <div
          className={`items-center flex flex-col md:flex-row bg-white rounded-md 
      transition-all duration-500 ease-in-out
      ${
        isOpen
          ? "md:min-w-full md:max-w-full md:h-fit max-h-full"
          : "max-h-[55px] w-full md:min-w-[90px] md:max-w-[92px]"
      }`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-4 min-h-[55px] text-left overflow-hidden
             rounded-b-md  w-full md:w-fit transition-all duration-300
              ease-in-out focus:outline-none"
          >
            <div className="flex justify-between items-center">
              <div className="min-h-full sm:w-[100px] w-full  flex items-center justify-between space-x-2">
                <span>Filters</span>
                <IoFilterOutline className="w-4 h-4" />
              </div>
            </div>
          </button>

          <div
            className={`h-full w-full transition-all duration-500 ease-in-out overflow-hidden  rounded-md ${
              isOpen ? " w-full h-fit" : "h-0 md:h-full md:w-0 "
            }`}
          >
            <form
              className={`space-y-4 flex transition-all duration-500 ease-in-out flex-col md:flex-row md:p-2  md:space-y-0 md:space-x-2 justify-between ${
                isOpen ? "max-h-full" : "max-h-0"
              }`}
            >
              {/* Category Dropdown */}
              <select
                {...register("category")}
                className="w-full md:w-[calc(100%/3 -5px)] p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="" disabled selected>
                  Select category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value="">All</option>
              </select>

              {/* Intensity Dropdown */}
              <select
                {...register("intensity")}
                className="w-full md:w-[calc(100%/3 -5px)] p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="" disabled selected>
                  Select intensity
                </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="">All</option>
              </select>

              {/* Limit Dropdown */}
              <select
                {...register("limit")}
                className="w-full md:w-[calc(100%/3 -5px)] p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="" selected disabled>
                  Select limit
                </option>
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
      </div>

      {/* Error message */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Loading state */}
      {loading ? (
        <div className="text-center">Loading exercises...</div>
      ) : (
        <>
          <div className="my-4 flex justify-around flex-wrap">
            {exercises.length > 0 ? (
              exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise._id}
                  categories={categories}
                  exercise={exercise}
                  onDelete={handleRefresh}
                  onEdit={handleRefresh}
                />
              ))
            ) : (
              <div className="text-center text-gray-600">
                No exercises found
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 border rounded-md mr-2 ${
                page === 1
                  ? "cursor-not-allowed opacity-50"
                  : "bg-button hover:bg-buttonHover text-white"
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages || exercises.length === 0}
              className={`px-4 py-2 border rounded-md ml-2 ${
                page === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : "bg-button hover:bg-buttonHover text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default ExerciseBody;
