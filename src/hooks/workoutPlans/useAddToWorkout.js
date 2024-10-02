import { useState } from "react";
import apiClient from "../../utils/axiosConfig";
import { useParams } from "react-router-dom"
const useAddToWorkout = ({ handleRefresh, setShowModal }) => {
    const { userId } = useParams()
    const [error, setError] = useState("");

    const addToWorkout = async (exerciseDetails) => {
        try {
             await apiClient.post(`/workout-plans/${userId}`, {
                day: exerciseDetails.day,
                exercises: exerciseDetails.exercises,
            });
            setError("");
            handleRefresh();
            setShowModal(false)
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    return { addToWorkout, error };
};

export default useAddToWorkout;
