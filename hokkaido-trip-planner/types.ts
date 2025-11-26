export enum ActivityType {
  Sightseeing = 'Sightseeing',
  Food = 'Food',
  Transport = 'Transport',
  Accommodation = 'Accommodation',
  Shopping = 'Shopping'
}

export interface Attraction {
  id: string;
  name: string;
  jpName?: string;
  description: string;
  imageUrl: string;
  locationQuery: string; // For Google Maps
  type: ActivityType;
  duration?: string;
  tips?: string; // Initial tips, can be expanded by AI
}

export interface ScheduleItem {
  time: string;
  attractionId: string;
  note?: string; // e.g., "Take JR Rapid Airport"
}

export interface DayPlan {
  day: number;
  title: string;
  dateLabel: string; // e.g., "Day 1"
  items: ScheduleItem[];
}

export interface AttractionDetailsResponse {
  description: string;
  tips: string;
  weatherAdvice: string;
}
