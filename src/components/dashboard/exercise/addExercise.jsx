import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ExerciseForm from "./exerciseForm";
import useAddExercise from "../../../hooks/exercises/useAddExercise";

const AddExercise = ({ onAdd, categories }) => {
  const [addFormOpen, setAddFormOpen] = useState(false);

  const {
    isAdding,
    error,
    message,
    formErrors,
    handleAddSubmit,
    setError,
    setFormErrors,
    setMessage,
  } = useAddExercise(onAdd);

  return (
    <div className="w-[30%] flex justify-end items-center">
      <button
        onClick={() => setAddFormOpen(true)}
        className=" bg-button hover:bg-buttonHover text-white flex gap-2 items-center px-4 py-2 rounded-lg"
      >
        <div className="hidden md:flex">Add Exercise</div>
        <FaPlus className="w-6 h-6 sm:w-4 sm:h-4" />
      </button>
      {addFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4 text-primary">
              Add Exercise
            </h2>
            <ExerciseForm
              isAdding={isAdding}
              handleAddSubmit={handleAddSubmit}
              setAddFormOpen={setAddFormOpen}
              categories={categories}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
              setMessage={setMessage}
              setGlobalError={setError}
            />
            {message && <p className="text-green-500 mb-4">{message}</p>}
            {error && <p className="text-red-500 my-4">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddExercise;
