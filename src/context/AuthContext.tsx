import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

type ActorType = 'student' | 'admin';

interface User {
    id: string;
    email: string;
    name: string;
    role?: string;
    type: ActorType;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string, isAdmin: boolean) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // 🧬 VASCULAR RECOVERY: Initialize state from LocalStorage immediately
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('gg_user_cache');
        try {
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });
    const [isLoading, setIsLoading] = useState(true);

    /**
     * CY-AUTH-004: Identity Biopsy
     * Verifies the cached tissue against the live Backend.
     */
    useEffect(() => {
        const checkIdentity = async () => {
            try {
                const response = await api.get('/auth/me');
                if (response.data.status === 'success') {
                    const freshUser = response.data.data.user;
                    setUser(freshUser);
                    localStorage.setItem('gg_user_cache', JSON.stringify(freshUser));
                }
            } catch (error) {
                // If API rejects, the substrate is toxic - purge it
                setUser(null);
                localStorage.removeItem('gg_user_cache');
                localStorage.removeItem('gg_access_token');
            } finally {
                setIsLoading(false);
            }
        };
        checkIdentity();
    }, []);

    const login = async (email: string, password: string, isAdmin: boolean) => {
        const endpoint = isAdmin ? '/auth/admin/login' : '/auth/login';
        const response = await api.post(endpoint, { email, password });
        
        if (response.data.status === 'success') {
            const { accessToken, user: userData } = response.data.data;
            const authUser = { ...userData, type: isAdmin ? 'admin' : 'student' };
            
            localStorage.setItem('gg_access_token', accessToken);
            localStorage.setItem('gg_user_cache', JSON.stringify(authUser));
            
            setUser(authUser);
        }
    };

    const logout = () => {
        localStorage.removeItem('gg_access_token');
        localStorage.removeItem('gg_user_cache');
        setUser(null);
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth missing Provider');
    return context;
};
