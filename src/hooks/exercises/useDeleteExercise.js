import { useState } from "react";
import apiClient from "../../utils/axiosConfig";

const useDeleteExercise = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const deleteExercise = async (exerciseId) => {
        try {
            setLoading(true);
            const response = await apiClient.delete(`/exercises/${exerciseId}`);
            const data = response.data;
            setMessage(data.message || "Exercise deleted successfully.");
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { error, loading, message, deleteExercise };
};

export default useDeleteExercise;
