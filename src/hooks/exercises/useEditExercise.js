import { useState } from "react";
import apiClient from "../../utils/axiosConfig";

const useEditExercise = ({ setEditFormOpen, onSuccess }) => {
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    const editExercise = async (exerciseId, data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("restDuration", data.restDuration);
        formData.append("sets", data.sets);
        formData.append("maxReps", data.maxReps);
        formData.append("minReps", data.minReps);
        formData.append("intensity", data.intensity);

        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }
        if (data.video && data.video[0]) {
            formData.append("video", data.video[0]);
        }

        setIsEditing(true);
        try {
            setError(null);
            setMessage(null);
            setFormErrors([]);
            const response = await apiClient.patch(`/exercises/${exerciseId}`, formData);
            setMessage(response.data.message);
            setError(null);
            setTimeout(() => {
                setEditFormOpen(false)
                onSuccess()
            }, 500);
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else if (error.response && error.response.data.errors) {
                setFormErrors(error.response.data.errors);
            } else {
                setError("An error occurred");
            }
            setMessage(null);
        } finally {
            setIsEditing(false);
        }
    };

    return { error, message, isEditing, formErrors, setFormErrors, setError, setMessage, editExercise };
};

export default useEditExercise;
