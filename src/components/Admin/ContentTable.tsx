import React from 'react';
import { FileText, Music, Image as ImageIcon, Trash2, Eye, EyeOff } from 'lucide-react';

interface Asset { assetType: string; }
interface Lesson {
  id: string; title: string; slug: string; difficulty: string;
  isPublished: boolean; assets?: Asset[];
}

interface ContentTableProps {
  lessons: Lesson[];
  onSelect: (lesson: Lesson) => void;
  onDelete: (id: string) => void;
}

export const ContentTable: React.FC<ContentTableProps> = ({ lessons, onSelect, onDelete }) => {
  const getAssetIcon = (type: string) => {
    switch(type) {
      case 'PDF': return <FileText size={12} className="text-red-400" />;
      case 'AUDIO': return <Music size={12} className="text-hedera-blue" />;
      case 'IMAGE': return <ImageIcon size={12} className="text-emerald" />;
      default: return <FileText size={12} />;
    }
  };

  return (
    <div className="w-full overflow-hidden bg-[#2a2a2a] border border-white/5 rounded-3xl shadow-2xl animate-in fade-in duration-500">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 border-b border-white/5">
            <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Material Title</th>
            <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Difficulty</th>
            <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Soft Tissue</th>
            <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Status</th>
            <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {lessons.map((lesson) => (
            <tr key={lesson.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer" onClick={() => onSelect(lesson)}>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white group-hover:text-hedera-blue transition-colors">{lesson.title}</span>
                  <span className="text-[10px] text-gray-500 font-mono italic">/{lesson.slug}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-[10px] px-2 py-1 rounded bg-mine-shaft border border-white/10 text-hedera-blue font-bold">{lesson.difficulty}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-1.5">
                  {lesson.assets && lesson.assets.length > 0 ? (
                    lesson.assets.map((a, i) => <div key={i} title={a.assetType}>{getAssetIcon(a.assetType)}</div>)
                  ) : <span className="text-[10px] text-gray-600 italic">None</span>}
                </div>
              </td>
              <td className="px-6 py-4">
                {lesson.isPublished ? <span className="text-[10px] text-emerald font-bold uppercase flex items-center gap-1"><Eye size={12}/> Live</span> : <span className="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1"><EyeOff size={12}/> Draft</span>}
              </td>
              <td className="px-6 py-4 text-right">
                <button onClick={(e) => { e.stopPropagation(); onDelete(lesson.id); }} className="p-2 hover:bg-red-400/20 text-gray-600 hover:text-red-400 rounded-lg transition-all opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
