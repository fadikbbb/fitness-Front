import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import useDeleteFood from "../../../hooks/foods/useDeleteFood";

function DeleteFood({ foodId, onSuccess }) {
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const { error, loading, message, deleteFood } = useDeleteFood();
  const handleDelete = () => {
    setDeleteConfirmOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    await deleteFood(foodId);
    if (!error) {
      onSuccess();
    }
    setDeleteConfirmOpen(false);
  };
  
  return (
    <div>
      {isDeleteConfirmOpen && (
        <div
          className="fixed w-full h-full inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          role="dialog"
          aria-labelledby="delete-confirm-title"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
            <h2 id="delete-confirm-title" className="text-lg font-bold mb-4">
              Confirm Deletion
            </h2>
            <p>Are you sure you want to delete this food?</p>
            {message && <p className="text-green-500 mb-4">{message}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              onClick={handleConfirmDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-md mt-4"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Confirm"}
            </button>
            <button
              onClick={() => setDeleteConfirmOpen(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded-md mt-4 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleDelete}
        className="md:flex items-center text-white p-2 rounded-lg bg-red-500 hover:bg-red-700"
        aria-label="Delete food"
      >
        <FaTrash className="w-4 h-4 flex md:hidden" />
        <div className="hidden md:flex">Delete</div>
      </button>
    </div>
  );
}

export default DeleteFood;
