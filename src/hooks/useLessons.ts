import { useState, useEffect, useCallback } from 'react';
import api from '../api/client';

export const useLessons = () => {
    const [lessons, setLessons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLessons = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/lessons');
            // Backend v2.9 correctly includes assets in this payload
            setLessons(response.data.data.lessons);
            setError(null);
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message;
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLessons();
    }, [fetchLessons]);

    return { lessons, isLoading, error, refresh: fetchLessons };
};
