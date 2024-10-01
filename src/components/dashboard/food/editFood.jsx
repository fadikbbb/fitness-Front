import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import useEditFood from "../../../hooks/foods/useEditFood";
import FoodForm from "./foodForm";

function EditFood({ food, onSuccess, foodCategories }) {
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const {
    error,
    message,
    isEditing,
    formErrors,
    setFormErrors,
    setError,
    setMessage,
    editFood,
  } = useEditFood({ onSuccess, setEditFormOpen });
  const handleEditSubmit = async (data) => {
    await editFood(food._id, data);
  };

  return (
    <div>
      {isEditFormOpen && (
        <div className="bg-black bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg text-center">
            <h2 className="text-lg font-bold mb-4">Edit Food</h2>
            <FoodForm
              foodCategories={foodCategories}
              food={food}
              isEditing={isEditing}
              handleEditSubmit={handleEditSubmit}
              setEditFormOpen={setEditFormOpen}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
              setGlobalError={setError}
              setMessage={setMessage}
            />
            {message && <p className="text-green-500 mb-4">{message}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
          </div>
        </div>
      )}

      <button
        onClick={() => setEditFormOpen(true)}
        className="md:flex items-center text-blue-500 hover:text-blue-700"
        aria-label="Edit food"
      >
        <FaEdit className="w-8 h-8 sm:w-4 sm:h-4" />
        <div className="hidden md:flex">Edit</div>
      </button>
    </div>
  );
}

export default EditFood;
