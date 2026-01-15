import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { Lock, Mail, ShieldCheck, User as UserIcon, AlertCircle, UserPlus, CheckCircle } from 'lucide-react';

export const LoginView: React.FC = () => {
    const { login } = useAuth();
    const [isSignup, setIsSignup] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setIsSubmitting(true);
        try {
            if (isSignup) {
                const response = await api.post('/auth/signup', { email, password, name });
                if (response.data.status === 'success') {
                    setSuccessMessage('Vascular Bridge Active. Please check your email.');
                    setIsSignup(false);
                }
            } else {
                await login(email, password, isAdmin);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Surgical failure at the Gateway.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-light tracking-tighter mb-2">Guitar Guru</h1>
                <p className="text-hedera-blue uppercase tracking-widest text-[10px] font-bold">
                    The Diamond Master Engine
                </p>
            </div>

            <div className="bg-[#2a2a2a] border border-white/5 rounded-2xl p-8 shadow-2xl">
                {!isSignup && (
                    <div className="flex bg-mine-shaft p-1 rounded-lg mb-8">
                        <button onClick={() => setIsAdmin(false)} className={`flex-1 py-2 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-2 ${!isAdmin ? 'bg-hedera-purple text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}><UserIcon size={14} /> STUDENT</button>
                        <button onClick={() => setIsAdmin(true)} className={`flex-1 py-2 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-2 ${isAdmin ? 'bg-hedera-purple text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}><ShieldCheck size={14} /> ADMIN</button>
                    </div>
                )}

                {isSignup && <div className="mb-8 text-center"><h2 className="text-xl font-light text-hedera-purple flex items-center justify-center gap-2"><UserPlus size={20} /> Create Student Tissue</h2></div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignup && (
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5 ml-1">Identity Name</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-mine-shaft border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-hedera-purple focus:ring-1 focus:ring-hedera-purple outline-none transition-all" placeholder="Full Name" />
                            </div>
                        </div>
                    )}
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5 ml-1">Email Artery</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-mine-shaft border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-hedera-purple focus:ring-1 focus:ring-hedera-purple outline-none transition-all" placeholder="name@domain.com" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5 ml-1">Secure Substrate</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-mine-shaft border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-hedera-purple focus:ring-1 focus:ring-hedera-purple outline-none transition-all" placeholder="••••••••" />
                        </div>
                    </div>
                    {error && <div className="flex items-center gap-2 text-red-400 text-[10px] bg-red-400/10 p-3 rounded-lg border border-red-400/20"><AlertCircle size={14} /> {error}</div>}
                    {successMessage && <div className="flex items-center gap-2 text-emerald text-[10px] bg-emerald/10 p-3 rounded-lg border border-emerald/20"><CheckCircle size={14} /> {successMessage}</div>}
                    <button type="submit" disabled={isSubmitting} className="w-full bg-ultra-gradient hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg shadow-hedera-purple/20 transition-all transform active:scale-[0.98] disabled:opacity-50">{isSubmitting ? 'VERIFYING...' : isSignup ? 'CREATE IDENTITY' : 'INITIATE SESSION'}</button>
                </form>

                <div className="mt-6 text-center space-y-4">
                    <button onClick={() => setIsSignup(!isSignup)} className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-hedera-blue transition-colors font-bold">
                        {isSignup ? 'Already ossified? Log in' : 'No substrate? Sign up'}
                    </button>
                </div>
            </div>
            
            <div className="mt-8 text-center text-[10px] text-gray-600 uppercase tracking-widest">
                ◈ System Secured: MNAI v6.0 Diamond Master [v1.1 Active]
            </div>
        </div>
    );
};
