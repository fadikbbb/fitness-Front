import { useState } from "react";
import apiClient from "../../utils/axiosConfig";

const useFormSubmit = (onAdd, setAddFormOpen, setError) => {
    const [isAdding, setIsAdding] = useState(false);
    const [addUserError, setAddUserError] = useState(null);
    const [addUserMessage, setAddUserMessage] = useState(null);

    const addUser = async (data, reset) => {
        try {
            setIsAdding(true);
            setAddUserError(null);
            setAddUserMessage(null);
            let formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (key === "image" && data[key].length > 0) {
                    formData.append(key, data[key][0]);
                } else if (data[key] !== "") {
                    formData.append(key, data[key]);
                }
            });

            const response = await apiClient.post("/users", formData);
            setAddUserMessage(response.data.message);
            setTimeout(() => setAddFormOpen(false), 1000);
            reset();
            onAdd();
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.errors) {
                error.response.data.errors.forEach(
                    (err) =>
                        setError(
                            err.path,
                            {
                                type: "manual",
                                message: err.msg
                            }
                        )
                );
            } else if (error.response && error.response.data.message) {
                setAddUserError(error.response.data.message || "An error occurred");
            }
        } finally {
            setIsAdding(false);
        }
    };

    return {
        isAdding,
        setAddUserMessage,
        addUserError,
        setAddUserError,
        addUserMessage,
        addUser,
    };
};

export default useFormSubmit;
