import { useState, useEffect } from "react";
import apiClient from "../utils/axiosConfig";
export default function useFoodsFetching({ limit, page, setPage, search, category, changes, setChanges }) {
    const [foods, setFoods] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFoods = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(
                `/foods?page=${page}&limit=${limit}${search ? `&search=${search}` : ""
                }${category ? `&category=${category}` : ""}`
            );
            setFoods(response.data.foods);
            setTotalPages(Math.ceil(response.data.totalFoods / limit));
            if (response.data.foods.length === 0) {
                setTotalPages(1);
                setPage(1);
            }
            if (changes) {
                setChanges(false);
            }
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, [page, category, limit, search, changes]);

    return { foods, totalPages, loading, error };
}