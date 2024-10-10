import { useState } from "react";
import apiClient from "../../utils/axiosConfig";

const useUpdateSocialMedia = ({ setError, handleReset }) => {
    const [updateMessage, setUpdateMessage] = useState(null);
    const [updateError, setUpdateError] = useState(null);

    const updateSocialMedia = async (data) => {
        const formData = new FormData();
        formData.append("facebook", data.facebook);
        formData.append("twitter", data.twitter);
        formData.append("instagram", data.instagram);
        formData.append("linkedin", data.linkedin)
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

    return { updateSocialMedia, updateMessage, updateError };
};

export default useUpdateSocialMedia;
