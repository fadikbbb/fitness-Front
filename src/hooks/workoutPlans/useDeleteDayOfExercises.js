import { useState } from "react";
import apiClient from "../../utils/axiosConfig";
import { useParams } from "react-router-dom";
export default function useDeleteDayOfExercises({handleRefresh}) {
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { userId } = useParams();
    const deleteDayOfExercises = async (planId, day) => {
        try {
            setIsLoading(true);
            console.log(planId, day);
            const response = await apiClient.delete(`/workout-plans/${userId}/workoutPlan/${planId}/day?day=${encodeURIComponent(day)}`);
            setMessage(response.data.message);
            setError(null);
            handleRefresh();
        } catch (error) {
            setError(error.response.data.message);
            console.log(error);
            setMessage(null);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        deleteDayOfExercises,
        error,
        message,
        isLoading
    };
}

export { useDeleteDayOfExercises };