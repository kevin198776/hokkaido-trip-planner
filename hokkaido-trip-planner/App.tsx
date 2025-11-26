import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import AttractionModal from './components/AttractionModal';
import { ITINERARY } from './constants';
import { Attraction } from './types';
import { Map, Info, Sparkles } from 'lucide-react';

function App() {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);

  const currentDayPlan = ITINERARY.find(d => d.day === selectedDay) || ITINERARY[0];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-sans text-slate-800 overflow-hidden bg-slate-50">
      
      {/* Navigation - Game Menu Style */}
      <Sidebar 
        days={ITINERARY} 
        selectedDay={selectedDay} 
        onSelectDay={setSelectedDay} 
      />

      {/* Main Content - Map Area */}
      <main className="flex-1 relative h-screen overflow-hidden flex flex-col">
        
        {/* Header Overlay */}
        <header className="relative z-20 px-6 pt-6 pb-2 shrink-0 flex items-center justify-between pointer-events-none">
           <div className="pointer-events-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 drop-shadow-sm">
                {currentDayPlan.title}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                 <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-blue-200 shadow-lg">{currentDayPlan.dateLabel}</span>
                 <p className="text-sm font-medium text-slate-500">Hokkaido Adventure Map</p>
              </div>
           </div>
        </header>

        {/* Map Container */}
        <div className="flex-1 relative overflow-y-auto overflow-x-hidden scrollbar-hide perspective-1000 cursor-grab active:cursor-grabbing">
           
           {/* Map Grid Background */}
           <div className="absolute inset-0 pointer-events-none z-0 opacity-10" 
                style={{ 
                  backgroundImage: `
                    linear-gradient(to right, #94a3b8 1px, transparent 1px),
                    linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}>
           </div>
           
           {/* Decorative Elements */}
           <div className="absolute top-10 right-10 opacity-20 pointer-events-none animate-float-delayed">
               <Sparkles size={100} className="text-blue-400" />
           </div>

           <div className="w-full max-w-5xl mx-auto p-4 sm:p-8">
             <MapView 
                dayPlan={currentDayPlan} 
                onSelectAttraction={setSelectedAttraction} 
             />
           </div>
           
           {/* Bottom Padding for scroll */}
           <div className="h-32"></div>
        </div>

        {/* Floating Mobile Hint */}
        <div className="fixed bottom-6 right-6 lg:hidden z-30 pointer-events-none">
           <div className="bg-white/90 backdrop-blur shadow-xl border border-blue-100 p-3 rounded-full flex items-center gap-2 animate-bounce-slow">
              <Info className="text-blue-500" size={20} />
              <span className="text-xs font-bold text-gray-600 pr-2">Tap locations</span>
           </div>
        </div>

      </main>

      {/* Modal */}
      {selectedAttraction && (
        <AttractionModal 
          attraction={selectedAttraction} 
          isOpen={!!selectedAttraction} 
          onClose={() => setSelectedAttraction(null)} 
        />
      )}
    </div>
  );
}

export default App;