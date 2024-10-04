import { useEffect, useState } from "react";
import apiClient from "../../utils/axiosConfig";

const useFetchUsers = (page, formValues) => {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [thereIsChange, setThereIsChange] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get(
                    `/users?page=${page}&limit=${formValues.limit}${formValues.search ? `&search=${formValues.search}` : ""
                    }${formValues.role ? `&role=${formValues.role}` : ""}${formValues.subscription
                        ? `&subscriptionStatus=${formValues.subscription}`
                        : ""
                    }`
                );
                setUsers(response.data.users);
                setTotalPages(Math.ceil(response.data.totalUsers / formValues.limit));
                setThereIsChange(false); // Reset change state if necessary
                setError(null);
            } catch (error) {
                setError(error.response?.data?.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [page, formValues, thereIsChange]);

    return { users, totalPages, loading, error, setThereIsChange }; // Return the state and setter
};

export default useFetchUsers;
