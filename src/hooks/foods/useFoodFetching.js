import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../utils/axiosConfig";

export default function useFoodFetching() {
    const [foodData, setFoodData] = useState([]);
    const [foodFetchingLoading,setFoodFetchingLoading] = useState(true);
    const [foodFetchingError,setFoodFetchingError] = useState(null);
    const { foodId } = useParams();

    // Memoize the fetchData function to avoid recreation on every render
    const fetchData = useCallback(async () => {
        try {
            setFoodFetchingLoading(true);
            const response = await apiClient.get(`/foods/${foodId}`);
            setFoodData(response.data.food);
            setFoodFetchingError(null);
        } catch (error) {
            setFoodFetchingError(error.response?.data?.message || "An error occurred");
        } finally {
            setFoodFetchingLoading(false);
        }
    }, [foodId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { foodData, foodFetchingLoading, foodFetchingError };
}
