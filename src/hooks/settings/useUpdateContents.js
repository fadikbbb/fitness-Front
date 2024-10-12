import { useState } from "react";
import apiClient from "../../utils/axiosConfig";
const useUpdateContent = ({ handleRefresh }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateMessage, setUpdateMessage] = useState(null);
    const [updateError, setUpdateError] = useState(null);

    // Generalized content update function
    const updateContent = async (url, data) => {
        console.log(data);
        console.log(url);
        setUpdateMessage(null);
        setUpdateError(null);
        try {
            setIsEditing(true);
            const formData = new FormData();
            if (data.title) formData.append("title", data.title);

            if (data.description) formData.append("description", data.description);

            if (data.image && data.image[0]) {
                formData.append("image", data.image[0]);
            }

            if (data.logo && data.logo[0]) {
                formData.append("logo", data.logo[0]);
            }

            if (data.video && data.video[0]) {
                formData.append("video", data.video[0]);
            }
            formData.forEach((value, key) => console.log(key, value));
            if (data.facebook || data.twitter || data.instagram || data.linkedin) {
                const response = await apiClient.patch(url, data);
                setUpdateMessage(response.data.message);
            } else {
                console.log(formData);
                const response = await apiClient.patch(url, formData);
                setUpdateMessage(response.data.message);
                if (handleRefresh)
                    handleRefresh();
            }
        } catch (error) {
            setUpdateMessage("");
            console.error("Update error: ", error);
            if (error.response?.data?.message) {
                setUpdateError(error.response.data.message);
            } else if (error.response?.data?.errors) {
                const formErrors = error.response.data.errors;
                Object.keys(formErrors).forEach((key) => {
                    setUpdateError(formErrors[key].path, {
                        type: "manual",
                        message: formErrors[key].msg,
                    });
                });
            } else {
                setUpdateError("An unexpected error occurred");
            }
        } finally {
            setIsEditing(false);
        }
    };

    const updateHero = (data) => updateContent("/settings/update-content/hero", data);
    const updateSocialMedia = (data) => updateContent("/settings/update-content/social-media", data);
    const updateService = (data, id) => updateContent(`/settings/update-content/services/${id}`, data);
    const updateAbout = (data, id) => updateContent(`/settings/update-content/about/${id}`, data);
    return {
        isEditing,
        updateHero,
        updateSocialMedia,
        updateService,
        updateAbout,
        updateMessage,
        updateError,
    };
};

export default useUpdateContent;
