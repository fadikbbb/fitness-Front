import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  IoFilterOutline,
  IoAddCircleOutline,
  IoSearchOutline,
} from "react-icons/io5";
import useAddToWorkout from "../../../hooks/workoutPlans/useAddToWorkout";
import useExercisesFetching from "../../../hooks/exercises/useExercisesFetching";
import ExerciseModal from "./ExerciseModal";
import { motion, AnimatePresence } from "framer-motion";

function AddExerciseToWorkoutPlan({ handleRefresh }) {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addToWorkout, error, setError } = useAddToWorkout({
    handleRefresh,
    setShowModal,
  });

  const handleAddToWorkout = async (exerciseDetails) => {
    await addToWorkout(exerciseDetails);
  };

  const { register, watch } = useForm({
    defaultValues: {
      category: "",
      search: "",
      limit: 5,
      page: 1,
      day: "Monday",
    },
  });

  const categories = useSelector((state) => state.exercise.exerciseCategories);

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
    <div className="font-sans">
      <div className="flex justify-center my-4">
        <button
          onClick={() => setShowModal(true)}
          className="w-fit flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 "
        >
          <IoAddCircleOutline className="mr-2 text-xl" />
          Add Exercise to Workout
        </button>
      </div>

      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                  Add Exercise to Workout
                </h2>
                <div className="mb-4 relative">
                  <IoSearchOutline className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search exercises..."
                    {...register("search")}
                  />
                </div>

                <div className="mb-4">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
                  >
                    <span>Filters</span>
                    <IoFilterOutline
                      className={`w-5 h-5 transform transition-transform duration-200 ${
                        isFilterOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isFilterOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 space-y-2 overflow-hidden"
                      >
                        <select
                          {...register("category")}
                          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="" disabled selected>
                            All Categories
                          </option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        <select
                          {...register("intensity")}
                          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="" disabled selected>
                            All Intensities
                          </option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                        <select
                          {...register("limit")}
                          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="5">5 per page</option>
                          <option value="10">10 per page</option>
                          <option value="15">15 per page</option>
                          <option value="20">20 per page</option>
                          <option value="50">50 per page</option>
                          <option value="100">100 per page</option>
                        </select>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      page === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-700">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      page === totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddExerciseToWorkoutPlan;
