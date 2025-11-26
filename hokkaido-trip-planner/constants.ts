import { Attraction, DayPlan, ActivityType } from './types';

// Helper to generate consistent, relevant image URLs
const getImg = (query: string) => `https://image.pollinations.ai/prompt/beautiful%20travel%20photo%20of%20${encodeURIComponent(query)}%20hokkaido%20japan%20winter%20scenery%204k?width=800&height=600&nologo=true&seed=${Math.floor(Math.random()*100)}`;

export const ATTRACTIONS: Record<string, Attraction> = {
  'new-chitose': {
    id: 'new-chitose',
    name: 'New Chitose Airport',
    jpName: '新千歳空港',
    description: 'The main gateway to Hokkaido. Don\'t miss the Ramen Dojo and Doraemon Sky Park.',
    imageUrl: getImg('New Chitose Airport terminal shops'),
    locationQuery: 'New Chitose Airport',
    type: ActivityType.Transport
  },
  'sapporo-station': {
    id: 'sapporo-station',
    name: 'Sapporo Station',
    jpName: '札幌駅',
    description: 'The central hub for transport. Great shopping at Stellar Place and Daimaru.',
    imageUrl: getImg('Sapporo Station building winter exterior'),
    locationQuery: 'Sapporo Station',
    type: ActivityType.Transport
  },
  'odori-park': {
    id: 'odori-park',
    name: 'Odori Park',
    jpName: '大通公園',
    description: 'A park stretching east to west through the center of Sapporo. Famous for the Snow Festival.',
    imageUrl: getImg('Odori Park Sapporo TV Tower winter illumination'),
    locationQuery: 'Odori Park Sapporo',
    type: ActivityType.Sightseeing
  },
  'clock-tower': {
    id: 'clock-tower',
    name: 'Sapporo Clock Tower',
    jpName: '札幌市時計台',
    description: 'A symbol of Sapporo. An American-style wooden building built in 1878.',
    imageUrl: getImg('Sapporo Clock Tower historic building snow'),
    locationQuery: 'Sapporo Clock Tower',
    type: ActivityType.Sightseeing
  },
  'susukino': {
    id: 'susukino',
    name: 'Susukino',
    jpName: 'すすきの',
    description: 'Japan\'s northern entertainment district. Famous for the Nikka Whisky sign and ramen alley.',
    imageUrl: getImg('Susukino nightlife neon signs Sapporo winter'),
    locationQuery: 'Susukino',
    type: ActivityType.Food
  },
  'otaru-canal': {
    id: 'otaru-canal',
    name: 'Otaru Canal',
    jpName: '小樽運河',
    description: 'A beautifully preserved canal area lined with brick warehouses.',
    imageUrl: getImg('Otaru Canal winter snow light up night'),
    locationQuery: 'Otaru Canal',
    type: ActivityType.Sightseeing
  },
  'sakaimachi': {
    id: 'sakaimachi',
    name: 'Sakaimachi Street',
    jpName: '堺町通り',
    description: 'A preserved merchant street famous for glass workshops, music boxes, and cheesecake.',
    imageUrl: getImg('Sakaimachi Street Otaru old shops snow'),
    locationQuery: 'Sakaimachi Street Otaru',
    type: ActivityType.Shopping
  },
  'asahiyama-zoo': {
    id: 'asahiyama-zoo',
    name: 'Asahiyama Zoo',
    jpName: '旭山動物園',
    description: 'Famous for enclosures that allow visitors to view animals from unique angles, especially the penguin walk.',
    imageUrl: getImg('Asahiyama Zoo penguins walking in snow'),
    locationQuery: 'Asahiyama Zoo',
    type: ActivityType.Sightseeing
  },
  'ramen-village': {
    id: 'ramen-village',
    name: 'Asahikawa Ramen Village',
    jpName: 'あさひかわラーメン村',
    description: 'Taste the famous Asahikawa soy sauce ramen from top local shops.',
    imageUrl: getImg('Hokkaido Ramen hot bowl delicious'),
    locationQuery: 'Asahikawa Ramen Village',
    type: ActivityType.Food
  },
  'hokkaido-shrine': {
    id: 'hokkaido-shrine',
    name: 'Hokkaido Shrine',
    jpName: '北海道神宮',
    description: 'The main Shinto shrine of Hokkaido, located in Maruyama Park.',
    imageUrl: getImg('Hokkaido Shrine winter torii gate snow'),
    locationQuery: 'Hokkaido Shrine',
    type: ActivityType.Sightseeing
  },
  'shiroi-koibito': {
    id: 'shiroi-koibito',
    name: 'Shiroi Koibito Park',
    jpName: '白い恋人パーク',
    description: 'A chocolate entertainment park by Ishiya, maker of the famous Hokkaido cookie.',
    imageUrl: getImg('Shiroi Koibito Park winter illumination fantasy'),
    locationQuery: 'Shiroi Koibito Park',
    type: ActivityType.Sightseeing
  },
  'moiwa': {
    id: 'moiwa',
    name: 'Mt. Moiwa Ropeway',
    jpName: '藻岩山',
    description: 'Offers one of Japan\'s top three new major night views.',
    imageUrl: getImg('Mt Moiwa night view Sapporo city citylights'),
    locationQuery: 'Mt. Moiwa Ropeway',
    type: ActivityType.Sightseeing
  },
  'noboribetsu-onsen': {
    id: 'noboribetsu-onsen',
    name: 'Noboribetsu Onsen',
    jpName: '登別温泉',
    description: 'Hokkaido\'s most famous hot spring resort.',
    imageUrl: getImg('Noboribetsu Onsen outdoor bath snow'),
    locationQuery: 'Noboribetsu Onsen',
    type: ActivityType.Sightseeing
  },
  'jigokudani': {
    id: 'jigokudani',
    name: 'Jigokudani (Hell Valley)',
    jpName: '地獄谷',
    description: 'A spectacular valley just above the town of Noboribetsu Onsen, which displays hot steam vents.',
    imageUrl: getImg('Jigokudani Hell Valley Noboribetsu steam snow'),
    locationQuery: 'Jigokudani Noboribetsu',
    type: ActivityType.Sightseeing
  },
  'nijo-market': {
    id: 'nijo-market',
    name: 'Nijo Market',
    jpName: '二条市場',
    description: 'A public market in central Sapporo famous for fresh seafood bowls (Kaisendon).',
    imageUrl: getImg('Hokkaido Kaisendon seafood bowl crabs urchin'),
    locationQuery: 'Nijo Market Sapporo',
    type: ActivityType.Food
  },
  'tanukikoji': {
    id: 'tanukikoji',
    name: 'Tanukikoji Shopping Arcade',
    jpName: '狸小路商店街',
    description: 'A huge covered shopping arcade stretching 1km. Great for souvenirs.',
    imageUrl: getImg('Tanukikoji Shopping Arcade Sapporo'),
    locationQuery: 'Tanukikoji Shopping Arcade',
    type: ActivityType.Shopping
  },
  'beer-museum': {
    id: 'beer-museum',
    name: 'Sapporo Beer Museum',
    jpName: 'サッポロビール博物館',
    description: 'Learn about the history of beer in Japan and taste distinct local brews.',
    imageUrl: getImg('Sapporo Beer Museum red brick building'),
    locationQuery: 'Sapporo Beer Museum',
    type: ActivityType.Sightseeing
  }
};

