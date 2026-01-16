import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { Lock, Mail, ShieldCheck, User as UserIcon, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

export const LoginView: React.FC = () => {
    const { login } = useAuth();
    const [mode, setMode] = useState<'LOGIN' | 'SIGNUP' | 'FORGOT'>('LOGIN');
    const [isAdmin, setIsAdmin] = useState(false);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsSubmitting(true);

        try {
            if (mode === 'SIGNUP') {
                await api.post('/auth/signup', { email, password, name });
                setSuccess('Arterial Pulse Sent. Verify your email to activate.');
                setMode('LOGIN');
            } else if (mode === 'FORGOT') {
                await api.post('/auth/forgot-password', { email, type: isAdmin ? 'admin' : 'student' });
                setSuccess('Reset Artery Dispatched. Check your inbox.');
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
                <p className="text-hedera-blue uppercase tracking-widest text-[10px] font-bold">The Diamond Master Engine</p>
            </div>

            <div className="bg-[#2a2a2a] border border-white/5 rounded-2xl p-8 shadow-2xl">
                {mode === 'LOGIN' && (
                    <div className="flex bg-mine-shaft p-1 rounded-lg mb-8">
                        <button onClick={() => setIsAdmin(false)} className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${!isAdmin ? 'bg-hedera-purple text-white shadow-lg' : 'text-gray-400'}`}>STUDENT</button>
                        <button onClick={() => setIsAdmin(true)} className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${isAdmin ? 'bg-hedera-purple text-white shadow-lg' : 'text-gray-400'}`}>ADMIN</button>
                    </div>
                )}

                <div className="mb-6 text-center">
                    <h2 className="text-lg font-light text-white uppercase tracking-widest">
                        {mode === 'LOGIN' ? 'Initiate Session' : mode === 'SIGNUP' ? 'Create Identity' : 'Recover Substrate'}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'SIGNUP' && (
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5 ml-1">Identity Name</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-mine-shaft border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-hedera-purple outline-none transition-all" placeholder="Full Name" />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5 ml-1">Email Artery</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-mine-shaft border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-hedera-purple outline-none transition-all" placeholder="name@domain.com" />
                        </div>
                    </div>

                    {mode !== 'FORGOT' && (
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5 ml-1">Secure Substrate</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-mine-shaft border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-hedera-purple outline-none transition-all" placeholder="••••••••" />
                            </div>
                        </div>
                    )}

                    {error && <div className="flex items-center gap-2 text-red-400 text-[10px] bg-red-400/10 p-3 rounded-lg border border-red-400/20"><AlertCircle size={14} /> {error}</div>}
                    {success && <div className="flex items-center gap-2 text-emerald text-[10px] bg-emerald/10 p-3 rounded-lg border border-emerald/20"><CheckCircle size={14} /> {success}</div>}

                    <button type="submit" disabled={isSubmitting} className="w-full bg-ultra-gradient hover:opacity-90 text-white font-bold py-3 rounded-xl shadow-lg shadow-hedera-purple/20 transition-all active:scale-[0.98] disabled:opacity-50">
                        {isSubmitting ? 'PROCESSING...' : mode === 'FORGOT' ? 'SEND RESET LINK' : 'INITIATE SESSION'}
                    </button>
                </form>

                <div className="mt-6 text-center space-y-4">
                    {mode === 'LOGIN' ? (
                        <>
                            <button onClick={() => setMode('SIGNUP')} className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-hedera-blue transition-colors font-bold">No substrate? Sign up</button>
                            <div><button onClick={() => setMode('FORGOT')} className="text-[10px] uppercase tracking-widest text-gray-600 hover:text-gray-400 transition-colors">Forgotten password?</button></div>
                        </>
                    ) : (
                        <button onClick={() => setMode('LOGIN')} className="flex items-center justify-center gap-2 w-full text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors font-bold"><ArrowLeft size={12}/> Back to Login</button>
                    )}
                </div>
            </div>
            <div className="mt-8 text-center text-[10px] text-gray-600 uppercase tracking-widest">◈ Canonical Engine: Ver_03 ◈ Identity Persistent</div>
        </div>
    );
};
