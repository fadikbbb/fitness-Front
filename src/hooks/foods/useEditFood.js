import { useState } from "react";
import apiClient from "../../utils/axiosConfig";

const useEditFood = ({ onSuccess, setEditFormOpen }) => {
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    const editFood = async (foodId, data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === "image") {
                if (data.image.length > 0) {
                    formData.append(key, data.image[0]);
                }
            } else {
                formData.append(key, data[key]);
            }
        });
        setIsEditing(true);
        try {
            setError(null);
            setMessage(null);
            setFormErrors([]);
            const response = await apiClient.patch(`/foods/${foodId}`, formData);
            setMessage(response.data.message);
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

    return { error, message, isEditing, formErrors, setFormErrors, setError, setMessage, editFood };
};

export default useEditFood;
