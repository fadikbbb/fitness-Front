// useDebounce.js
import { useState, useEffect } from 'react';

/**
 * Custom hook that debounces a value.
 * @param {any} value - The value to be debounced.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {any} - The debounced value.
 */

const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function to clear the timeout if the value or delay changes
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
