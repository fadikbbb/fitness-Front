import { useState } from 'react';
import apiClient from '../../utils/axiosConfig';

export default function useDeleteContents() {
    const [deleteError, setDeleteError] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAbout = async (id) => {
        setIsDeleting(true);
        try {
            const response = await apiClient.delete(`/settings/about/${id}`);
            const data = response.data;
            setDeleteMessage(data.message);
            setDeleteError(null);
        } catch (error) {
            console.log(error);
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
    };
}
