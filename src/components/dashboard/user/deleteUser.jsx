import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import useDeleteUser from "../../../hooks/users/useDeleteUser";

const DeleteUser = ({ userId, onDelete }) => {
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const { deleteUser, isDeleting, deleteUserError, deleteUserMessage } =
    useDeleteUser({ setDeleteConfirmOpen, onDelete });

  const handleDelete = () => {
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteUser(userId);
  };

  return (
    <div>
      {isDeleteConfirmOpen && (
        <div
          className="fixed w-full h-full inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          role="dialog"
          aria-labelledby="delete-confirm-title"
          aria-describedby="delete-confirm-description"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
            <h2 id="delete-confirm-title" className="text-lg font-bold mb-4">
              Confirm Deletion
            </h2>
            <p id="delete-confirm-description">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            {deleteUserMessage && (
              <p className="text-green-500 mb-4">{deleteUserMessage}</p>
            )}
            {deleteUserError && (
              <p className="text-red-500 mb-4">{deleteUserError}</p>
            )}
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
        className="md:flex items-center duration-300 text-red-500 hover:text-red-700"
        aria-label="Delete user"
      >
        <FaTrash className="w-4 h-4 md:hidden flex" />
        <div className="hidden md:flex">Delete</div>
      </button>
    </div>
  );
};

export default DeleteUser;
