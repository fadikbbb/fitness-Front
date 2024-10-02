import { useState } from "react";
import apiClient from "../../utils/axiosConfig";
import { useParams } from "react-router-dom";

const useAddFoodToNutritionPlan = (handleRefresh) => {
    const { userId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleAddToNutritionPlan = async (mealDetails) => {
        try {
            setError("");
            const response = await apiClient.post(
                `/nutrition-plans/${userId}`,
                mealDetails
            );
            handleRefresh(response.data.nutritionPlan);
            setMessage(response.data.message);
            setShowModal(false);
            toggleModal();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to add food to the nutrition plan."
            );
        }
    };

    const toggleModal = () => {
        setShowModal((prev) => !prev);
    };

    return {
        message,
        showModal,
        error,
        handleAddToNutritionPlan,
        toggleModal,
    };
};

export default useAddFoodToNutritionPlan;
