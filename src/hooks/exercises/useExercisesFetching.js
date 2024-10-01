import { useState, useEffect } from "react";
import apiClient from "../../utils/axiosConfig";

export default function useExercisesFetching({ limit, page,
    setTotalPages, search, category, intensity, changes, setChanges }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [exercises, setExercises] = useState([]);

    const fetchExercises = async () => {
        setLoading(true);
        try {
            const response = await apiClient(
                `/exercises?page=${page}&limit=${limit}${search ? `&search=${search}` : ""
                }${category ? `&category=${category}` : ""}${intensity ? `&intensity=${intensity}` : ""
                }`
            );
            setExercises(response.data.exercises);
            setTotalPages(Math.ceil(response.data.totalExercises / limit));
            setError(null);
            if (changes) {
                setChanges(false);
            }
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch exercises");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExercises();
    }, [page, category, limit, search, intensity, changes]);

    return { loading, error, exercises, page };
}