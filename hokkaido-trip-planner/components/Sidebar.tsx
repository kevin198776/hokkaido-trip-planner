import React from 'react';
import { Calendar, Snowflake, Map } from 'lucide-react';
import { DayPlan } from '../types';

interface SidebarProps {
  days: DayPlan[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ days, selectedDay, onSelectDay }) => {
  return (
    <div className="w-full lg:w-80 bg-white lg:h-screen lg:sticky lg:top-0 border-r border-gray-100 flex flex-col shrink-0 z-50 shadow-xl lg:shadow-none">
      
      {/* Brand Header */}
      <div className="p-6 pb-4 bg-gradient-to-br from-blue-600 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute -right-4 -top-4 text-white/10">
           <Snowflake size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 opacity-90">
             <Map size={16} />
             <span className="text-xs font-bold uppercase tracking-[0.2em]">Travel App</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight leading-none">
            Hokkaido<br/>Adventure
          </h1>
          <div className="mt-3 inline-block bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">
            7-Day Itinerary
          </div>
        </div>
      </div>

      {/* Days List */}
      <nav className="flex-1 overflow-x-auto lg:overflow-y-auto p-4 space-x-3 lg:space-x-0 lg:space-y-3 flex lg:flex-col scrollbar-hide bg-gray-50/50">
        {days.map((day) => {
          const isSelected = selectedDay === day.day;
          return (
            <button
              key={day.day}
              onClick={() => onSelectDay(day.day)}
              className={`
                relative group flex-shrink-0 lg:w-full text-left p-3 rounded-2xl transition-all duration-300 border-2
                ${isSelected 
                  ? 'bg-white border-blue-500 shadow-lg shadow-blue-100 scale-100 lg:translate-x-2' 
                  : 'bg-white border-transparent hover:border-gray-200 hover:bg-gray-50 text-gray-500 hover:scale-[1.02]'}
              `}
              style={{ minWidth: '160px' }}
            >
              <div className="flex items-center gap-3">
                {/* Day Badge */}
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg transition-colors shadow-sm
                  ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-500'}
                `}>
                  {day.day}
                </div>

                <div className="flex flex-col min-w-0">
                  <span className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${isSelected ? 'text-blue-500' : 'text-gray-400'}`}>
                    {day.dateLabel}
                  </span>
                  <span className={`font-bold text-sm truncate leading-tight ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                    {day.title}
                  </span>
                </div>
              </div>
              
              {isSelected && (
                 <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse hidden lg:block"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 bg-white border-t border-gray-100 hidden lg:block">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
           <h4 className="font-bold text-blue-900 text-sm mb-1">Trip Summary</h4>
           <div className="flex justify-between text-xs text-blue-700 font-medium opacity-80">
              <span>Sapporo</span>
              <span>•</span>
              <span>Otaru</span>
              <span>•</span>
              <span>Asahikawa</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;