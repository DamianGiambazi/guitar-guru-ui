import React, { useState, useEffect } from 'react';
import { X, Save, FileText, Database, ShieldCheck } from 'lucide-react';
import api from '../../api/client';
import { AssetManager } from './AssetManager';

interface LessonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    lesson: any | null; // Null means 'Create' mode
}

export const LessonModal: React.FC<LessonModalProps> = ({ isOpen, onClose, onSuccess, lesson }) => {
    const [activeTab, setActiveTab] = useState<'INFO' | 'ASSETS'>('INFO');
    const [formData, setFormData] = useState({
        title: '',
        difficulty: 'BEGINNER',
        description: '',
        isPublished: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (lesson) {
            setFormData({
                title: lesson.title,
                difficulty: lesson.difficulty,
                description: lesson.description || '',
                isPublished: lesson.isPublished
            });
        } else {
            setFormData({ title: '', difficulty: 'BEGINNER', description: '', isPublished: false });
        }
    }, [lesson]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (lesson) {
                // CY-LSN-002: Update Tissue
                await api.patch(`/lessons/${lesson.id}`, formData);
            } else {
                // CY-LSN-001: Create Tissue
                const slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                await api.post('/lessons', { ...formData, slug });
            }
            onSuccess();
            onClose();
        } catch (err) {
            console.error('🚨 Surgical failure', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-[#222222] w-full max-w-xl border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                {/* Header Section */}
                <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-ultra-gradient text-white"><ShieldCheck size={18} /></div>
                        <h2 className="text-xl font-light text-white tracking-tight">
                            {lesson ? 'Modify Material' : 'Inject New Material'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500 transition-colors"><X size={20} /></button>
                </div>

                {/* Tab Artery */}
                <div className="flex border-b border-white/5 px-6">
                    <button 
                        onClick={() => setActiveTab('INFO')}
                        className={`px-4 py-4 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'INFO' ? 'border-hedera-purple text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                    >
                        General Tissue
                    </button>
                    {lesson && (
                        <button 
                            onClick={() => setActiveTab('ASSETS')}
                            className={`px-4 py-4 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'ASSETS' ? 'border-hedera-purple text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                        >
                            Soft Tissue (Assets)
                        </button>
                    )}
                </div>

                <div className="p-8">
                    {activeTab === 'INFO' ? (
                        <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-left-4 duration-500">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Lesson Title</label>
                                <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-mine-shaft border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-hedera-purple outline-none transition-all" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Difficulty</label>
                                    <select value={formData.difficulty} onChange={(e) => setFormData({...formData, difficulty: e.target.value})} className="w-full bg-mine-shaft border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none">
                                        <option value="BEGINNER">BEGINNER</option>
                                        <option value="INTERMEDIATE">INTERMEDIATE</option>
                                        <option value="ADVANCED">ADVANCED</option>
                                        <option value="EXPERT">EXPERT</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Release State</label>
                                    <div className="flex bg-mine-shaft p-1 rounded-xl border border-white/10">
                                        <button type="button" onClick={() => setFormData({...formData, isPublished: false})} className={`flex-1 py-2 text-[9px] font-bold rounded-lg transition-all ${!formData.isPublished ? 'bg-white/10 text-white' : 'text-gray-500'}`}>DRAFT</button>
                                        <button type="button" onClick={() => setFormData({...formData, isPublished: true})} className={`flex-1 py-2 text-[9px] font-bold rounded-lg transition-all ${formData.isPublished ? 'bg-emerald/20 text-emerald' : 'text-gray-500'}`}>LIVE</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Description</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full bg-mine-shaft border border-white/10 rounded-xl py-3 px-4 text-sm outline-none transition-all resize-none" />
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full bg-ultra-gradient text-white font-bold text-xs tracking-widest uppercase py-4 rounded-xl shadow-lg shadow-hedera-purple/20 transition-all flex items-center justify-center gap-2">
                                <Save size={16} /> {isSubmitting ? 'PROCESSING...' : 'COMMIT CHANGES'}
                            </button>
                        </form>
                    ) : (
                        <AssetManager lessonId={lesson.id} />
                    )}
                </div>
            </div>
        </div>
    );
};
