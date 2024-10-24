import { useState } from "react";
import apiClient from "../../utils/axiosConfig";

const useEditFood = ({ onEdit, setEditFormOpen }) => {
    const [editFoodError, setEditFoodError] = useState(null);
    const [editFoodMessage, setEditFoodMessage] = useState(null);
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
        formData.forEach((value, key) => console.log(key, value));
        setIsEditing(true);
        try {
            setEditFoodError(null);
            setEditFoodMessage(null);
            setFormErrors([]);
            const response = await apiClient.patch(`/foods/${foodId}`, formData);
            setEditFoodMessage(response.data.message);
            setTimeout(() => {
                setEditFormOpen(false)
                onEdit()
            }, 500);
        } catch (error) {
            if (error.response && error.response.data.message) {
                setEditFoodError(error.response.data.message);
            } else if (error.response && error.response.data.errors) {
                setFormErrors(error.response.data.errors);
            } else {
                setEditFoodError("An error occurred");
            }
            setEditFoodMessage(null);
        } finally {
            setIsEditing(false);
        }
    };

    return { editFoodError, editFoodMessage, isEditing, formErrors, setFormErrors, setEditFoodError, setEditFoodMessage, editFood };
};

export default useEditFood;
