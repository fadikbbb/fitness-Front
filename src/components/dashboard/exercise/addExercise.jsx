import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ExerciseForm from "./exerciseForm";
import useAddExercise from "../../../hooks/exercises/useAddExercise";

const AddExercise = ({ onAdd, categories }) => {
  const [addFormOpen, setAddFormOpen] = useState(false);

  const {
    isAdding,
    addExerciseError,
    addExerciseMessage,
    formErrors,
    handleAddSubmit,
    setAddExerciseError,
    setFormErrors,
    setAddExerciseMessage,
  } = useAddExercise({ onAdd, setAddFormOpen });

  return (
    <div className="w-[30%] flex justify-end items-center">
      <button
        onClick={() => setAddFormOpen(true)}
        className=" bg-button hover:bg-buttonHover text-white flex gap-2 items-center px-4 py-2 rounded-lg"
      >
        <div className="hidden md:flex">Add Exercise</div>
        <FaPlus className="w-4 h-4 md:hidden flex" />
      </button>
      {addFormOpen && (
        <div className="fixed  inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white overflow-auto max-h-screen p-6 rounded shadow-lg max-w-sm text-center">
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
              globalError={addExerciseError}
              globalMessage={addExerciseMessage}
              setGlobalMessage={setAddExerciseMessage}
              setGlobalError={setAddExerciseError}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddExercise;
