import React, { useState, useEffect } from "react";
import useAddToWorkout from "../../../hooks/workoutPlans/useAddToWorkout";
import ExerciseModal from "./ExerciseModal";
import { IoFilterOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import useExercisesFetching from "../../../hooks/exercises/useExercisesFetching";

function AddExerciseToWorkoutPlan({ handleRefresh }) {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { addToWorkout, error, setError } = useAddToWorkout({
    handleRefresh,
    setShowModal,
  });

  const handleAddToWorkout = async (exerciseDetails) => {
    await addToWorkout(exerciseDetails);
  };

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      category: "",
      search: "",
      limit: 5,
      page: 1,
    },
  });

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

  const handlePageChange = (newPage) => setPage(newPage);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages > 0 ? totalPages : 1);
    }
  }, [totalPages, page]);

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

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-600 duration-300 text-white p-2 rounded-md mb-4 text-center w-full"
      >
        Add Exercise to Workout
      </button>

      {showModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white max-h-screen overflow-auto p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
            <h1 className="text-3xl font-bold mb-4 text-text text-center">
              Add Exercise for Workout Plan
            </h1>
            

            <div className="flex items-center mb-4">
              <input
                type="text"
                className="h-fit p-2 border rounded-md w-full shadow focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Search by name"
                {...register("search")}
              />
            </div>

            <div
              className={`items-start flex flex-col md:flex-row bg-white rounded-md 
      transition-all duration-500 ease-in-out ${
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
                  <span>Filters</span>
                  <IoFilterOutline className="w-4 h-4" />
                </div>
              </button>
              <div
                className={`w-full overflow-hidden rounded-md transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-[300px]" : "max-h-0"
                }`}
              >
                <form
                  onSubmit={handleSubmit(() => {})}
                  className="space-y-4 p-4 flex flex-col md:flex-row md:p-2 md:space-y-0 md:space-x-2 justify-between transition-opacity duration-300 ease-in-out"
                >
                  <select
                    {...register("category")}
                    defaultValue=""
                    className="w-full md:w-[calc(100%/3 - 5px)] p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary"
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
                    className="w-full md:w-[calc(100%/3 - 5px)] p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary"
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
                    className="w-full md:w-[calc(100%/3 - 5px)] p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-primary"
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

            <ExerciseModal
            setError={setError}
              onClose={() => setShowModal(false)}
              onAdd={handleAddToWorkout}
              error={error}
              setPage={setPage}
              setTotalPages={setTotalPages}
              page={page}
              exercises={exercises}
              loading={loading}
            />

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
                disabled={page === totalPages}
                className={`px-4 py-2 border rounded-md ml-2 ${
                  page === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : "bg-button hover:bg-buttonHover text-white"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddExerciseToWorkoutPlan;
