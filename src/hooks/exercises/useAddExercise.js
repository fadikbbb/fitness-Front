import { useState } from "react";
import { useDispatch } from "react-redux";
import apiClient from "../../utils/axiosConfig";
import { addExercise } from "../../store/exerciseSlice";

const useAddExercise = (onAdd) => {
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();

    const handleAddSubmit = async (data) => {
        try {
            setError(null);
            setMessage(null);
            setFormErrors({});
            setIsAdding(true);
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("category", data.category);
            formData.append("restDuration", data.restDuration);
            formData.append("intensity", data.intensity);

            if (data.image && data.image[0]) {
                formData.append("image", data.image[0]);
            }

            if (data.video && data.video[0]) {
                formData.append("video", data.video[0]);
            }

            const response = await apiClient.post("/exercises", formData);
            dispatch(addExercise(response.data.exercise));
            setMessage(response.data.message);

            setTimeout(() => {
                setFormErrors({});
                onAdd();
            }, 500);
        } catch (error) {
            setMessage(null);
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else if (error.response && error.response.data.errors) {
                setFormErrors(error.response.data.errors);
            } else {
                setError(error.message);
            }
        } finally {
            setIsAdding(false);
        }
    };

    return {
        isAdding,
        error,
        message,
        formErrors,
        handleAddSubmit,
        setError,
        setMessage,
        setFormErrors,
    };
};

export default useAddExercise;
