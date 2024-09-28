import React, { useState } from "react";
import useFoodFetching from "../../../hooks/useFoodFetching";
import useExtractColor from "../../../hooks/useExtractColor";
function SingleFoodBody() {
  const [isOpen, setIsOpen] = useState(false);
  const { foodData, isLoading, error } = useFoodFetching();

  const {
    colors,
    loading,
    error: colorError,
  } = useExtractColor(foodData?.image);
  console.log(colors);

  const toggleDetails = () => {
    setIsOpen((prevState) => !prevState);
  };

  if (isLoading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div className="w-full h-full flex items-center flex-col justify-center p-4 rounded-lg">
      {error && (
        <p className="text-center text-lg text-red-500">Error: {error}</p>
      )}
      <div
        onClick={toggleDetails}
        className="relative flex justify-center items-center w-full min-h-fit cursor-pointer"
      >
        <h1 className="absolute z-30 text-2xl font-semibold text-center text-gray-800 mt-4">
          {foodData.name}
        </h1>
        {foodData.image && (
          <img
            src={foodData.image}
            alt={foodData.name}
            className="w-1/3 rounded-full z-20"
          />
        )}

        {/* {isOpen && (
          <> */}
        {[
          { label: "Category", value: foodData.category },
          { label: "Serving Size", value: foodData.servingSize },
          { label: "Fat", value: `${foodData.fat}g` },
          { label: "Protein", value: `${foodData.protein}g` },
          { label: "Carbohydrates", value: `${foodData.carbohydrates}g` },
          { label: "Fiber", value: `${foodData.fiber}g` },
          { label: "Calories", value: foodData.calories },
        ].map((detail, index) => (
          <div
            key={index}
            className={`absolute w-full  h-full  lg:w-[calc(33%+350px)] text-end text-lg text-gray-700 animate-detail ${
              isOpen ? "animate-leave-rotate" : "animate-enter-rotate"
            }`}
            style={{
              "--angle": `${45 * index}deg`,
            }}
          >
            <span className="font-semibold">{detail.label}:</span>{" "}
            {detail.value}
          </div>
        ))}
        {/* </>
        )} */}
      </div>
    </div>
  );
}

export default SingleFoodBody;
