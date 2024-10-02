import { useState } from "react";
import apiClient from "../../utils/axiosConfig";
import { useParams } from "react-router-dom";

const useRemoveExercise = ({ handleRefresh }) => {
    const { userId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const removeExercise = async (planId, exerciseId, day) => {
        console.log(planId, exerciseId, day)
        setLoading(true);
        setError(null);
        try {
            await apiClient.delete(
                `/workout-plans/${userId}/workoutPlan/${planId}/exercise/${exerciseId}?day=${encodeURIComponent(day)}`
            );
            handleRefresh();
        } catch (err) {
            console.log(err)
            setError(err.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { removeExercise, loading, error };
};

export default useRemoveExercise;
