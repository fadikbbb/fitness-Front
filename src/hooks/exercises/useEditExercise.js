import { useState } from "react";
import apiClient from "../../utils/axiosConfig";

const useEditExercise = ({ setEditFormOpen, onEdit }) => {
    const [editExerciseError, setEditExerciseError] = useState(null);
    const [editExerciseMessage, setEditExerciseMessage] = useState(null);
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
            setEditExerciseError(null);
            setEditExerciseMessage(null);
            setFormErrors([]);
            const response = await apiClient.patch(`/exercises/${exerciseId}`, formData);
            setEditExerciseMessage(response.data.message);
            setEditExerciseError(null);
            setTimeout(() => {
                setEditFormOpen(false)
                onEdit()
            }, 500);
        } catch (error) {
            if (error.response && error.response.data.message) {
                setEditExerciseError(error.response.data.message);
            } else if (error.response && error.response.data.errors) {
                setFormErrors(error.response.data.errors);
            } else {
                setEditExerciseError("An error occurred");
            }
            setEditExerciseMessage(null);
        } finally {
            setIsEditing(false);
        }
    };

    return {
        editExerciseError,
        editExerciseMessage,
        isEditing,
        formErrors,
        setFormErrors,
        setEditExerciseError,
        setEditExerciseMessage,
        editExercise
    };
};

export default useEditExercise;
