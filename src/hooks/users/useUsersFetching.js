import { useEffect, useState } from "react";
import apiClient from "../../utils/axiosConfig";
import useDebounce from "../useDebounce";

const useFetchUsers = ({ page, limit, search, isActive, subscription, changes, setChanges, setTotalPages }) => {
    const [users, setUsers] = useState([]);
    const [usersFetchingLoading, setUsersFetchingLoading] = useState(true);
    const [usersFetchingError, setUsersFetchingError] = useState(null);
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const fetchUser = async () => {
            setUsersFetchingLoading(true);
            try {
                const response = await apiClient.get(
                    `/users?page=${page}&limit=${limit}${debouncedSearch ? `&search=${debouncedSearch}` : ""}${isActive ? `&isActive=${isActive}` : ""}${subscription ? `&subscriptionStatus=${subscription}` : ""}`
                );
                setUsers(response.data.users);
                setTotalPages(Math.ceil(response.data.totalUsers / limit));
                setChanges(false);
                setUsersFetchingError(null);
            } catch (error) {
                setUsersFetchingError(error.response?.data?.message);
            } finally {
                setUsersFetchingLoading(false);
            }
        };
        fetchUser();
    }, [page, limit, debouncedSearch, isActive, subscription, changes, setTotalPages, setChanges]);

    return {
        users,
        usersFetchingLoading,
        usersFetchingError,
    };
};

export default useFetchUsers;
