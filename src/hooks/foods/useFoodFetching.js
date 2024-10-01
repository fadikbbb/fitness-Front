import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../utils/axiosConfig";

export default function useFoodFetching() {
    const [foodData, setFoodData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { foodId } = useParams();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get(`/foods/${foodId}`);
            setFoodData(response.data.food);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [foodId]);

    return { foodData, isLoading, error };
}