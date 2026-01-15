import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Shield, 
  History,
  FileCode,
  Layers,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentView }) => {
  const { user, logout } = useAuth();

  const NavItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <button 
      onClick={() => onNavigate(label.toUpperCase())}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
        ${currentView === label.toUpperCase() ? 'bg-ultra-gradient text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
    >
      <Icon size={18} />
      <span className="text-xs font-bold tracking-widest uppercase">{label}</span>
    </button>
  );

  return (
    <aside className="w-64 h-full bg-[#1a1a1a] border-r border-white/5 flex flex-col p-4 justify-between">
      <div className="space-y-8">
        <div className="px-4 py-2">
          <h2 className="text-xl font-light tracking-tighter text-white">Guitar Guru</h2>
          <div className="h-0.5 w-8 bg-ultra-gradient mt-1 rounded-full"></div>
        </div>

        <nav className="space-y-2">
          <NavItem icon={LayoutDashboard} label="Dashboard" />
          
          {user?.type === 'admin' ? (
            <>
              <NavItem icon={FileCode} label="Lessons" />
              <NavItem icon={Layers} label="Curricula" />
              <NavItem icon={Shield} label="Admin Vitals" />
            </>
          ) : (
            <>
              <NavItem icon={BookOpen} label="My Path" />
              <NavItem icon={History} label="Practice Log" />
            </>
          )}
          
          <NavItem icon={Settings} label="Preferences" />
        </nav>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-mine-shaft rounded-2xl border border-white/5">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Active Tissue</p>
          <p className="text-sm font-medium text-white truncate">{user?.name}</p>
        </div>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-red-400 transition-all group"
        >
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-xs font-bold tracking-widest uppercase">Terminate</span>
        </button>
      </div>
    </aside>
  );
};
