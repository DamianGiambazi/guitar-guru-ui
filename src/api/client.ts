import axios from 'axios';

/**
 * 🎸 GUITAR GURU - API Arterial Client
 * Protocol: MNAI v6.0 (Diamond Master)
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // MANDATORY: Allows browser to send/receive httpOnly cookies
    headers: {
        'Content-Type': 'application/json'
    }
});

// Artery Interceptor: Inject Access Token from LocalStorage
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('gg_access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
