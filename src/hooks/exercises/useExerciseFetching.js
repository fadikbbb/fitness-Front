import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../utils/axiosConfig";

export default function useFoodFetching() {
    const [exercise, setExercise] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { exerciseId } = useParams();

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const response = await apiClient.get(`/exercises/${exerciseId}`);
                setExercise(response.data.exercise);
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch exercise");
            } finally {
                setLoading(false);
            }
        };

        fetchExercise();
    }, [exerciseId]);

    return { exercise, loading, error };
}