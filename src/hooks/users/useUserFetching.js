import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../utils/axiosConfig";
import { useSelector } from "react-redux";

const useFetchUser = () => {
    // Get the userId from URL params and Redux store
    const { userId: useParamsUserId } = useParams();
    const userIdFromRedux = useSelector((state) => state.auth.userId);

    // Use the URL param userId if available, otherwise use the Redux userId
    const finalUserId = useParamsUserId || userIdFromRedux;

    const [user, setUser] = useState(null);
    const [fetchUserError, setFetchUserError] = useState(null);
    const [fetchUserLoading, setFetchUserLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setFetchUserLoading(true);
                // Make the API call using the correct finalUserId
                const response = await apiClient.get(`/users/${finalUserId}`);
                setUser(response.data.user);
            } catch (error) {
                setFetchUserError(error.response?.data?.message || "An error occurred");
            } finally {
                setFetchUserLoading(false);
            }
        };

        if (finalUserId) {
            fetchData();
        }
    }, [finalUserId]);

    return { user, fetchUserError, fetchUserLoading };
};

export default useFetchUser;
