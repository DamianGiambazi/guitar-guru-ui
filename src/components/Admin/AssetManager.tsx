import React, { useState } from 'react';
import { Upload, FileText, Trash2, Link as LinkIcon, CheckCircle } from 'lucide-react';
import api from '../../api/client';

interface AssetManagerProps {
    lessonId: string;
}

export const AssetManager: React.FC<AssetManagerProps> = ({ lessonId }) => {
    const [file, setFile] = useState<File | null>(null);
    const [assetType, setAssetType] = useState('PDF');
    const [isUploading, setIsUploading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        setSuccess(false);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('lessonId', lessonId);
        formData.append('assetType', assetType);
        formData.append('displayName', file.name);

        try {
            await api.post('/assets/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccess(true);
            setFile(null);
        } catch (err) {
            console.error('🚨 Asset Graft Failed', err);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="p-6 border-2 border-dashed border-white/5 rounded-2xl bg-mine-shaft/50 text-center">
                <input 
                    type="file" 
                    id="file-upload" 
                    className="hidden" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                    <div className="p-4 rounded-full bg-ultra-gradient/10 text-hedera-blue">
                        <Upload size={24} />
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-tighter">
                        {file ? file.name : 'Select Soft Tissue (PDF/MP3)'}
                    </span>
                </label>
            </div>

            <div className="flex gap-4">
                <select 
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value)}
                    className="flex-1 bg-mine-shaft border border-white/10 rounded-xl py-3 px-4 text-xs font-bold text-white outline-none focus:border-hedera-purple transition-all"
                >
                    <option value="PDF">DOC: PDF</option>
                    <option value="AUDIO">AUDIO: MP3</option>
                    <option value="IMAGE">IMG: DIAGRAM</option>
                </select>

                <button 
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    className="flex-[2] bg-ultra-gradient text-white text-[10px] font-bold uppercase tracking-widest rounded-xl disabled:opacity-50 transition-all hover:opacity-90 active:scale-95"
                >
                    {isUploading ? 'GRAFTING...' : 'CONFIRM GRAFT'}
                </button>
            </div>

            {success && (
                <div className="flex items-center gap-2 text-emerald text-[10px] font-bold uppercase justify-center animate-bounce">
                    <CheckCircle size={14} /> Tissue Grafted Successfully
                </div>
            )}
        </div>
    );
};
