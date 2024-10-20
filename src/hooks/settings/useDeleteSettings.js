import { useState } from 'react';
import apiClient from '../../utils/axiosConfig';
import {
    fetchAboutSettings,
    fetchServicesSettings,

    fetchTrainerSettings,

} from "../../store/settingsSlice";
import { useDispatch } from "react-redux";
export default function useDeleteContents() {
    const [deleteError, setDeleteError] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const dispatch = useDispatch();
    const handleDeleteAbout = async (id) => {
        setIsDeleting(true);
        try {
            const response = await apiClient.delete(`/settings/about/${id}`);
            const data = response.data;
            setDeleteMessage(data.message);
            setDeleteError(null);
            dispatch(fetchAboutSettings()); // Fetch only the about settings
        } catch (error) {
            setDeleteError(error.response?.data?.message || 'Failed to delete about');
            setDeleteMessage(null);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDeleteServices = async (id) => {
        setIsDeleting(true);
        try {
            const response = await apiClient.delete(`/settings/services/${id}`);
            const data = response.data;
            setDeleteMessage(data.message);
            setDeleteError(null);
            dispatch(fetchServicesSettings()); // Fetch only the services settings
        } catch (error) {
            setDeleteError(error.response?.data?.message || 'Failed to delete services');
            setDeleteMessage(null);
        } finally {
            setIsDeleting(false);
        }
    };
    const handleDeleteTrainer = async (id) => {
        setIsDeleting(true);
        try {
            const response = await apiClient.delete(`/settings/trainer/${id}`);
            const data = response.data;
            setDeleteMessage(data.message);
            setDeleteError(null);
            dispatch(fetchTrainerSettings()); // Fetch only the trainer settings
        } catch (error) {
            setDeleteError(error.response?.data?.message || 'Failed to delete services');
            setDeleteMessage(null);
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        deleteError,
        isDeleting,
        deleteMessage,
        handleDeleteAbout,
        handleDeleteServices,
        handleDeleteTrainer
    };
}
