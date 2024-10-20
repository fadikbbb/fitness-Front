import { useState, useEffect, useCallback } from "react";
import apiClient from "../../utils/axiosConfig";
import useDebounce from "../useDebounce";
export default function useExercisesFetching({
    limit,
    search,
    category,
    intensity,
    changes,
    setChanges,
    page,
    setTotalPages
}) {
    const [exercisesLoading, setExercisesLoading] = useState(true);
    const [exercisesFetchingError, setExercisesFetchingError] = useState(null);
    const [exercises, setExercises] = useState([]);
    const debouncedSearch = useDebounce(search, 500);

    // Memoize the fetch function to avoid recreation on every render
    const fetchExercises = useCallback(async () => {
        setExercisesLoading(true);
        try {
            const response = await apiClient(
                `/exercises?page=${page}&limit=${limit}${debouncedSearch ? `&search=${debouncedSearch}` : ""}${category ? `&category=${category}` : ""}${intensity ? `&intensity=${intensity}` : ""}`
            );
            setExercises(response.data.exercises);
            setTotalPages(Math.ceil(response.data.totalExercises / limit));
            setExercisesFetchingError(null);
            if (changes) {
                setChanges(false);
            }
        } catch (error) {
            setExercisesFetchingError(error.response?.data?.message || "Failed to fetch exercises");
        } finally {
            setExercisesLoading(false);
        }
    }, [page, limit, debouncedSearch, category, intensity, changes, setChanges, setTotalPages]);

    useEffect(() => {
        fetchExercises();
    }, [fetchExercises]);

    return { exercisesLoading, exercisesFetchingError, exercises, page };
}
