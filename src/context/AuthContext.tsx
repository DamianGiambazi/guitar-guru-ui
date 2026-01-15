import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

type ActorType = 'student' | 'admin';

interface User {
    id: string;
    email: string;
    name: string;
    role?: string; // Optional: only for admins
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
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * CY-AUTH-004: Identity Biopsy
     * Checks if the user has an existing valid session on boot
     */
    useEffect(() => {
        const checkIdentity = async () => {
            try {
                // Biopsy the /me endpoint
                const response = await api.get('/auth/me');
                if (response.data.status === 'success') {
                    setUser(response.data.data.user);
                }
            } catch (error) {
                // If 401/Invalid, purge local substrate
                localStorage.removeItem('gg_access_token');
            } finally {
                setIsLoading(false);
            }
        };
        checkIdentity();
    }, []);

    /**
     * CY-AUTH-001: Identification Protocol
     */
    const login = async (email: string, password: string, isAdmin: boolean) => {
        const endpoint = isAdmin ? '/auth/admin/login' : '/auth/login';
        const response = await api.post(endpoint, { email, password });
        
        if (response.data.status === 'success') {
            const { accessToken, user: userData } = response.data.data;
            
            // Store short-lived token in local storage
            localStorage.setItem('gg_access_token', accessToken);
            
            // Inject user into global state
            setUser({ ...userData, type: isAdmin ? 'admin' : 'student' });
        }
    };

    /**
     * CY-UI-AUTH-006: Vascular Termination
     */
    const logout = () => {
        localStorage.removeItem('gg_access_token');
        setUser(null);
        // Direct redirection to the Gateway
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
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
