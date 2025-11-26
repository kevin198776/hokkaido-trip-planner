import React, { useMemo, useState, useEffect } from 'react';
import { DayPlan, ScheduleItem } from '../types';
import TimelineItem from './TimelineItem';
import { Attraction } from '../types';

interface MapViewProps {
  dayPlan: DayPlan;
  onSelectAttraction: (attraction: Attraction) => void;
}

const MapView: React.FC<MapViewProps> = ({ dayPlan, onSelectAttraction }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive Grid Configuration
  const columns = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3;
  const rowHeight = 280;
  const colWidthPct = 100 / columns;

  // Calculate coordinates for a "Snake" layout
  const itemsWithCoords = useMemo(() => {
    return dayPlan.items.map((item, index) => {
      const row = Math.floor(index / columns);
      const isRowEven = row % 2 === 0;
      
      // Calculate column index based on snake pattern
      // Even rows: Left -> Right (0, 1, 2)
      // Odd rows: Right -> Left (2, 1, 0)
      let col = index % columns;
      if (!isRowEven) {
        col = columns - 1 - col;
      }

      // Center the item within its grid cell
      const x = (col * colWidthPct) + (colWidthPct / 2);
      const y = (row * rowHeight) + (rowHeight / 2);

      return { ...item, x, y, index };
    });
  }, [dayPlan, columns, colWidthPct]);

  // Calculate SVG Paths connecting the dots
  const paths = useMemo(() => {
    const p: { d: string; duration: string; midX: number; midY: number; id: number }[] = [];
    
    for (let i = 0; i < itemsWithCoords.length - 1; i++) {
      const start = itemsWithCoords[i];
      const end = itemsWithCoords[i + 1];

      // Calculate time difference
      let duration = "";
      try {
        const [h1, m1] = start.time.split(':').map(Number);
        const [h2, m2] = end.time.split(':').map(Number);
        let diff = (h2 * 60 + m2) - (h1 * 60 + m1);
        if (diff < 0) diff += 24 * 60;
        const h = Math.floor(diff / 60);
        const m = diff % 60;
        duration = h > 0 ? `${h}h ${m}m` : `${m}m`;
      } catch(e) {}

      // Control points for Bezier curve to make it look smooth/curvy
      const dist = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
      const curvature = 0.5; // Amount of curve
      
      // Midpoint for label
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;

      // Create a nice curve path
      const d = `M ${start.x} ${start.y} Q ${(start.x + end.x)/2 + (start.index % 2 === 0 ? 10 : -10)} ${(start.y + end.y)/2} ${end.x} ${end.y}`;
      
      // Simple linear for now as SVG grid percentages are tricky with curves without pixel conversion
      // Let's use simple lines for reliability in this percentage-based system, or simple bezier
      // We will use pixel coordinates in style but percentages in d? No, SVG 'd' needs units if viewBox is set.
      // We'll map 0-100 to viewBox 0-100.
      
      p.push({ 
        d: `M ${start.x} ${start.y} L ${end.x} ${end.y}`, 
        duration, 
        midX, 
        midY,
        id: i 
      });
    }
    return p;
  }, [itemsWithCoords]);

  const totalHeight = (Math.ceil(dayPlan.items.length / columns) * rowHeight);

  return (
    <div className="relative w-full overflow-hidden bg-transparent" style={{ height: totalHeight + 100 }}>
      
      {/* Background SVG Layer for Paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox={`0 0 100 ${totalHeight}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        {paths.map((path) => (
          <g key={path.id}>
             {/* Base Line */}
            <path 
              d={path.d} 
              stroke="#e2e8f0" 
              strokeWidth="1.5" 
              fill="none" 
              vectorEffect="non-scaling-stroke"
            />
            {/* Animated Dashed Line */}
            <path 
              d={path.d} 
              stroke="url(#pathGradient)" 
              strokeWidth="1.5" 
              fill="none" 
              strokeDasharray="4 4" 
              className="animate-map-path"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>

      {/* Floating Duration Labels */}
      {paths.map((path) => (
         path.duration && (
          <div 
            key={`dur-${path.id}`}
            className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur border border-blue-200 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-float"
            style={{ left: `${path.midX}%`, top: path.midY }}
          >
            {path.duration}
          </div>
         )
      ))}

      {/* Map Nodes */}
      {itemsWithCoords.map((item, i) => (
        <TimelineItem 
          key={item.attractionId + i}
          item={item}
          x={item.x}
          y={item.y}
          onSelect={onSelectAttraction}
        />
      ))}

    </div>
  );
};

export default MapView;