import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  IoAddCircleOutline,
  IoSearchOutline,
} from "react-icons/io5";
import useAddToWorkout from "../../../hooks/workoutPlans/useAddToWorkout";
import useExercisesFetching from "../../../hooks/exercises/useExercisesFetching";
import ExerciseModal from "./ExerciseModal";
import { Filter } from "../filter";
import { Pagination } from "../pagination";

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

                <Filter
                  isExercise={true}
                register={register}
                  categories={categories}
                  setIsOpen={setIsOpen}
                  isOpen={isOpen}
                />

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

                <Pagination
                  handlePageChange={handlePageChange}
                  page={page}
                  totalPages={totalPages}
                  items={exercises}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddExerciseToWorkoutPlan;
