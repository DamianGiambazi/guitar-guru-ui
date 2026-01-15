import React from 'react';
import { Edit3, Trash2, ExternalLink, Eye, EyeOff } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  isPublished: boolean;
}

interface ContentTableProps {
  lessons: Lesson[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ContentTable: React.FC<ContentTableProps> = ({ lessons, onEdit, onDelete }) => {
  return (
    <div className="w-full overflow-hidden bg-[#2a2a2a] border border-white/5 rounded-3xl shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 border-b border-white/5">
            <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Material Title</th>
            <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Difficulty</th>
            <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Status</th>
            <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold text-right">Actions</th>
          </tr>
        </thead>
          <tbody className="divide-y divide-white/5">
            {lessons.map((lesson) => (
              <tr key={lesson.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">{lesson.title}</span>
                    <span className="text-[10px] text-gray-500 font-mono italic">/{lesson.slug}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] px-2 py-1 rounded bg-mine-shaft border border-white/10 text-hedera-blue font-bold">
                    {lesson.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {lesson.isPublished ? (
                      <span className="flex items-center gap-1 text-[10px] text-emerald font-bold uppercase tracking-tighter">
                        <Eye size={12} /> Live
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                        <EyeOff size={12} /> Draft
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(lesson.id)} className="p-2 hover:bg-hedera-purple/20 text-hedera-purple rounded-lg transition-all">
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => onDelete(lesson.id)} className="p-2 hover:bg-red-400/20 text-red-400 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
};