export const ITINERARY: DayPlan[] = [
  {
    day: 1,
    title: 'Arrival & City Center',
    dateLabel: 'Day 1',
    items: [
      { time: '14:00', attractionId: 'new-chitose', note: 'Land at CTS. Take JR Rapid Airport to Sapporo.' },
      { time: '16:00', attractionId: 'sapporo-station', note: 'Check into hotel near station.' },
      { time: '17:30', attractionId: 'clock-tower', note: 'Quick photo stop.' },
      { time: '18:00', attractionId: 'odori-park', note: 'Walk through the park, see TV Tower.' },
      { time: '19:30', attractionId: 'susukino', note: 'Genghis Khan (Lamb BBQ) dinner.' }
    ]
  },
  {
    day: 2,
    title: 'Nostalgic Otaru',
    dateLabel: 'Day 2',
    items: [
      { time: '09:00', attractionId: 'sapporo-station', note: 'JR Rapid Train to Otaru.' },
      { time: '10:00', attractionId: 'otaru-canal', note: 'Stroll along the canal.' },
      { time: '12:00', attractionId: 'sakaimachi', note: 'Sushi lunch & Music Box Museum.' },
      { time: '15:00', attractionId: 'sakaimachi', note: 'LeTAo Cheesecake break.' },
      { time: '17:00', attractionId: 'sapporo-station', note: 'Return train. Dinner at Stella Place.' }
    ]
  },
  {
    day: 3,
    title: 'Asahikawa Zoo Day Trip',
    dateLabel: 'Day 3',
    items: [
      { time: '08:30', attractionId: 'sapporo-station', note: 'Ltd. Exp Lilac to Asahikawa.' },
      { time: '10:30', attractionId: 'asahiyama-zoo', note: 'Bus from station to Zoo.' },
      { time: '14:00', attractionId: 'ramen-village', note: 'Late lunch: Asahikawa Ramen.' },
      { time: '17:00', attractionId: 'sapporo-station', note: 'Return to Sapporo.' }
    ]
  },
  {
    day: 4,
    title: 'Noboribetsu Onsen',
    dateLabel: 'Day 4',
    items: [
      { time: '09:00', attractionId: 'sapporo-station', note: 'Ltd. Exp Suzuran to Noboribetsu.' },
      { time: '11:00', attractionId: 'jigokudani', note: 'Bus to Onsen town. Walk through Hell Valley.' },
      { time: '13:00', attractionId: 'noboribetsu-onsen', note: 'Day trip bath (Higaeri Onsen) & Lunch.' },
      { time: '17:00', attractionId: 'sapporo-station', note: 'Return to Sapporo.' }
    ]
  },
  {
    day: 5,
    title: 'Sapporo Culture & Views',
    dateLabel: 'Day 5',
    items: [
      { time: '09:00', attractionId: 'nijo-market', note: 'Seafood Rice Bowl Breakfast.' },
      { time: '11:00', attractionId: 'hokkaido-shrine', note: 'Subway to Maruyama Koen.' },
      { time: '14:00', attractionId: 'shiroi-koibito', note: 'Cookie factory tour.' },
      { time: '19:00', attractionId: 'moiwa', note: 'Ropeway for night view over the city.' }
    ]
  },
  {
    day: 6,
    title: 'Relax & Shopping',
    dateLabel: 'Day 6',
    items: [
      { time: '10:30', attractionId: 'beer-museum', note: 'Bus from station. Beer tasting.' },
      { time: '13:00', attractionId: 'sapporo-station', note: 'Lunch: Soup Curry.' },
      { time: '15:00', attractionId: 'tanukikoji', note: 'Mega Don Quijote for souvenirs.' },
      { time: '19:00', attractionId: 'susukino', note: 'Farewell Izakaya dinner.' }
    ]
  },
  {
    day: 7,
    title: 'Departure',
    dateLabel: 'Day 7',
    items: [
      { time: '10:00', attractionId: 'sapporo-station', note: 'Train to Airport.' },
      { time: '11:00', attractionId: 'new-chitose', note: 'Last minute shopping & Doraemon Park.' },
      { time: '13:00', attractionId: 'new-chitose', note: 'Flight departure.' }
    ]
  }
];