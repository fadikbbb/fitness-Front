import { useState } from "react";
import apiClient from "../../utils/axiosConfig";

const useDeleteExercise = ({ onDelete, isDeleteConfirmOpen }) => {
    const [deleteExerciseError, setDeleteExerciseError] = useState(null);
    const [deletingExerciseLoading, setDeletingExerciseLoading] = useState(false);
    const [deletingMessage, setDeletingMessage] = useState(null);

    const deleteExercise = async (exerciseId) => {
        try {
            setDeletingExerciseLoading(true);
            const response = await apiClient.delete(`/exercises/${exerciseId}`);
            const data = response.data;
            setDeletingMessage(data.message || "Exercise deleted successfully.");
            setDeleteExerciseError(null);
            onDelete();
            isDeleteConfirmOpen(false);
        } catch (error) {
            setDeleteExerciseError(error.response?.data?.message || "An error occurred");
        } finally {
            setDeletingExerciseLoading(false);
        }
    };

    return { deleteExercise, deleteExerciseError, deletingExerciseLoading, deletingMessage };
};

export default useDeleteExercise;
