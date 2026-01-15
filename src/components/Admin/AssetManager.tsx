import React, { useState } from 'react';
import { Upload, FileText, Music, Image as ImageIcon, Trash2, CheckCircle } from 'lucide-react';
import api from '../../api/client';

interface Asset { id: string; assetType: string; displayName: string; }
interface AssetManagerProps { lessonId: string; existingAssets: Asset[]; onRefresh: () => void; }

export const AssetManager: React.FC<AssetManagerProps> = ({ lessonId, existingAssets, onRefresh }) => {
    const [file, setFile] = useState<File | null>(null);
    const [assetType, setAssetType] = useState('PDF');
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('lessonId', lessonId);
        formData.append('assetType', assetType);
        formData.append('displayName', file.name);
        try {
            await api.post('/assets/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setFile(null);
            onRefresh();
        } catch (err) { console.error(err); } finally { setIsUploading(false); }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Current Soft Tissue</h4>
                <div className="grid grid-cols-1 gap-2">
                    {existingAssets.map((asset) => (
                        <div key={asset.id} className="flex items-center justify-between p-3 bg-mine-shaft/50 border border-white/5 rounded-xl">
                            <div className="flex items-center gap-3">
                                <FileText size={16} className="text-gray-500" />
                                <div>
                                    <p className="text-xs font-medium text-white">{asset.displayName}</p>
                                    <p className="text-[9px] text-gray-600 font-mono uppercase">{asset.assetType}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pt-6 border-t border-white/5">
                <div className="p-6 border-2 border-dashed border-white/5 rounded-2xl bg-mine-shaft/50 text-center mb-4 cursor-pointer relative">
                    <input type="file" id="file-upload" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                        <Upload size={20} className="text-hedera-blue" />
                        <span className="text-[10px] font-bold text-white uppercase">{file ? file.name : 'Select File'}</span>
                    </label>
                </div>
                <div className="flex gap-4">
                    <select value={assetType} onChange={(e) => setAssetType(e.target.value)} className="flex-1 bg-mine-shaft border border-white/10 rounded-xl py-3 px-4 text-[10px] font-bold text-white uppercase outline-none"><option value="PDF">PDF</option><option value="AUDIO">MP3</option></select>
                    <button onClick={handleUpload} disabled={!file || isUploading} className="flex-[2] bg-ultra-gradient text-white text-[10px] font-bold uppercase py-4 rounded-xl disabled:opacity-30">{isUploading ? 'GRAFTING...' : 'CONFIRM GRAFT'}</button>
                </div>
            </div>
        </div>
    );
};
