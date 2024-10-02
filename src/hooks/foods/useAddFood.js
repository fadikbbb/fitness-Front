import { useState } from "react";
import { useDispatch } from "react-redux";
import apiClient from "../../utils/axiosConfig";
import { addFood } from "../../store/foodSlice";

const useAddFood = (onAdd) => {
    const [isAdding, setIsAdding] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();

    const handleAddSubmit = async (data) => {
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

        try {
            setIsAdding(true);
            const response = await apiClient.post("/foods", formData);
            dispatch(addFood(response.data.food));
            setMessage(response.data.message);
            setError(null);
            setTimeout(() => {
                onAdd();
            }, 500);
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else if (error.response && error.response.data.errors) {
                setFormErrors(error.response.data.errors);
            } else {
                setError("An unexpected error occurred.");
            }
            setMessage(null);
        } finally {
            setIsAdding(false);
        }
    };

    return {
        isAdding,
        formErrors,
        error,
        message,
        handleAddSubmit,
        setError,
        setMessage,
        setFormErrors,
        
    };
};

export default useAddFood;
