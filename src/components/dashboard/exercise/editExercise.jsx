import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import useEditExercise from "../../../hooks/exercises/useEditExercise";
import ExerciseForm from "./exerciseForm";

function EditExercise({ categories, exercise, onSuccess }) {
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const {
    error,
    message,
    isEditing,
    formErrors,
    setFormErrors,
    setError,
    setMessage,
    editExercise,
  } = useEditExercise({setEditFormOpen, onSuccess});

  const handleEditSubmit = async (data) => {
    await editExercise(exercise._id, data);
  };

  return (
    <div>
      {isEditFormOpen && (
        <div className="bg-black bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg text-center">
            <h2 className="text-lg font-bold mb-4">Edit Exercise</h2>
            <ExerciseForm
              isEditing={isEditing}
              handleEditSubmit={handleEditSubmit}
              categories={categories}
              setEditFormOpen={setEditFormOpen}
              exercise={exercise}
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
      >
        <FaEdit className="w-8 h-8 sm:w-4 sm:h-4" />
        <div className="hidden md:flex">Edit</div>
      </button>
    </div>
  );
}

export default EditExercise;
