import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import apiClient from "../../../utils/axiosConfig";
import { addFood } from "../../../store/foodSlice";
import FoodForm from "./foodForm";

const AddFood = ({ onAdd, foodCategories }) => {
  const [addFormOpen, setAddFormOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [formErrors, setFormErrors] = React.useState({});
  const [isAdding, setIsAdding] = React.useState(false);
  const dispatch = useDispatch();

  const handleAddSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("fiber", data.fiber);
    formData.append("calories", data.calories);
    formData.append("protein", data.protein);
    formData.append("carbohydrates", data.carbohydrates);
    formData.append("fat", data.fat);
    formData.append("weight", data.weight);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      setIsAdding(true);
      const response = await apiClient.post("/foods", formData);
      dispatch(addFood(response.data.food));
      setMessage(response.data.message);
      setError(null);
      setTimeout(() => {
        setAddFormOpen(false);
      }, 500);
      onAdd();
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.response && error.response.data.errors) {
        setFormErrors(error.response.data.errors);
      } else {
        setError("An unexpected error occurred.");
      }
      setMessage(null);
    } finally {
      setIsAdding(false);
    }
  };

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
        <div className="hidden md:flex"> Add food</div> <FaPlus />
      </button>
      {addFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4">Add food</h2>
            <FoodForm
              foodCategories={foodCategories}
              handleAddSubmit={handleAddSubmit}
              setFormErrors={setError}
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
