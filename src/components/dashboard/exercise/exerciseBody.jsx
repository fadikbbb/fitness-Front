import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import AddExercise from "./addExercise";
import ExerciseCard from "./exerciseCard";
import useExercisesFetching from "../../../hooks/exercises/useExercisesFetching";
import SkeletonBody from "../../loading/skeletonBody"; // Import the SkeletonLoader
import { Filter } from "../filter";
import { Pagination } from '../pagination';

function ExerciseBody() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [changes, setChanges] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const categories = useSelector((state) => state.exercise.exerciseCategories);

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

  const { exercises, exercisesLoading, exercisesFetchingError } =
    useExercisesFetching({
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

  // Memoize the handleRefresh function
  const handleRefresh = useCallback(() => {
    setChanges((prevChanges) => !prevChanges);
  }, []);

  useEffect(() => {
    if (page > totalPages) {
      if (totalPages > 0) {
        setPage(totalPages);
        handleRefresh();
      } else {
        setPage(1);
        setTotalPages(1);
      }
    }
  }, [totalPages, page, handleRefresh]);

  const handlePageChange = (newPage) => setPage(newPage);

  return (
    <main className="w-full flex flex-col justify-between h-full">
      {exercisesLoading ? (
        <SkeletonBody /> // Use the SkeletonLoader here
      ) : (
        <>
          <div className="w-full flex-col">
            <div className="flex flex-row sm:space-y-0 items-center justify-between mb-4">
              <input
                type="text"
                className="h-fit p-2 border rounded-md w-[70%] shadow focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Search by name"
                {...register("search")}
              />
              <AddExercise categories={categories} onAdd={handleRefresh} />
            </div>

            <Filter
              isExercise={true}
              register={register}
              categories={categories}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>
          <>
            <div className="my-4 flex justify-around flex-wrap gap-4">
              {exercises.length > 0 ? (
                exercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise._id}
                    categories={categories}
                    exercise={exercise}
                    handleRefresh={handleRefresh}
                  />
                ))
              ) : (
                <div className="text-center text-gray-600">
                  No exercises found
                </div>
              )}
            </div>

            <Pagination
              items={exercises}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
          </>
        </>
      )}
      {exercisesFetchingError && (
        <div className="text-red-500 text-center mb-4">
          {exercisesFetchingError}
        </div>
      )}
    </main>
  );
}

export default ExerciseBody;
