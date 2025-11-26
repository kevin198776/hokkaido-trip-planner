import React, { useState, useEffect } from 'react';
import { X, MapPin, Sparkles, Loader2, BookOpen } from 'lucide-react';
import { Attraction, AttractionDetailsResponse } from '../types';
import { getAttractionDetails } from '../services/geminiService';

interface AttractionModalProps {
  attraction: Attraction;
  isOpen: boolean;
  onClose: () => void;
}

const AttractionModal: React.FC<AttractionModalProps> = ({ attraction, isOpen, onClose }) => {
  const [aiDetails, setAiDetails] = useState<AttractionDetailsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset details on open
      setAiDetails(null);
    }
  }, [isOpen, attraction]);

  const handleAskAI = async () => {
    setLoading(true);
    const data = await getAttractionDetails(attraction.name, 'Hokkaido');
    setAiDetails(data);
    setLoading(false);
  };

  const handleGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attraction.locationQuery)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Header Image */}
        <div className="relative h-48 sm:h-56 w-full shrink-0">
          <img 
            src={attraction.imageUrl} 
            alt={attraction.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-4 text-white">
            <span className="text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2 py-1 rounded-md mb-2 inline-block">
              {attraction.type}
            </span>
            <h2 className="text-2xl font-bold">{attraction.name}</h2>
            {attraction.jpName && <p className="text-sm opacity-90">{attraction.jpName}</p>}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <p className="text-gray-700 leading-relaxed mb-6">
            {attraction.description}
          </p>

          <div className="flex gap-3 mb-6">
             <button 
              onClick={handleGoogleMaps}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-colors"
            >
              <MapPin size={18} />
              Google Map
            </button>
            <button 
              onClick={handleAskAI}
              disabled={loading || !!aiDetails}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium transition-all
                ${aiDetails 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                }`}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : (aiDetails ? <BookOpen size={18} /> : <Sparkles size={18} />)}
              {aiDetails ? '資訊已載入' : '獲取旅遊資訊'}
            </button>
          </div>

          {/* Details Content Area */}
          {aiDetails && (
            <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-100 animate-in slide-in-from-bottom-4 fade-in duration-300">
              <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Sparkles size={14} /> 旅遊小幫手
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">景點特色</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{aiDetails.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">實用小貼士</h4>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{aiDetails.tips}</p>
                </div>

                 <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">天氣/穿著建議</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{aiDetails.weatherAdvice}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttractionModal;