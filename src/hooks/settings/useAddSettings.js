import { useState } from 'react';
import apiClient from '../../utils/axiosConfig';
import { useDispatch } from 'react-redux';
import { fetchAboutSettings, fetchServicesSettings, fetchTrainerSettings } from '../../store/settingsSlice';

const useAddContentsHook = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [addMessage, setAddMessage] = useState(null);
    const [addError, setAddError] = useState(null);

    const dispatch = useDispatch();

    const handleAddAbout = async (data) => {
        const formData = new FormData();
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }
        formData.append("title", data.title);
        formData.append("description", data.description);
        setIsAdding(true);
        setAddError(null);
        setAddMessage(null);
        try {
            await apiClient.post(`/settings/about`, formData);
            setAddMessage("About added successfully");
            dispatch(fetchAboutSettings()); // Fetch only the about settings
        } catch (error) {
            setAddError(error.response?.data?.message);
        } finally {
            setIsAdding(false);
        }
    };

    const handleAddServices = async (data) => {
        const formData = new FormData();
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }
        formData.append("title", data.title);
        formData.append("description", data.description);
        setIsAdding(true);
        setAddError(null);
        setAddMessage(null);
        try {
            await apiClient.post(`/settings/services`, formData);
            setAddMessage("Services added successfully");
            dispatch(fetchServicesSettings()); // Fetch only the services settings
        } catch (error) {
            setAddError(error.response?.data?.message);
        } finally {
            setIsAdding(false);
        }
    };

    const handleAddTrainer = async (data) => {
        const formData = new FormData();
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }
        formData.append("title", data.title);
        formData.append("description", data.description);
        setIsAdding(true);
        setAddError(null);
        setAddMessage(null);
        try {
            await apiClient.post(`/settings/trainer`, formData);
            setAddMessage("Trainer added successfully");
            dispatch(fetchTrainerSettings()); // Fetch only the trainer settings
        } catch (error) {
            setAddError(error.response?.data?.message);
        } finally {
            setIsAdding(false);
        }
    };

    return {
        isAdding,
        addMessage,
        setAddMessage,
        addError,
        setAddError,
        handleAddAbout,
        handleAddServices,
        handleAddTrainer
    };
};

export default useAddContentsHook;
