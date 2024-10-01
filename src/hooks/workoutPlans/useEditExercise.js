import { useState } from "react";
import apiClient from "../../utils/axiosConfig";
import { useParams } from "react-router-dom"

const useEditExercise = (handleRefresh) => {
    const { userId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const editExercise = async (planId, exerciseId, day, editForm) => {
        setLoading(true);
        setError(null);
        try {
            console.log(editForm);
            const response = await apiClient.patch(
                `/workout-plans/${userId}/workoutPlan/${planId}/exercise/${exerciseId}?day=${encodeURIComponent(
                    day
                )}`,
                {
                    sets: editForm.sets,
                    reps: editForm.reps,
                    restDuration: editForm.restDuration,
                    note: editForm.note,
                }
            );
            handleRefresh();
            return response.data;
        } catch (error) {
            setError(error.response.data.message);
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return { editExercise, loading, error };
};

export default useEditExercise;
