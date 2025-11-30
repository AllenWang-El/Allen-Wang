
import React, { useState, useEffect } from 'react';
import { ItineraryItem, DayInfo, CategoryType } from '../types';
import { CATEGORIES } from '../constants';

interface ItineraryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (item: Partial<ItineraryItem>) => void;
    editItem?: ItineraryItem;
    days: DayInfo[];
    currentDate: string;
    isBackup?: boolean;
}

const ItineraryModal: React.FC<ItineraryModalProps> = ({ isOpen, onClose, onSave, editItem, days, currentDate, isBackup = false }) => {
    const [form, setForm] = useState<Partial<ItineraryItem>>({
        date: currentDate,
        time: '12:00',
        title: '',
        location: '',
        category: 'sightseeing',
        note: '',
        images: [],
        transport: '',
        duration: ''
    });
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (editItem) {
                setForm({ ...editItem });
            } else {
                setForm({
                    id: Date.now(),
                    date: currentDate,
                    time: '12:00',
                    title: '',
                    location: '',
                    category: 'sightseeing',
                    note: '',
                    images: [],
                    transport: '',
                    duration: ''
                });
            }
        }
    }, [isOpen, editItem, currentDate]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (!form.title) return alert("請輸入標題");
        onSave(form);
        onClose();
    };

    const addImage = () => {
        if(imageUrl && form.images) {
            setForm(prev => ({ ...prev, images: [...(prev.images || []), imageUrl] }));
            setImageUrl('');
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setForm(prev => ({ ...prev, images: [...(prev.images || []), event.target!.result as string] }));
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const removeImage = (idx: number) => {
        setForm(prev => ({ ...prev, images: prev.images?.filter((_, i) => i !== idx) }));
    };

    return (
        <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white w-full max-w-md rounded-t-3xl p-6 shadow-2xl h-[95%] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800">
                        {editItem ? '編輯' : '新增'}
                        {isBackup ? '私房景點' : '行程'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><i className="fas fa-times text-xl"></i></button>
                </div>

                <div className="space-y-4">
                    {!isBackup && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 mb-1 block">日期</label>
                                <select 
                                    value={form.date} 
                                    onChange={e => setForm({...form, date: e.target.value})}
                                    className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 outline-none focus:border-primary"
                                >
                                    {days.map(d => (
                                        <option key={d.date} value={d.date}>{d.date}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 mb-1 block">時間</label>
                                <input 
                                    type="time" 
                                    value={form.time}
                                    onChange={e => setForm({...form, time: e.target.value})}
                                    className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 outline-none focus:border-primary" 
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="text-xs font-bold text-slate-500 mb-1 block">名稱</label>
                        <input 
                            value={form.title}
                            onChange={e => setForm({...form, title: e.target.value})}
                            type="text" 
                            placeholder="例如: 還劍湖" 
                            className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 outline-none focus:border-primary font-bold" 
                        />
                    </div>

                    {!isBackup && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 mb-1 block">交通方式 <span className="text-[10px] font-normal text-slate-400">(選填)</span></label>
                                <input value={form.transport} onChange={e => setForm({...form, transport: e.target.value})} type="text" placeholder="如: 包車" className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 mb-1 block">預計停留 <span className="text-[10px] font-normal text-slate-400">(選填)</span></label>
                                <input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} type="text" placeholder="如: 30分" className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 outline-none focus:border-primary" />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="text-xs font-bold text-slate-500 mb-1 block">地點</label>
                        <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} type="text" placeholder="輸入地址或地標" className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 outline-none focus:border-primary" />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 mb-1 block">照片</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {form.images?.map((img, idx) => (
                                <div key={idx} className="w-16 h-16 relative rounded overflow-hidden group border border-slate-200">
                                    <img src={img} className="w-full h-full object-cover" alt="preview" />
                                    <button onClick={() => removeImage(idx)} className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs opacity-70 hover:opacity-100">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            ))}
                            <label className="w-16 h-16 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 text-slate-400">
                                <i className="fas fa-camera"></i>
                                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                            </label>
                        </div>
                        <input 
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addImage()}
                            type="text" 
                            placeholder="或貼上圖片網址按 Enter" 
                            className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 outline-none focus:border-primary text-xs" 
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 mb-1 block">分類</label>
                        <div className="flex flex-wrap gap-2 py-1 mb-2">
                            {CATEGORIES.map(cat => (
                                <button key={cat.value} 
                                    onClick={() => setForm({...form, category: cat.value as CategoryType})}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                                    form.category === cat.value ? 'bg-primary text-white border-primary' : 'bg-white text-slate-500 border-slate-200'}`}
                                >
                                    <i className={`${cat.icon} mr-1`}></i> {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-amber-600 mb-1 block"><i className="fas fa-star mr-1"></i>備註與介紹</label>
                        <textarea 
                            value={form.note}
                            onChange={e => setForm({...form, note: e.target.value})}
                            rows={4} 
                            placeholder="輸入介紹、必拍角度、注意事項..." 
                            className="w-full bg-amber-50 p-3 rounded-xl border border-amber-200 outline-none focus:border-amber-400 text-sm"
                        ></textarea>
                    </div>

                    <button onClick={handleSave} className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg mt-4 active:scale-95 transition-transform">
                        {editItem ? '更新' : '加入'}
                        {isBackup ? '私房景點' : '行程'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItineraryModal;
