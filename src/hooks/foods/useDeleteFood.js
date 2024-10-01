import { useState } from "react";
import apiClient from "../../utils/axiosConfig";

const useDeleteFood = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const deleteFood = async (foodId) => {
        try {
            setLoading(true);
            const response = await apiClient.delete(`/foods/${foodId}`);
            const data = response.data;
            setMessage(data.message || "Food deleted successfully.");
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { error, loading, message, deleteFood };
};

export default useDeleteFood;
