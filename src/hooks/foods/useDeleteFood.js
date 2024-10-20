import { useState } from "react";
import apiClient from "../../utils/axiosConfig";

const useDeleteFood = ({ onDelete, setDeleteConfirmOpen }) => {
    const [deleteFoodError, setDeleteFoodError] = useState(null);
    const [deleteFoodLoading, setDeleteFoodLoading] = useState(false);
    const [deleteFoodMessage, setDeleteFoodMessage] = useState(null);

    const deleteFood = async (foodId) => {
        try {
            setDeleteFoodLoading(true);
            const response = await apiClient.delete(`/foods/${foodId}`);
            const data = response.data;
            setDeleteFoodMessage(data.message || "Food deleted successfully.");
            setDeleteFoodError(null);
            onDelete()
            setDeleteConfirmOpen(false)
        } catch (error) {
            setDeleteFoodError(error.response?.data?.message || "An error occurred");
        } finally {
            setDeleteFoodLoading(false);
        }
    };

    return { deleteFoodError, deleteFoodLoading, deleteFoodMessage, deleteFood };
};

export default useDeleteFood;
