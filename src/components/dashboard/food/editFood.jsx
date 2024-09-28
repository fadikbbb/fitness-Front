import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import apiClient from "../../../utils/axiosConfig";
import FoodForm from "./foodForm";

function EditFood({ food, onSuccess, foodCategories }) {
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleEditSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "image") {
        if (data.image.length > 0) {
          formData.append(key, data.image[0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    });
    setIsEditing(true);
    try {
      const response = await apiClient.patch(`/foods/${food._id}`, formData);
      setMessage(response.data.message);
      setError(null);
      onSuccess();
      setTimeout(() => {
        setEditFormOpen(false);
      }, 2000);
    } catch (error) {
      setMessage(null);
      console.log(error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.response && error.response.data.errors) {
        setFormErrors(error.response.data.errors);
      } else {
        setError("An error occurred");
      }
    } finally {
      setIsEditing(false);
    }
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
        aria-label="Delete food"
      >
        <FaEdit />
        <div className="hidden md:flex">edit</div>
      </button>
    </div>
  );
}

export default EditFood;
