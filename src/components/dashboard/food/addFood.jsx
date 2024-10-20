import React from "react";
import { FaPlus } from "react-icons/fa";
import FoodForm from "./foodForm";
import useAddFood from "../../../hooks/foods/useAddFood";

const AddFood = ({ onAdd }) => {
  const [addFormOpen, setAddFormOpen] = React.useState(false);
  const {
    isAdding,
    formErrors,
    addFoodError,
    addFoodMessage,
    setAddFoodError,
    setAddFoodMessage,
    handleAddSubmit,
    setFormErrors,
  } = useAddFood({onAdd,setAddFormOpen});

  const handleOpen = () => {
    setAddFoodError(null);
    setAddFoodMessage(null);
    setAddFormOpen(true);
  };

  return (
    <div className="w-[30%] flex justify-end items-center">
      <button
        onClick={handleOpen}
        className=" bg-button hover:bg-buttonHover text-white flex gap-2 items-center px-4 py-2 rounded-lg"
      >
        <div className="hidden md:flex"> Add food</div>
        <FaPlus className="w-4 h-4 md:hidden flex" />
      </button>
      {addFormOpen && (
        <div className="fixed  inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white overflow-auto max-h-screen p-6 rounded shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4">Add food</h2>
            <FoodForm
              handleAddSubmit={handleAddSubmit}
              setAddFormOpen={setAddFormOpen}
              setFormErrors={setFormErrors}
              formErrors={formErrors}
              isAdding={isAdding}
              setGlobalError={setAddFoodError}
              setGlobalMessage={setAddFoodMessage}
              globalError={addFoodError}
              globalMessage={addFoodMessage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFood;
