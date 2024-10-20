import { useState } from "react";
import { useDispatch } from "react-redux";
import apiClient from "../../utils/axiosConfig";
import { addFood } from "../../store/foodSlice";

const useAddFood = ({onAdd, setAddFormOpen}) => {
    const [isAdding, setIsAdding] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [addFoodError, setAddFoodError] = useState(null);
    const [addFoodMessage, setAddFoodMessage] = useState(null);
    const dispatch = useDispatch();

    const handleAddSubmit = async (data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            console.log(key, data[key]);
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
            setAddFoodMessage(response.data.message);
            setAddFoodError(null);
            setTimeout(() => {
                setFormErrors({});
                setAddFoodMessage(null);
                setAddFormOpen(false);
                onAdd();
            }, 1000);
        } catch (error) {
            if (error.response && error.response.data.message) {
                setAddFoodError(error.response.data.message);
            } else if (error.response && error.response.data.errors) {
                setFormErrors(error.response.data.errors);
            } else {
                setAddFoodError("An unexpected error occurred.");
            }
            setAddFoodMessage(null);
        } finally {
            setIsAdding(false);
        }
    };

    return {
        isAdding,
        formErrors,
        addFoodError,
        addFoodMessage,
        handleAddSubmit,
        setAddFoodError,
        setAddFoodMessage,
        setFormErrors,

    };
};

export default useAddFood;
