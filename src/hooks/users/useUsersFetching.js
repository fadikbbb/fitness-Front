import { useEffect, useState } from "react";
import apiClient from "../../utils/axiosConfig";

const useFetchUsers = ({ page, limit, search, role, subscription, changes, setChanges, setTotalPages }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get(
                    `/users?page=${page}&limit=${limit}${search ? `&search=${search}` : ""
                    }${role ? `&role=${role}` : ""}${subscription
                        ? `&subscriptionStatus=${subscription}`
                        : ""
                    }`
                );

                setUsers(response.data.users);
                setTotalPages(Math.ceil(response.data.totalUsers / limit));
                setChanges(false);
                setError(null);
            } catch (error) {
                setError(error.response?.data?.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [page, limit, search, role, subscription, changes]);

    return {
        users,
        loading,
        error,
    };
};

export default useFetchUsers;
