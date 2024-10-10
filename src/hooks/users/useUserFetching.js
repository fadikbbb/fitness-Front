import { useState } from "react";
import apiClient from "../../utils/axiosConfig";
import { useEffect } from "react";
export default function useUserFetching(userId) {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    useEffect(() => {
        fetchUser();
    }, [userId]);
    const fetchUser = async () => {
        if (userId && userId !== "undefined" && userId !== "null") {
        setIsLoading(true);
        try {
            const response = await apiClient.get(`/users/${userId}`);
            setUser(response.data.user);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
        }
    };

    return {
        user,
        isLoading,
        error,
        message,
    };
}
