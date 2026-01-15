import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginView } from './views/LoginView';
import { PlaceholderView } from './views/PlaceholderView';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ContentTable } from './components/Admin/ContentTable';
import { LessonModal } from './components/Admin/LessonModal';
import { useLessons } from './hooks/useLessons';

const StudentDashboard = () => (
  <div className="animate-in fade-in slide-in-from-right-4 duration-700">
    <header className="mb-12"><h1 className="text-4xl font-light tracking-tighter text-white mb-2">Student Interface</h1><p className="text-hedera-blue text-xs uppercase tracking-widest font-bold">Engagement Telemetry: Active</p></header>
    <div className="p-20 border border-dashed border-white/10 rounded-[2.5rem] text-center text-gray-600 uppercase tracking-widest text-xs">
        ⠋ Awaiting Curriculum Orb Injection...
    </div>
  </div>
);

const AdminDashboard = () => {
  const { lessons, isLoading, refresh, error } = useLessons();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
  const { logout } = useAuth();

  useEffect(() => { if (error?.includes('401')) logout(); }, [error, logout]);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-700">
      <header className="mb-12 flex justify-between items-end">
        <div><h1 className="text-4xl font-light tracking-tighter text-white mb-2">Admin Surgical Suite</h1><p className="text-hedera-purple text-xs uppercase tracking-widest font-bold">Systems Access: Level 10</p></div>
        <button onClick={() => { setSelectedLesson(null); setIsModalOpen(true); }} className="bg-ultra-gradient px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-hedera-purple/20 transition-transform active:scale-95">+ Inject Material</button>
      </header>
      {isLoading ? <div className="text-center py-20 text-gray-600 font-mono text-xs uppercase animate-pulse">⠋ Syncing Substrate...</div> : 
        <ContentTable lessons={lessons} onSelect={(l) => { setSelectedLesson(l); setIsModalOpen(true); }} onDelete={(id) => { setSelectedLesson(lessons.find((l:any)=>l.id===id)); setIsModalOpen(true); }} />
      }
      <LessonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={refresh} lesson={selectedLesson} />
    </div>
  );
};

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState('DASHBOARD');

  if (isLoading && !user) return <div className="min-h-screen bg-mine-shaft flex items-center justify-center font-mono text-xs text-hedera-purple animate-pulse">⠋ BIOPSYING IDENTITY...</div>;
  if (!user) return <div className="min-h-screen bg-mine-shaft text-white flex items-center justify-center p-8"><LoginView /></div>;

  const renderView = () => {
    switch(currentView) {
      case 'DASHBOARD': return user.type === 'admin' ? <AdminDashboard /> : <StudentDashboard />;
      case 'LESSONS': return <AdminDashboard />;
      case 'CURRICULA': return <PlaceholderView title="Curriculum Mapping" />;
      case 'ADMIN VITALS': return <PlaceholderView title="System Telemetry" />;
      case 'PREFERENCES': return <PlaceholderView title="User Settings" />;
      default: return <AdminDashboard />;
    }
  };

  return <DashboardLayout onNavigate={setCurrentView} currentView={currentView}>{renderView()}</DashboardLayout>;
}

function App() {
  return <AuthProvider><AppContent /></AuthProvider>;
}

export default App;
