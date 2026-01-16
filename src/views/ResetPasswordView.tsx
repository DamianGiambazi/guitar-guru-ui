import React, { useState } from 'react';
import api from '../api/client';
import { Lock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

export const ResetPasswordView: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [error, setError] = useState<string | null>(null);

    // Extract token from Artery (URL)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return setError('Passwords do not match.');
        }

        try {
            await api.post('/auth/reset-password', {
                token,
                newPassword,
                type: 'student' // Defaulting to student for this trial
            });
            setStatus('SUCCESS');
            setTimeout(onComplete, 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Token rejection. Reset Artery expired.');
            setStatus('ERROR');
        }
    };

    if (status === 'SUCCESS') {
        return (
            <div className="text-center animate-in zoom-in duration-500">
                <div className="mb-4 inline-flex p-4 rounded-full bg-emerald/10 text-emerald">
                    <CheckCircle size={48} />
                </div>
                <h2 className="text-2xl font-light text-white">Substrate Re-ossified</h2>
                <p className="text-gray-400 mt-2">Redirecting to Login Gate...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md bg-[#2a2a2a] border border-white/5 rounded-2xl p-8 shadow-2xl animate-in fade-in duration-700">
            <div className="text-center mb-8">
                <h2 className="text-xl font-light text-white uppercase tracking-widest">Reset Artery</h2>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">Surgical Credential Recovery</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">New Password Substrate</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input 
                            type="password" required value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-mine-shaft border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-hedera-purple outline-none transition-all"
                            placeholder="New Password"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">Confirm Tissue</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input 
                            type="password" required value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-mine-shaft border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-hedera-purple outline-none transition-all"
                            placeholder="Confirm Password"
                        />
                    </div>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-400 text-[10px] bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                        <AlertCircle size={14} /> {error}
                    </div>
                )}

                <button type="submit" className="w-full bg-ultra-gradient text-white font-bold py-3 rounded-xl shadow-lg shadow-hedera-purple/20 transition-all active:scale-[0.98]">
                    RE-OSSIFY PASSWORD
                </button>
            </form>
            
            <button onClick={onComplete} className="mt-6 flex items-center justify-center gap-2 w-full text-[10px] uppercase text-gray-500 hover:text-white transition-colors">
                <ArrowLeft size={12}/> Return to Gateway
            </button>
        </div>
    );
};
