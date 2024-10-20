import React from "react";
import useDeleteContents from "../../../../hooks/settings/useDeleteSettings";
import { FaTrash } from "react-icons/fa";
export function DeleteService({ id }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { handleDeleteServices, deleteMessage, deleteError, isDeleting } = useDeleteContents();

  const handleDelete = async () => {
    await handleDeleteServices(id);
    if (!deleteError) {
     
      setIsOpen(false); 
    }
  };

  return (
    <div>
      {isOpen && (
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
            <p>Are you sure you want to delete this exercise?</p>
            {deleteMessage && <p className="text-green-500 mb-4">{deleteMessage}</p>}
            {deleteError && <p className="text-red-500 mb-4">{deleteError}</p>}
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-md mt-4"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Confirm"}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded-md mt-4 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <button
        onClick={ () => setIsOpen(true)}
        className="md:flex items-center text-white p-2 rounded-md bg-red-500 hover:bg-red-700"
        aria-label="Delete exercise"
      >
        <FaTrash className="w-4 h-4 flex md:hidden" />
        <div className="hidden md:flex">Delete</div>
      </button>
    </div>
  );
}
