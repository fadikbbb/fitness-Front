import React from "react";
import { FaPlus } from "react-icons/fa";
import FoodForm from "./foodForm";
import useAddFood from "../../../hooks/foods/useAddFood";

const AddFood = ({ onAdd, foodCategories }) => {
  const [addFormOpen, setAddFormOpen] = React.useState(false);
  const {
    isAdding,
    formErrors,
    error,
    message,
    handleAddSubmit,
    setError,
    setMessage,
  } = useAddFood(onAdd);

  const handleOpen = () => {
    setAddFormOpen(true);
    setError(null);
    setMessage(null);
  };

  return (
    <div className="w-[30%] flex justify-end items-center">
      <button
        onClick={handleOpen}
        className=" bg-button hover:bg-buttonHover text-white flex gap-2 items-center px-4 py-2 rounded-lg"
      >
        <div className="hidden md:flex"> Add food</div>
        <FaPlus className="w-6 h-6 sm:w-4 sm:h-4" />
      </button>
      {addFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4">Add food</h2>
            <FoodForm
              foodCategories={foodCategories}
              handleAddSubmit={handleAddSubmit}
              formErrors={formErrors}
              isAdding={isAdding}
              setAddFormOpen={setAddFormOpen}
              setGlobalError={setError}
              setMessage={setMessage}
            />
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFood;
