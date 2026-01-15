import React from 'react';
import { Play, FileText, CheckCircle2, Lock, Clock } from 'lucide-react';

interface LessonCardProps {
  title: string;
  slug: string;
  description?: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'LOCKED';
  duration?: number; // In seconds
  onClick: (slug: string) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ 
  title, 
  slug, 
  description, 
  difficulty, 
  status = 'NOT_STARTED',
  duration,
  onClick 
}) => {
  const isLocked = status === 'LOCKED';

  const difficultyColors = {
    BEGINNER: 'text-emerald border-emerald/20 bg-emerald/5',
    INTERMEDIATE: 'text-hedera-blue border-hedera-blue/20 bg-hedera-blue/5',
    ADVANCED: 'text-orange-400 border-orange-400/20 bg-orange-400/5',
    EXPERT: 'text-red-400 border-red-400/20 bg-red-400/5'
  };

  const statusIcons = {
    NOT_STARTED: <Play size={16} className="text-gray-400" />,
    IN_PROGRESS: <Clock size={16} className="text-hedera-blue animate-pulse" />,
    COMPLETED: <CheckCircle2 size={16} className="text-emerald" />,
    LOCKED: <Lock size={16} className="text-gray-600" />
  };

  return (
    <div 
      onClick={() => !isLocked && onClick(slug)}
      className={`group relative p-6 bg-[#2a2a2a] border border-white/5 rounded-3xl transition-all duration-500 
        ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-hedera-purple/30 hover:bg-[#333333] hover:-translate-y-1 shadow-xl'}`}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-ultra-gradient opacity-0 group-hover:opacity-[0.03] transition-opacity rounded-3xl"></div>

      <div className="flex flex-col h-full relative z-10">
        <div className="flex justify-between items-start mb-4">
          {/* Difficulty Badge */}
          <span className={`px-2 py-1 rounded-md text-[9px] font-bold tracking-widest border ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
          {/* Status Icon */}
          <div className="p-2 rounded-xl bg-mine-shaft border border-white/5">
            {statusIcons[status]}
          </div>
        </div>

        <h3 className="text-lg font-light tracking-tight text-white mb-2 group-hover:text-hedera-blue transition-colors">
          {title}
        </h3>
        
        <p className="text-xs text-gray-500 line-clamp-2 font-light leading-relaxed mb-6">
          {description || "No material description provided for this tissue graft."}
        </p>

        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <FileText size={12} /> Material
          </div>
          {duration && (
            <span className="text-[10px] text-gray-600 font-mono">
              {Math.floor(duration / 60)}m {duration % 60}s
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
