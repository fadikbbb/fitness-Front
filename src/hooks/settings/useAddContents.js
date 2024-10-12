import { useState } from 'react';
import apiClient from '../../utils/axiosConfig';

const useAddContentsHook = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [addMessage, setAddMessage] = useState(null);
    const [addError, setAddError] = useState(null);

    const handleAddAbout = async (data, handleRefresh) => {
        const formData = new FormData();
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        formData.append("title", data.title);
        formData.append("description", data.description);

        formData.forEach((value, key) => console.log(key, value));

        setIsAdding(true);
        setAddError(null);
        setAddMessage(null);


        try {
            await apiClient.post(`/settings/about`, formData);
            setAddMessage("About added successfully");
            handleRefresh();
        } catch (error) {
            setAddError(error.response?.data?.message || "Failed to fetch about data");
        } finally {
            setIsAdding(false);
        }
    };

    const handleAddServices = async (data, handleRefresh) => {
        const formData = new FormData();

        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]); // Image file
        }
        formData.append("title", data.title);
        formData.append("description", data.description);

        setIsAdding(true);
        setAddError(null);
        setAddMessage(null);

        try {
            await apiClient.post(`/settings/services`, formData);
            setAddMessage("Services added successfully");
            handleRefresh();

        } catch (error) {
            setAddError(error.response?.data?.message || "Failed to add service");
            return null; // Return null if there is an error
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
        handleAddServices
    };
};
export default useAddContentsHook;