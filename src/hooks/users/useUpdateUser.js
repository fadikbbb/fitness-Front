import { useState } from "react";
import apiClient from "../../utils/axiosConfig";

const useUpdateUser = ({ handleRefresh }) => {
    const [updatingUserError, setUpdatingUserError] = useState(null);
    const [updatingUserMessage, setUpdatingUserMessage] = useState(null)
    const [updatingUserLoading, setUpdatingUserLoading] = useState(false);

    const updateUser = async (userId, isActive) => {
        setUpdatingUserLoading(true);
        try {
            await apiClient.patch(`/users/${userId}`, { isActive });
            setUpdatingUserError(null);
            setUpdatingUserMessage(null)
            handleRefresh();
        } catch (err) {
            setUpdatingUserError(err.response?.data?.message || "An error occurred");
        } finally {
            setUpdatingUserLoading(false);
        }
    };

    return {
        updateUser,
        updatingUserMessage,
        updatingUserError,
        updatingUserLoading,
    };
};

export default useUpdateUser;
