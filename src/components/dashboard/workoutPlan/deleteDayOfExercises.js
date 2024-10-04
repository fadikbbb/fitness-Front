import React, { useState } from "react";
import useDeleteDayOfExercises from "../../../hooks/workoutPlans/useDeleteDayOfExercises";
import { FaTrash } from "react-icons/fa";
function DeleteDayOfExercises({ handleRefresh, planId, day }) {
    const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const { deleteDayOfExercises, message, error, isLoading } = useDeleteDayOfExercises({ handleRefresh });
    const handleConfirmDelete = async () => {
        await deleteDayOfExercises(planId, day);
    };
    return (
        <div>
            <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded "
                onClick={() => setDeleteConfirmOpen(true)}
            >
                <FaTrash />
                Delete
            </button>
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
                        <p>Are you sure you want to delete this day of exercises?</p>
                        {message && <p className="text-green-500 mb-4">{message}</p>}
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <div className="flex justify-center">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={handleConfirmDelete}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setDeleteConfirmOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteDayOfExercises;