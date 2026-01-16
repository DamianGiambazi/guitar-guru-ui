import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginView } from './views/LoginView';
import { ResetPasswordView } from './views/ResetPasswordView';
import api from './api/client';

const VerifyView = ({ onComplete }: { onComplete: () => void }) => {
    const [status, setStatus] = useState<'PENDING' | 'SUCCESS' | 'ERROR'>('PENDING');
    
    useEffect(() => {
        const performHandshake = async () => {
            const token = new URLSearchParams(window.location.search).get('token');
            try {
                const res = await api.get(`/auth/verify?token=${token}`);
                if (res.data.status === 'success') setStatus('SUCCESS');
                else setStatus('ERROR');
            } catch { setStatus('ERROR'); }
            setTimeout(onComplete, 3000);
        };
        performHandshake();
    }, [onComplete]);

    return (
        <div className="text-center animate-pulse font-mono text-xs tracking-widest">
            {status === 'PENDING' && "⠋ ANALYZING ARTERIAL TOKEN..."}
            {status === 'SUCCESS' && <span className="text-emerald">✔ ACCOUNT ACTIVATED. REDIRECTING...</span>}
            {status === 'ERROR' && <span className="text-red-400">✖ ACTIVATION FAILURE. TOKEN EXPIRED.</span>}
        </div>
    );
};

const DashboardStub = () => {
  const { user, logout } = useAuth();
  return (
    <div className="text-center animate-in zoom-in duration-500">
      <h2 className="text-3xl font-light tracking-tighter mb-2">Welcome back, {user?.name}</h2>
      <p className="text-hedera-blue uppercase tracking-widest text-[10px] font-bold mb-8">Access Granted</p>
      <button onClick={logout} className="text-xs font-bold text-gray-500 hover:text-red-400 uppercase">🚪 Terminate Session</button>
    </div>
  );
};

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  if (isLoading && !user) return <div className="min-h-screen bg-mine-shaft flex items-center justify-center font-mono text-xs text-hedera-purple animate-pulse">⠋ BIOPSYING IDENTITY...</div>;

  return (
    <div className="min-h-screen bg-mine-shaft text-white flex items-center justify-center p-8">
      {currentPath === '/api/auth/verify' ? (
        <VerifyView onComplete={() => { window.location.href = '/'; }} />
      ) : currentPath === '/reset-password' ? (
        <ResetPasswordView onComplete={() => { window.location.href = '/'; }} />
      ) : user ? (
        <DashboardStub />
      ) : (
        <LoginView />
      )}
    </div>
  );
}

function App() {
  return <AuthProvider><AppContent /></AuthProvider>;
}

export default App;
