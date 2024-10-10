import { useState } from "react";
import apiClient from "../../utils/axiosConfig";

const useUpdateContent = ({ setError, handleReset }) => {
    const [updateMessage, setUpdateMessage] = useState(null);
    const [updateError, setUpdateError] = useState(null);

    const updateHero = async (data) => {
        const formData = new FormData();
        formData.append("heroTitle", data.heroTitle);
        formData.append("heroDescription", data.heroDescription);
        if (data.heroImage && data.heroImage[0]) {
            formData.append("heroImage", data.heroImage[0]);
        }
        if (data.logo && data.logo[0]) {
            formData.append("logo", data.logo[0]);
        }
        if (data.heroVideo && data.heroVideo[0]) {
            formData.append("heroVideo", data.heroVideo[0]);
        }
        setUpdateMessage(null);
        setUpdateError(null);
        try {
            const response = await apiClient.patch("/contents/update-content", formData);
            setUpdateMessage(response.data.message);
            handleReset();
        } catch (error) {
            setUpdateMessage("");
            console.log(error);
            if (error.response?.data?.message) {
                setUpdateError(error.response.data.message);
            } else if (error.response?.data?.errors) {
                const formErrors = error.response.data.errors;
                Object.keys(formErrors).forEach((key) => {
                    setError(formErrors[key].path, {
                        type: "manual",
                        message: formErrors[key].msg,
                    });
                });
            } else {
                setError("An error occurred");
            }
        }
    };

    return { updateHero, updateMessage, updateError };
};

export default useUpdateContent;
