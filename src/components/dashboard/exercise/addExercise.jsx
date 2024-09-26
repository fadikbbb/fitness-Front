import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import apiClient from "../../../utils/axiosConfig";
import { addExercise } from "../../../store/exerciseSlice";
import ExerciseForm from "./exerciseForm";
const AddExercise = ({ onAdd, categories }) => {
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  
  const handleAddSubmit = async (data) => {
    try {
      setIsAdding(true);
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("restDuration", data.restDuration);
      formData.append("intensity", data.intensity);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      if (data.video && data.video[0]) {
        formData.append("video", data.video[0]);
      }

      // Correct logging of FormData
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      setError(null);
      const response = await apiClient.post("/exercises", formData);
      dispatch(addExercise(response.data.exercise));
      setMessage(response.data.message);

      setTimeout(() => {
        setFormErrors({});
        setAddFormOpen(false);
        setMessage(null);
      }, 1000);

      onAdd();
    } catch (error) {
      setMessage(null);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.response && error.response.data.errors) {
        setFormErrors(error.response?.data?.errors);
      } else {
        setError(error.message);
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="w-[30%] flex justify-end items-center">
      <button
        onClick={() => setAddFormOpen(true)}
        className=" bg-button hover:bg-buttonHover text-white flex gap-2 items-center px-4 py-2 rounded-lg"
      >
        <FaPlus /> <div className="hidden md:flex">Add Exercise</div>
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
