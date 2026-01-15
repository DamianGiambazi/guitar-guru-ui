import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginView } from './views/LoginView';
import { DashboardLayout } from './layouts/DashboardLayout';
import { LessonCard } from './components/Lessons/LessonCard';
import { ProgressOrb } from './components/Telemetry/ProgressOrb';
import { ContentTable } from './components/Admin/ContentTable';
import { LessonModal } from './components/Admin/LessonModal';
import { useLessons } from './hooks/useLessons';

const StudentDashboard = () => (
  <div className="animate-in fade-in slide-in-from-right-4 duration-700">
    <header className="mb-12"><h1 className="text-4xl font-light tracking-tighter text-white mb-2">Student Interface</h1><p className="text-hedera-blue text-xs uppercase tracking-widest font-bold">Engagement Telemetry: Active</p></header>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 p-8 bg-[#2a2a2a] border border-white/5 rounded-[2.5rem] shadow-2xl flex flex-col items-center">
        <ProgressOrb percentage={65} />
      </div>
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <LessonCard title="Holding the Pick" slug="holding-the-pick" difficulty="BEGINNER" status="IN_PROGRESS" duration={480} onClick={(s) => console.log(s)} />
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { lessons, isLoading, refresh } = useLessons();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);

  const handleEdit = (lesson: any) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedLesson(null);
    setIsModalOpen(true);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-700">
      <header className="mb-12 flex justify-between items-end">
        <div><h1 className="text-4xl font-light tracking-tighter text-white mb-2">Admin Surgical Suite</h1><p className="text-hedera-purple text-xs uppercase tracking-widest font-bold">Systems Access: Level 10</p></div>
        <button onClick={handleCreate} className="bg-ultra-gradient px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-hedera-purple/20 transition-transform active:scale-95">
          + Inject Material
        </button>
      </header>

      {isLoading ? (
        <div className="text-center py-20 text-gray-600 font-mono text-xs uppercase animate-pulse">⠋ Syncing Material Substrate...</div>
      ) : (
        <ContentTable 
            lessons={lessons} 
            onEdit={(id) => handleEdit(lessons.find((l: any) => l.id === id))} 
            onDelete={(id) => console.log('Delete', id)} 
        />
      )}

      <LessonModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={refresh} 
        lesson={selectedLesson}
      />
    </div>
  );
};

function AppContent() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen bg-mine-shaft flex items-center justify-center font-mono text-xs text-hedera-purple animate-pulse">⠋ BIOPSYING IDENTITY...</div>;
  if (!user) return <div className="min-h-screen bg-mine-shaft text-white flex items-center justify-center p-8"><LoginView /></div>;
  return <DashboardLayout>{user.type === 'admin' ? <AdminDashboard /> : <StudentDashboard />}</DashboardLayout>;
}

function App() {
  return <AuthProvider><AppContent /></AuthProvider>;
}

export default App;
