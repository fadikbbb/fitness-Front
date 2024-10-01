import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AddExercise from "./addExercise";
import ExerciseCard from "./exerciseCard";
import useExercisesFetching from "../../../hooks/exercises/useExercisesFetching";
import { IoFilterOutline } from "react-icons/io5";

function ExerciseBody() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [changes, setChanges] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Initialize React Hook Form
  const { register, watch } = useForm({
    defaultValues: {
      search: "",
      category: "",
      limit: 5,
      intensity: "",
    },
  });

  const formValues = watch();

  const { exercises, loading, error } = useExercisesFetching({
    limit: formValues.limit,
    setPage,
    search: formValues.search,
    category: formValues.category,
    intensity: formValues.intensity,
    page,
    setTotalPages,
    changes,
    setChanges,
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

  const handleRefresh = () => {
    setChanges(!changes);
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
          className={`items-start  flex flex-col md:flex-row bg-white rounded-md 
      transition-all duration-500 ease-in-out
      ${
        isOpen
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
            className={`w-full  overflow-hidden rounded-md transition-all duration-500 ease-in-out ${
              isOpen ? "max-h-[300px]" : "max-h-0"
            }`}
          >
            <form
              className={`space-y-4 p-4 flex flex-col md:flex-row
                 md:p-2 md:space-y-0 md:space-x-2 justify-between
                  transition-opacity duration-300 ease-in-out`}
            >
              <select
                {...register("category")}
                defaultValue=""
                className="w-full md:w-[calc(100%/3 -5px)] p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value="">All</option>
              </select>
              <select
                {...register("intensity")}
                defaultValue=""
                className="w-full md:w-[calc(100%/3 -5px)] p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="" disabled>
                  Select intensity
                </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="">All</option>
              </select>

              <select
                {...register("limit")}
                defaultValue="5"
                className="w-full md:w-[calc(100%/3 -5px)] p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="" disabled>
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
