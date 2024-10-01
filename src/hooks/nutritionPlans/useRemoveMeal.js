import { useState } from "react";
import apiClient from "../../utils/axiosConfig";
import { useParams } from "react-router-dom";

const useRemoveMeal = ({ handleRefresh }) => {
    const [message, setMessage] = useState(null);
    const [isRemoveLoading, setIsRemoveLoading] = useState(false);
    const [error, setError] = useState(null);
    const { userId } = useParams();
    const removeMeal = async (mealId, planId) => {
        setError(null);
        setMessage(null);
        setIsRemoveLoading(true);
        try {
            const response = await apiClient.delete(
                `/nutrition-plans/${userId}/plans/${planId}/meals/${mealId}`
            );
            setMessage(response.data.message);
            handleRefresh();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete meal");
        } finally {
            setIsRemoveLoading(false);
        }
    };

    return { removeMeal, isRemoveLoading, message, error };
};

export default useRemoveMeal;
