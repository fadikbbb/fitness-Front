import { useState, useEffect } from 'react';
import apiClient from '../../utils/axiosConfig';
import { useParams } from "react-router-dom";
const useWorkoutPlan = ({ changes, setChanges }) => {
    const { userId } = useParams();
    const [workoutPlan, setWorkoutPlan] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchWorkoutPlan = async () => {
        try {
            const response = await apiClient.get(`/workout-plans/${userId}`);
            setWorkoutPlan(response.data.workoutPlan);
            setError(null);
            setChanges(false)
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchWorkoutPlan();
        }
    }, [userId, changes]);

    return { workoutPlan, error, isLoading };
};

export default useWorkoutPlan;
