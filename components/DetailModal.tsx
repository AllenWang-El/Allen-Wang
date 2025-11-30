

import React, { useState } from 'react';
import { ItineraryItem, BackupSpot } from '../types';
import { askAiAboutSpot } from '../services/geminiService';
import { CATEGORIES } from '../constants';

// Add the marked type definition globally to avoid TS errors since we load it from CDN
declare const marked: {
  parse: (text: string) => string;
};

// Unified interface for display
interface DisplayItem {
    id: number;
    title: string;
    location: string;
    category: string;
    note: string;
    images?: string[];
    aiContent?: string;
    transport?: string;
    duration?: string;
    rating?: number;
    openTime?: string;
    priceLevel?: string;
    subType?: string;
    hasAiGuide?: boolean;
}

interface DetailModalProps {
    item: ItineraryItem | BackupSpot;
    onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
    const [aiLoading, setAiLoading] = useState(false);
    const [aiContent, setAiContent] = useState<string | undefined>(item.aiContent);

    // Cast item to unify property access
    const displayItem = item as unknown as DisplayItem;

    const images = displayItem.images && displayItem.images.length > 0 
        ? displayItem.images 
        : [`https://picsum.photos/400/300?random=${displayItem.id}`];

    const categoryLabel = CATEGORIES.find(c => c.value === displayItem.category)?.label || '其他';

    const handleAskAi = async () => {
        if (aiLoading) return;
        setAiLoading(true);
        // Cast back to ItineraryItem for the service call, as it expects that shape mainly for title/location
        const content = await askAiAboutSpot(item as ItineraryItem);
        setAiContent(content);
        setAiLoading(false);
    };

    const openGoogleMap = () => {
        const query = encodeURIComponent(`${displayItem.title} ${displayItem.location}`);
        window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    };

    return (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90%]" onClick={e => e.stopPropagation()}>
                
                {/* Gallery */}
                <div className="relative w-full h-64 bg-black flex-shrink-0">
                    <div className="flex overflow-x-auto snap-x snap-mandatory h-full no-scrollbar">
                        {images.map((img, idx) => (
                            <img key={idx} src={img} className="w-full h-full object-cover flex-shrink-0 snap-center" alt="spot" />
                        ))}
                    </div>
                    
                    <button onClick={onClose} className="absolute top-2 right-2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur hover:bg-black/70 z-10">
                        <i className="fas fa-times"></i>
                    </button>
                    
                    {images.length > 1 && (
                        <div className="absolute bottom-16 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-10">
                            <i className="fas fa-images mr-1"></i>{images.length}
                        </div>
                    )}

                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 pointer-events-none">
                        <h2 className="text-xl font-bold text-white drop-shadow-md">{displayItem.title}</h2>
                        {displayItem.rating && (
                            <div className="flex items-center text-amber-400 text-sm mt-1">
                                <i className="fas fa-star mr-1"></i>
                                <span className="font-bold text-white">{displayItem.rating}</span>
                                <span className="text-white/80 text-xs ml-1">(Google 評論)</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 overflow-y-auto flex-1 bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-slate-500 text-xs flex-wrap gap-2">
                            <span className="bg-slate-100 px-2 py-1 rounded mr-1 uppercase font-bold">{categoryLabel}</span>
                            <span className="flex items-center"><i className="fas fa-map-marker-alt mr-1"></i> {displayItem.location}</span>
                            <button 
                                onClick={openGoogleMap}
                                className="text-[10px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 flex items-center hover:bg-blue-100 transition-colors"
                            >
                                <i className="fas fa-map-marked-alt mr-1"></i> 地圖
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2 mb-4">
                        {(displayItem.openTime) && (
                             <div className="flex items-start text-xs text-slate-600">
                                <i className="fas fa-clock mt-0.5 mr-2 w-4 text-center text-slate-400"></i>
                                <span>{displayItem.openTime}</span>
                            </div>
                        )}
                        {(displayItem.priceLevel) && (
                             <div className="flex items-start text-xs text-slate-600">
                                <i className="fas fa-tag mt-0.5 mr-2 w-4 text-center text-slate-400"></i>
                                <span>{displayItem.priceLevel}</span>
                            </div>
                        )}
                        {(displayItem.transport || displayItem.duration) && (
                            <div className="flex gap-2 text-xs pt-1">
                                {displayItem.transport && (
                                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 flex items-center">
                                        <i className="fas fa-route mr-1"></i> {displayItem.transport}
                                    </span>
                                )}
                                {displayItem.duration && (
                                    <span className="bg-purple-50 text-purple-600 px-2 py-1 rounded border border-purple-100 flex items-center">
                                        <i className="fas fa-clock mr-1"></i> {displayItem.duration}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-slate-800 border-l-4 border-amber-400 pl-2 text-sm">詳細介紹</h4>
                            {displayItem.hasAiGuide && (
                                <button 
                                    onClick={handleAskAi} 
                                    disabled={aiLoading} 
                                    className="text-xs bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-3 py-1 rounded-full font-bold shadow-md hover:scale-105 transition-transform flex items-center disabled:opacity-50"
                                >
                                {aiLoading ? <i className="fas fa-spinner fa-spin mr-1"></i> : <i className="fas fa-sparkles mr-1"></i>}
                                AI 導遊解說
                                </button>
                            )}
                    </div>
                    
                    <div 
                        className="text-slate-600 leading-relaxed text-sm whitespace-pre-line prose"
                        dangerouslySetInnerHTML={{ __html: aiContent ? marked.parse(aiContent) : displayItem.note }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DetailModal;