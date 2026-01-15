import React, { useState, useEffect } from 'react';
import { X, Save, Edit3, Trash2, AlertTriangle, ShieldCheck } from 'lucide-react';
import api from '../../api/client';
import { AssetManager } from './AssetManager';

interface LessonModalProps { isOpen: boolean; onClose: () => void; onSuccess: () => void; lesson: any | null; }

export const LessonModal: React.FC<LessonModalProps> = ({ isOpen, onClose, onSuccess, lesson }) => {
    const [mode, setMode] = useState<'VIEW' | 'EDIT' | 'DELETE'>('VIEW');
    const [activeTab, setActiveTab] = useState<'INFO' | 'ASSETS'>('INFO');
    const [formData, setFormData] = useState({ title: '', difficulty: 'BEGINNER', description: '', isPublished: false });

    useEffect(() => {
        if (lesson) {
            setFormData({ title: lesson.title, difficulty: lesson.difficulty, description: lesson.description || '', isPublished: lesson.isPublished });
            setMode('VIEW');
        } else {
            setFormData({ title: '', difficulty: 'BEGINNER', description: '', isPublished: false });
            setMode('EDIT');
        }
    }, [lesson]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (lesson) { await api.patch(`/lessons/${lesson.id}`, formData); } 
            else { const slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''); await api.post('/lessons', { ...formData, slug }); }
            onSuccess(); onClose();
        } catch (err) { console.error(err); }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/lessons/${lesson.id}`);
            onSuccess(); onClose();
        } catch (err) { console.error(err); }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className={`bg-[#222222] w-full max-w-xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden transition-all ${mode === 'DELETE' ? 'border-red-500/50' : ''}`}>
                <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${mode === 'DELETE' ? 'bg-red-500' : 'bg-ultra-gradient'} text-white`}>
                            {mode === 'DELETE' ? <AlertTriangle size={18}/> : <ShieldCheck size={18} />}
                        </div>
                        <h2 className="text-xl font-light text-white tracking-tight">
                            {mode === 'DELETE' ? 'Confirm Excision' : lesson ? (mode === 'VIEW' ? 'Material Overview' : 'Modify Tissue') : 'Inject Material'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500"><X size={20} /></button>
                </div>

                {mode !== 'DELETE' && (
                    <div className="flex border-b border-white/5 px-6">
                        <button onClick={() => setActiveTab('INFO')} className={`px-4 py-4 text-[10px] font-bold uppercase tracking-widest border-b-2 ${activeTab === 'INFO' ? 'border-hedera-purple text-white' : 'border-transparent text-gray-500'}`}>General</button>
                        {lesson && <button onClick={() => setActiveTab('ASSETS')} className={`px-4 py-4 text-[10px] font-bold uppercase tracking-widest border-b-2 ${activeTab === 'ASSETS' ? 'border-hedera-purple text-white' : 'border-transparent text-gray-500'}`}>Soft Tissue ({lesson.assets?.length || 0})</button>}
                    </div>
                )}

                <div className="p-8">
                    {mode === 'DELETE' ? (
                        <div className="text-center space-y-6 py-4 animate-in zoom-in duration-300">
                             <p className="text-gray-300 text-sm leading-relaxed">You are about to permanently excise <span className="text-white font-bold">{lesson.title}</span>. This cannot be undone.</p>
                             <div className="flex gap-4">
                                <button onClick={() => setMode('VIEW')} className="flex-1 py-4 bg-white/5 text-gray-400 rounded-xl text-[10px] font-bold uppercase tracking-widest">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 py-4 bg-red-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest">Confirm Delete</button>
                             </div>
                        </div>
                    ) : activeTab === 'INFO' ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                             <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Title</label>
                                    {mode === 'VIEW' ? <p className="text-lg text-white font-light">{formData.title}</p> : <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-mine-shaft border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-hedera-purple"/>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Difficulty</label>
                                        {mode === 'VIEW' ? <p className="text-sm text-hedera-blue font-bold">{formData.difficulty}</p> : <select value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})} className="w-full bg-mine-shaft border border-white/10 rounded-xl py-3 px-4 text-sm text-white"><option value="BEGINNER">BEGINNER</option><option value="INTERMEDIATE">INTERMEDIATE</option></select>}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Status</label>
                                        {mode === 'VIEW' ? <p className={formData.isPublished ? 'text-emerald text-sm font-bold' : 'text-gray-500 text-sm font-bold'}>{formData.isPublished ? 'LIVE' : 'DRAFT'}</p> : <button type="button" onClick={() => setFormData({...formData, isPublished: !formData.isPublished})} className={`w-full py-3 rounded-xl text-[10px] font-bold transition-all ${formData.isPublished ? 'bg-emerald/20 text-emerald border border-emerald/50' : 'bg-white/5 text-gray-500 border border-white/10'}`}>{formData.isPublished ? 'LIVE' : 'DRAFT'}</button>}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Description</label>
                                    <p className={`text-sm leading-relaxed ${mode === 'VIEW' ? 'text-gray-400' : 'text-white'}`}>{formData.description || 'No description tissue.'}</p>
                                    {mode === 'EDIT' && <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="mt-2 w-full bg-mine-shaft border border-white/10 rounded-xl py-3 px-4 text-sm outline-none resize-none"/>}
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                {mode === 'VIEW' ? (
                                    <>
                                        <button type="button" onClick={() => setMode('DELETE')} className="p-4 bg-white/5 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"><Trash2 size={18}/></button>
                                        <button type="button" onClick={() => setMode('EDIT')} className="flex-1 bg-ultra-gradient text-white text-[10px] font-bold uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-hedera-purple/20"><Edit3 size={16}/> Enter Edit Mode</button>
                                    </>
                                ) : ( <button type="submit" className="w-full bg-ultra-gradient text-white text-[10px] font-bold uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-hedera-purple/20"><Save size={16}/> Commit Changes</button> )}
                            </div>
                        </form>
                    ) : (
                        <AssetManager lessonId={lesson.id} existingAssets={lesson.assets || []} onRefresh={onSuccess} />
                    )}
                </div>
            </div>
        </div>
    );
};
