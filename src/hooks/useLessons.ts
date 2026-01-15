import { useState, useEffect } from 'react';
import api from '../api/client';

export const useLessons = () => {
    const [lessons, setLessons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLessons = async () => {
        try {
            const response = await api.get('/lessons');
            setLessons(response.data.data.lessons);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLessons();
    }, []);

    return { lessons, isLoading, error, refresh: fetchLessons };
};
