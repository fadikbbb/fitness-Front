import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import apiClient from "../../../utils/axiosConfig";

function DeleteFood({ userId, onSuccess }) {
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // New state for loading

  const handleDelete = () => {
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await apiClient.delete(`/users/${userId}`);
      const data = response.data;
      setMessage(data.message);
      setError(null);
      onSuccess();
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setMessage(null);
    } finally {
      setIsDeleting(false);
      setDeleteConfirmOpen(false);
    }
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
            <p>Are you sure you want to delete this user?</p>
            {message && <p className="text-green-500 mb-4">{message}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              onClick={handleConfirmDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-md mt-4"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Confirm"}
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
        className="md:flex items-center text-red-500 hover:text-red-700"
        aria-label="Delete food"
      >
        <FaTrash />
        <div className="hidden md:flex">Delete</div>
      </button>
    </div>
  );
}

export default DeleteFood;
