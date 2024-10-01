import { useState } from "react";
import apiClient from "../../utils/axiosConfig";
import { useParams } from "react-router-dom";
const useRemoveFood = () => {
    const { userId } = useParams();
    const [isRemoving, setIsRemoving] = useState(false);
    const [error, setError] = useState(null);

    const removeFood = async (foodId, mealId, handleRefresh) => {
        setIsRemoving(true);
        try {
            await apiClient.delete(
                `/nutrition-plans/${userId}/meals/${mealId}/foods/${foodId}`
            );
            handleRefresh();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to remove food");
        } finally {
            setIsRemoving(false);
        }
    };

    return { removeFood, isRemoving, error };
};

export default useRemoveFood;
