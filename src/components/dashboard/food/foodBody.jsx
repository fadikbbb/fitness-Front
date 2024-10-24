import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import AddFood from "./addFood";
import FoodCard from "./foodCard";
import useFoodsFetching from "../../../hooks/foods/useFoodsFetching";
import SkeletonBody from "../../loading/skeletonBody";
import { Filter } from "../filter";
import { Pagination } from "../pagination";
function FoodBody() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [changes, setChanges] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const { register, watch } = useForm({
    defaultValues: {
      search: "",
      category: "",
      limit: 5,
    },
  });

  const formValues = watch();

  const { foods, foodFetchingLoading, foodFetchingError } = useFoodsFetching({
    limit: formValues.limit,
    search: formValues.search,
    category: formValues.category,
    setTotalPages,
    page,
    changes,
    setChanges,
  });

  const foodCategories = useSelector((state) => state.food.foodCategories);
  const handleRefresh = useCallback(() => {
    setChanges(!changes);
  }, [changes]);
  
  useEffect(() => {
    if (page > totalPages) {
      if (totalPages > 0) {
        handleRefresh();
      } else {
        setPage(1);
        setTotalPages(1);
      }
    }
  }, [totalPages, page, handleRefresh]);

  const handlePageChange = (newPage) => setPage(newPage);

  return (
    <main className="w-full  flex flex-col justify-between h-full">
      {foodFetchingLoading ? (
        <SkeletonBody />
      ) : (
        <>
          <div>
            <div className="flex flex-row  sm:space-y-0 items-center justify-between mb-4">
              <input
                type="text"
                className="h-fit p-2 border rounded-md  w-[70%] shadow focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Search by name"
                {...register("search")}
              />
              <AddFood foodCategories={foodCategories} onAdd={handleRefresh} />
            </div>

            <Filter
              categories={foodCategories}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              register={register}
            />
          </div>
          {foodFetchingError && (
            <div className="text-red-500 text-center mb-4">
              {foodFetchingError}
            </div>
          )}{" "}
          <div className="my-4 flex justify-around flex-wrap gap-4 ">
            {foods.length > 0 ? (
              foods.map((food) => (
                <FoodCard
                  key={food._id}
                  food={food}
                  handleRefresh={handleRefresh}
                />
              ))
            ) : (
              <div className="text-center text-gray-600">No food found</div>
            )}
          </div>
          <Pagination
            items={foods}
            handlePageChange={handlePageChange}
            page={page}
            totalPages={totalPages}
          />
        </>
      )}
    </main>
  );
}

export default FoodBody;
