import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginView } from './views/LoginView';
import { ResetPasswordView } from './views/ResetPasswordView';

/**
 * 🎸 GUITAR GURU - Body (v1.2 Path-Aware)
 * Protocol: MNAI v6.0 (Diamond Master)
 */

const DashboardStub = () => {
  const { user, logout } = useAuth();
  return (
    <div className="text-center animate-in zoom-in duration-500">
      <div className="mb-6 inline-flex p-4 rounded-full bg-emerald/10 border border-emerald/20 text-emerald">
         <div className="w-16 h-16 rounded-full bg-ultra-gradient flex items-center justify-center text-white text-2xl font-bold">
            {user?.name.charAt(0)}
         </div>
      </div>
      <h2 className="text-3xl font-light tracking-tighter mb-2">Welcome back, {user?.name}</h2>
      <p className="text-hedera-blue uppercase tracking-widest text-[10px] font-bold mb-8">
        Access Granted ◈ Role: {user?.type.toUpperCase()}
      </p>
      <button onClick={logout} className="text-xs font-bold tracking-widest text-gray-500 hover:text-red-400 transition-colors uppercase">
        🚪 Terminate Session
      </button>
    </div>
  );
};

function AppContent() {
  const { user, isLoading } = useAuth();
  const [isResetPath, setIsResetPath] = useState(false);

  // Path Sentinel: Detect Reset Artery in URL
  useEffect(() => {
    if (window.location.pathname === '/reset-password') {
        setIsResetPath(true);
    }
  }, []);

  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-mine-shaft flex items-center justify-center">
        <div className="text-hedera-purple animate-pulse font-mono text-xs tracking-widest">
          ⠋ BIOPSYING IDENTITY...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mine-shaft text-white flex items-center justify-center p-8 selection:bg-hedera-purple/30">
      {isResetPath ? (
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
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
