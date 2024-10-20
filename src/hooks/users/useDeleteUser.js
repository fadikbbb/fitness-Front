import { useState } from "react";
import apiClient from "../../utils/axiosConfig";

const useDeleteUser = ({ setDeleteConfirmOpen, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteUserError, setDeleteUserError] = useState(null);
    const [deleteUserMessage, setDeleteUserMessage] = useState(null);

    const deleteUser = async (userId) => {
        setIsDeleting(true);
        try {
            const response = await apiClient.delete(`/users/${userId}`);
            const data = response.data;
            setDeleteUserMessage(data.message);
            setDeleteUserError(null);
            if (onDelete) {
                onDelete();
            }
            setDeleteConfirmOpen(false);
        } catch (error) {
            setDeleteUserError(error.response?.data?.message || "An error occurred");
            setDeleteUserMessage(null);
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        deleteUser,
        isDeleting,
        deleteUserError,
        deleteUserMessage,
    };
};

export default useDeleteUser;
