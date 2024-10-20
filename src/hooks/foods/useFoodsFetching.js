import { useState, useEffect, useCallback } from "react";
import apiClient from "../../utils/axiosConfig";
import useDebounce from "../useDebounce";

export default function useFoodsFetching({ limit, page, setTotalPages, search, category, changes, setChanges }) {
    const [foods, setFoods] = useState([]);
    const [foodFetchingLoading, setFoodFetchingLoading] = useState(false);
    const [foodFetchingError, setFoodFetchingError] = useState(null);
    const debouncedSearch = useDebounce(search, 500);

    // Memoize the fetchFoods function to avoid recreation on every render
    const fetchFoods = useCallback(async () => {
        setFoodFetchingLoading(true);
        try {
            const response = await apiClient.get(
                `/foods?page=${page}&limit=${limit}${debouncedSearch ? `&search=${debouncedSearch}` : ""}${category ? `&category=${category}` : ""}`
            );
            setFoods(response.data.foods);
            setTotalPages(Math.ceil(response.data.totalFoods / limit));
            if (changes) {
                setChanges(false);
            }
            setFoodFetchingError(null);
        } catch (error) {
            setFoodFetchingError(error.response?.data?.message);
        } finally {
            setFoodFetchingLoading(false);
        }
    }, [page, limit, debouncedSearch, category, changes, setChanges, setTotalPages]);

    useEffect(() => {
        fetchFoods();
    }, [fetchFoods]);

    return { foods, foodFetchingLoading, foodFetchingError };
}
