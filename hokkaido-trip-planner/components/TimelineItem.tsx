import React from 'react';
import { ScheduleItem, Attraction, ActivityType } from '../types';
import { ATTRACTIONS } from '../constants';
import { Train, Coffee, ShoppingBag, Camera, Moon, MapPin, ArrowRight } from 'lucide-react';

interface TimelineItemProps {
  item: ScheduleItem;
  x: number; // Percentage 0-100
  y: number; // Pixels
  onSelect: (attraction: Attraction) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, x, y, onSelect }) => {
  const attraction = ATTRACTIONS[item.attractionId];
  if (!attraction) return null;

  const getIcon = (type: ActivityType) => {
    switch (type) {
      case ActivityType.Transport: return <Train size={18} />;
      case ActivityType.Food: return <Coffee size={18} />;
      case ActivityType.Shopping: return <ShoppingBag size={18} />;
      case ActivityType.Accommodation: return <Moon size={18} />;
      default: return <Camera size={18} />;
    }
  };

  const getColorClass = (type: ActivityType) => {
    switch (type) {
      case ActivityType.Transport: return 'bg-blue-500 ring-blue-300';
      case ActivityType.Food: return 'bg-orange-500 ring-orange-300';
      case ActivityType.Shopping: return 'bg-pink-500 ring-pink-300';
      case ActivityType.Accommodation: return 'bg-indigo-500 ring-indigo-300';
      default: return 'bg-emerald-500 ring-emerald-300';
    }
  };

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
      style={{ left: `${x}%`, top: y }}
    >
      {/* Time Badge Floating Above */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-800 text-white text-xs font-mono py-1 px-2 rounded-md shadow-lg after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800">
          {item.time}
        </div>
      </div>

      {/* Main Node Circle */}
      <button 
        onClick={() => onSelect(attraction)}
        className={`
          relative w-16 h-16 rounded-full shadow-xl flex items-center justify-center 
          text-white transition-all duration-300 ease-out
          hover:scale-125 hover:-translate-y-2 ring-4 ring-offset-2 ring-offset-transparent
          ${getColorClass(attraction.type)}
          animate-bounce-slow
        `}
      >
        {/* Background Image Overlay */}
        <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-white/50">
           <img src={attraction.imageUrl} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity" />
        </div>
        
        {/* Icon */}
        <div className="relative z-10 drop-shadow-md transform group-hover:scale-110 transition-transform">
          {getIcon(attraction.type)}
        </div>
      </button>

      {/* Info Card (Visible on Mobile / Hover on Desktop) */}
      <div 
        onClick={() => onSelect(attraction)}
        className="
          absolute top-full mt-3 left-1/2 -translate-x-1/2 w-40 
          bg-white rounded-xl shadow-lg shadow-blue-900/10 p-3 
          text-center border border-white/50 backdrop-blur-sm cursor-pointer
          hover:bg-blue-50 transition-colors group-hover:w-48 group-hover:z-30
        "
      >
        <h3 className="font-bold text-gray-800 text-sm leading-tight line-clamp-2 group-hover:line-clamp-none">
          {attraction.name}
        </h3>
        {item.note && (
            <div className="mt-1 flex items-center justify-center gap-1 text-[10px] text-gray-500 font-medium bg-gray-100 rounded-full py-0.5 px-2">
                <MapPin size={8} /> {item.note.split(' ')[0]}...
            </div>
        )}
      </div>

    </div>
  );
};

export default TimelineItem;