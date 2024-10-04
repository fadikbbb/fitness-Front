import { useState } from "react";
import apiClient from "../../utils/axiosConfig";

export default function useUserFetching() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [changes, setChanges] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {   
            const response = await apiClient.get(`/users?page=${page}`);
            setUsers(response.data.users);
            setTotalPages(Math.ceil(response.data.totalUsers / 10));
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        users,
        isLoading,
        error,
        message,
        changes,
        setChanges,
        fetchUsers,
        totalPages,
        page,
        setPage
    };
}