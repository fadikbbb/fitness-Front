import apiClient from "../../utils/axiosConfig";
import { useParams } from "react-router-dom";
import { useState } from "react";
const useEditFood = ({ setIsOpen, handleRefresh }) => {
    const { userId } = useParams();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const editFood = async (foodId, mealId, quantity) => {
        try {
            setIsEditing(true);
            setError(null);
            setMessage(null);
            const response = await apiClient.patch(
                `/nutrition-plans/${userId}/meals/${mealId}/foods/${foodId}`,
                { quantity: quantity }
            );
            setMessage(response.data.message);
            setTimeout(() => {
                setIsOpen(false);
                handleRefresh();
            }, 1000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update food");
        } finally {
            setIsEditing(false);
        }

    };

    return { editFood, isEditing, error, message };
};

export default useEditFood;
