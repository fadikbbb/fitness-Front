import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import useEditExercise from "../../../hooks/exercises/useEditExercise";
import ExerciseForm from "./exerciseForm";

function EditExercise({ categories, exercise, onEdit }) {
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const {
    isEditing,
    formErrors,
    setFormErrors,
    editExercise,
    setEditExerciseError,
    editExerciseError,
    setEditExerciseMessage,
    editExerciseMessage,
  } = useEditExercise({ setEditFormOpen, onEdit });

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
              globalError={editExerciseError}
              globalMessage={editExerciseMessage}
              setGlobalMessage={setEditExerciseMessage}
              setGlobalError={setEditExerciseError}
            />
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
