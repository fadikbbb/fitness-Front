import { useState, useEffect } from "react";
import apiClient from "../../utils/axiosConfig";
import { useParams } from "react-router-dom";
export default function useNutritionPlanFetching({ changes, setChanges }) {
    const { userId } = useParams();
    const [nutritionPlan, setNutritionPlan] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState(null);

    const fetchNutritionPlan = async () => {
        try {
            setError(null);
            setMessage(null);
            setIsLoading(true);
            const response = await apiClient.get(`/nutrition-plans/${userId}`);
            setNutritionPlan(response.data.nutritionPlan);
            setChanges(false);
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNutritionPlan();
    }, [userId, changes]);

    return { nutritionPlan, error, isLoading, message };
}

