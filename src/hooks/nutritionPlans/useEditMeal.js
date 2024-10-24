import { useState } from "react";
import apiClient from "../../utils/axiosConfig";
import { useParams } from "react-router-dom";
const useEditMeal = ({ setIsOpen }) => {
    const { userId } = useParams();
    const [isEditingMeal, setIsEditingMeal] = useState(false);
    const [error, setError] = useState(null);

    const editMeal = async (mealName, mealId, planId, handleRefresh) => {
        setIsEditingMeal(true);
        try {
            await apiClient.patch(
                `/nutrition-plans/${userId}/plans/${planId}/meals/${mealId}`,
                {
                    mealName: mealName,
                }
            );
            setIsOpen(false);
            handleRefresh();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update meal");
        } finally {
            setIsEditingMeal(false);
        }
    };

    return { editMeal, isEditingMeal, error };
};

export default useEditMeal;
