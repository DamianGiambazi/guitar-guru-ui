import React from 'react';
import { Construction } from 'lucide-react';
export const PlaceholderView: React.FC<{ title: string }> = ({ title }) => (
  <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="p-6 rounded-full bg-white/5 border border-white/10 text-hedera-blue mb-6"><Construction size={48} className="animate-bounce" /></div>
    <h1 className="text-4xl font-light tracking-tighter text-white mb-2">{title}</h1>
    <p className="text-gray-500 text-sm font-light uppercase tracking-widest">Organ Substrate under Construction</p>
  </div>
);
