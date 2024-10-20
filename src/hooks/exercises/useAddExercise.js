import { useState } from "react";
import { useDispatch } from "react-redux";
import apiClient from "../../utils/axiosConfig";
import { addExercise } from "../../store/exerciseSlice";

const useAddExercise = ({ onAdd, setAddFormOpen }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [addExerciseError, setAddExerciseError] = useState(null);
    const [addExerciseMessage, setAddExerciseMessage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();

    const handleAddSubmit = async (data) => {
        try {
            setAddExerciseError(null);
            setAddExerciseMessage(null);
            setFormErrors({});
            setIsAdding(true);
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
            const response = await apiClient.post("/exercises", formData);
            dispatch(addExercise(response.data.exercise));
            setAddExerciseMessage(response.data.message);
            setTimeout(() => {
                setFormErrors({});
                onAdd();
                setAddFormOpen(false);
                setAddExerciseMessage(null);
            }, 1000);
        } catch (error) {
            setAddExerciseMessage(null);
            if (error.response && error.response.data.message) {
                setAddExerciseError(error.response.data.message);
            } else if (error.response && error.response.data.errors) {
                setFormErrors(error.response.data.errors);
            } else {
                setAddExerciseError(error.message);
            }
        } finally {
            setIsAdding(false);
        }
    };

    return {
        isAdding,
        addExerciseError,
        addExerciseMessage,
        formErrors,
        handleAddSubmit,
        setAddExerciseError,
        setAddExerciseMessage,
        setFormErrors,
    };
};

export default useAddExercise;
