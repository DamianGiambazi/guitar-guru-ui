import React from 'react';
import { Sidebar } from '../components/Navigation/Sidebar';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-mine-shaft overflow-hidden selection:bg-hedera-purple/30">
      {/* Structural Bone: Sidebar */}
      <Sidebar />
      
      {/* Content Theater */}
      <main className="flex-1 overflow-y-auto relative custom-scrollbar">
        {/* Background Glow Overlay */}
        <div className="absolute top-0 left-0 w-full h-64 bg-ultra-gradient opacity-[0.03] pointer-events-none"></div>
        
        <div className="p-8 relative z-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
