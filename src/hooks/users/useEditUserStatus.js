import { useState } from "react";
import apiClient from "../../utils/axiosConfig";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
const useEditUserStatus = ({  setEditFormOpen }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editUserMessage, setEditUserMessage] = useState(null);
    const [editUserError, setEditUserError] = useState(null);
    const editUser = async (userId, data) => {

        setIsEditing(true);
        try {
            const response = await apiClient.patch(`/users/${userId}`, data);
            setEditUserMessage(response.data.message);
            dispatch(setUser(response.data.user));
            setEditUserError(null);
            setTimeout(() => {
                setEditUserMessage(null);
                if (setEditFormOpen) {
                    setEditFormOpen(false);
                }
                
            }, 2000);
        } catch (error) {
            setEditUserError(error.response?.data?.message || "An error occurred during the update process");
            
        } finally {
            setIsEditing(false);
        }
    };
    return {
        editUser,
        isEditing,
        editUserMessage,
        editUserError,
    };
};

export default useEditUserStatus;
