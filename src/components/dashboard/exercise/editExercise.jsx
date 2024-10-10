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
        <div className="fixed  inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white overflow-auto max-h-screen p-6 rounded shadow-lg max-w-sm text-center">
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
        className="md:flex items-center p-2 text-white rounded-lg bg-blue-500 hover:bg-blue-700"
      >
        <FaEdit className="w-4 h-4 md:hidden flex" />
        <div className="hidden md:flex">Edit</div>
      </button>
    </div>
  );
}

export default EditExercise;
