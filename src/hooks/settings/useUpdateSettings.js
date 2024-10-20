// src/hooks/useUpdateSettings.js
import { useState, useCallback } from "react";
import apiClient from "../../utils/axiosConfig";
import { useDispatch } from "react-redux";
import {
    fetchAboutSettings,
    fetchServicesSettings,
    fetchHeroSettings,
    fetchSocialMediaSettings,
    fetchTrainerSettings,

} from "../../store/settingsSlice";

const useUpdateSettings = ({ setError }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateMessage, setUpdateMessage] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const dispatch = useDispatch();

    const handleError = (error) => {
        if (error.response?.data?.message) {
            setUpdateError(error.response.data.message);
        } else if (error.response?.data?.errors) {
            error.response.data.errors.forEach((error) => {
                setError(error.path, {
                    type: "manual",
                    message: error.msg,
                });
            });
        } else {
            setUpdateError("An unexpected error occurred");
        }
    };

    const updateContent = useCallback(async (url, data, from) => {
        setUpdateMessage(null);
        setUpdateError(null);
        setIsEditing(true);
        try {
            const formData = new FormData();

            if (from === "hero") {
                if (data.heroImage?.[0]) formData.append("heroImage", data.heroImage[0]);
                if (data.logo?.[0]) formData.append("logo", data.logo[0]);
                if (data.heroVideo?.[0]) formData.append("heroVideo", data.heroVideo[0]);
                if (data.heroTitle) formData.append("heroTitle", data.heroTitle);
                if (data.companyName) formData.append("companyName", data.companyName);
                if (data.heroDescription) formData.append("heroDescription", data.heroDescription);
            } else {
                if (data.title) formData.append("title", data.title);
                if (data.description) formData.append("description", data.description);
                if (data.image?.[0]) formData.append("image", data.image[0]);
                if (data.video?.[0]) formData.append("video", data.video[0]);
            }

            const response = await apiClient.patch(url, from === "socialMedia" ? data : formData);

            switch (from) {
                case "about":
                    dispatch(fetchAboutSettings());
                    break;
                case "services":
                    dispatch(fetchServicesSettings());
                    break;
                case "socialMedia":
                    dispatch(fetchSocialMediaSettings());
                    break
                case "hero":
                    dispatch(fetchHeroSettings());
                    break
                case "trainers":
                    dispatch(fetchTrainerSettings());
                    break;
                default:
                    break;
            }

            setUpdateMessage(response.data.message);


        } catch (error) {
            handleError(error);
        } finally {
            setIsEditing(false);
            setTimeout(() => {
                setUpdateError(null);
                setUpdateMessage(null);
            }, 2000);
        }
    }, [dispatch, setError,]);

    const updateHero = (data) => updateContent("/settings/update-content/hero", data, "hero");
    const updateSocialMedia = (data) => updateContent("/settings/update-content/social-media", data, "socialMedia");
    const updateService = (data, id) => updateContent(`/settings/update-content/services/${id}`, data, "services");
    const updateAbout = (data, id) => updateContent(`/settings/update-content/about/${id}`, data, "about");
    const updateTrainer = (data, id) => updateContent(`/settings/update-content/trainer/${id}`, data, "trainers");

    return {
        isEditing,
        updateHero,
        updateSocialMedia,
        updateAbout,
        updateService,
        updateTrainer,
        updateMessage,
        updateError,
    };
};

export default useUpdateSettings;
