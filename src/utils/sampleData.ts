import { BirthdayData } from '../types/birthday';

// Artistic fallback SVG illustrations for memories when user hasn't uploaded personal photos
export const SAMPLE_MEMORIES_DATA = [
  {
    id: 'mem-1',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%233A0A1C"/><stop offset="50%" stop-color="%23731835"/><stop offset="100%" stop-color="%23E5C384"/></linearGradient><radialGradient id="sun" cx="50%" cy="60%" r="40%"><stop offset="0%" stop-color="%23FFF0D4"/><stop offset="60%" stop-color="%23FFAA5A"/><stop offset="100%" stop-color="%233A0A1C" stop-opacity="0"/></radialGradient></defs><rect width="600" height="450" fill="url(%23g1)"/><circle cx="300" cy="270" r="140" fill="url(%23sun)"/><path d="M0,340 Q150,300 300,330 T600,320 L600,450 L0,450 Z" fill="%231E050D"/><circle cx="270" cy="220" r="16" fill="%23FAF5EE" opacity="0.9"/><path d="M260,250 Q270,290 280,330" stroke="%23FAF5EE" stroke-width="4" stroke-linecap="round"/><circle cx="330" cy="225" r="15" fill="%23FAF5EE" opacity="0.9"/><path d="M340,250 Q330,290 325,330" stroke="%23FAF5EE" stroke-width="4" stroke-linecap="round"/><path d="M275,270 Q300,265 330,270" stroke="%23FAF5EE" stroke-width="3" stroke-linecap="round"/><text x="300" y="410" font-family="serif" font-size="20" fill="%23E5C384" text-anchor="middle" letter-spacing="3">GOLDEN HOUR BY THE SHORE</text></svg>',
    caption: 'That unforgettable sunset evening we laughed until tears came out.',
    dateOrLocation: 'Goa, 2023',
  },
  {
    id: 'mem-2',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%"><defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%23240816"/><stop offset="100%" stop-color="%234A1226"/></linearGradient></defs><rect width="600" height="450" fill="url(%23g2)"/><circle cx="120" cy="90" r="40" fill="%23E5C384" opacity="0.25"/><circle cx="480" cy="120" r="60" fill="%23E5C384" opacity="0.18"/><circle cx="300" cy="200" r="80" fill="%23E5C384" opacity="0.15"/><path d="M180,360 L420,360 L390,260 L210,260 Z" fill="%2318050E"/><ellipse cx="300" cy="260" rx="90" ry="16" fill="%23300C1B"/><ellipse cx="260" cy="255" rx="36" ry="12" fill="%23FCE7F0" opacity="0.85"/><ellipse cx="340" cy="255" rx="36" ry="12" fill="%23FCE7F0" opacity="0.85"/><path d="M260,240 Q255,210 265,190" stroke="%23FAF5EE" stroke-width="2" fill="none" opacity="0.6"/><path d="M340,240 Q345,210 335,190" stroke="%23FAF5EE" stroke-width="2" fill="none" opacity="0.6"/><text x="300" y="415" font-family="serif" font-size="20" fill="%23E5C384" text-anchor="middle" letter-spacing="3">COFFEE & ENDLESS CONVERSATIONS</text></svg>',
    caption: 'Two warm cups, cold breeze, and talking about dreams until midnight.',
    dateOrLocation: 'Old Town Cafe, Autumn',
  },
  {
    id: 'mem-3',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%"><defs><radialGradient id="night" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="%234A122A"/><stop offset="100%" stop-color="%23120308"/></radialGradient></defs><rect width="600" height="450" fill="url(%23night)"/><g fill="%23E5C384"><circle cx="80" cy="70" r="2"/><circle cx="150" cy="40" r="1.5"/><circle cx="240" cy="90" r="2.5"/><circle cx="360" cy="60" r="2"/><circle cx="450" cy="110" r="1.5"/><circle cx="530" cy="45" r="2.2"/><circle cx="290" cy="140" r="1.8"/></g><path d="M0,150 Q150,210 300,160 T600,170" stroke="%23E5C384" stroke-width="1.5" fill="none" opacity="0.7"/><g fill="%23FFEBB8"><circle cx="100" cy="180" r="8"/><circle cx="200" cy="195" r="8"/><circle cx="300" cy="160" r="9"/><circle cx="400" cy="185" r="8"/><circle cx="500" cy="175" r="8"/></g><text x="300" y="380" font-family="serif" font-size="20" fill="%23E5C384" text-anchor="middle" letter-spacing="3">STARLIT NIGHT WALK</text></svg>',
    caption: 'Under string lights and city stars, knowing everything was going to be alright.',
    dateOrLocation: 'Rooftop Terrace, May',
  },
  {
    id: 'mem-4',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%"><defs><radialGradient id="sparkleBg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="%23661633"/><stop offset="100%" stop-color="%2319040C"/></radialGradient></defs><rect width="600" height="450" fill="url(%23sparkleBg)"/><g stroke="%23E5C384" stroke-width="2"><line x1="300" y1="120" x2="300" y2="300"/><line x1="210" y1="210" x2="390" y2="210"/><line x1="235" y1="145" x2="365" y2="275"/><line x1="365" y1="145" x2="235" y2="275"/></g><circle cx="300" cy="210" r="18" fill="%23FFF8E7"/><text x="300" y="400" font-family="serif" font-size="20" fill="%23E5C384" text-anchor="middle" letter-spacing="3">NEW BEGINNINGS & SPARKS</text></svg>',
    caption: 'Celebrating our quiet wins and promising to always show up for each other.',
    dateOrLocation: 'New Year Eve',
  },
];

export const INSPIRATION_BALLOONS = [
  'Your smile makes even the most chaotic days feel calm and gentle.',
  "You're my absolute favourite person to talk to about everything and nothing.",
  'You have an incredible heart that quietly lifts everyone around you.',
  'Your genuine laugh is easily one of my favourite sounds in the whole world.',
  'You make ordinary everyday moments feel memorable and special.',
  'I love the way you listen with your whole heart and never judge.',
  'Your courage and quiet kindness inspire me more than you realize.',
  'Life is just significantly more fun, warm, and meaningful with you in it.',
];

export const LETTER_STARTER_TEMPLATES = [
  {
    label: 'Warm & Deep',
    text: "Every year I look for the perfect words, but none seem big enough to describe how grateful I am to have you in my life. You bring so much gentle joy, quiet strength, and genuine kindness everywhere you go. Today isn't just about celebrating your birthday—it's about celebrating the rare, beautiful person you are. Here's to all your dreams coming true this year.",
  },
  {
    label: 'Heartfelt & Playful',
    text: "Some people simply make the world a better place by being in it, and you're at the very top of that list. Thank you for the endless late-night chats, the silly laughter, and for always being in my corner. On your birthday, I hope you feel even a fraction of the love and light you freely give to everyone else. Happy Birthday, superstar!",
  },
  {
    label: 'Poetic & Reflective',
    text: "Another year around the sun, and you continue to grow in grace, wisdom, and warmth. Looking back at our memories, I realize the best moments are always the ones spent with you. May this upcoming chapter bring you peace, grand adventures, and moments that take your breath away. Happy Birthday!",
  },
];

export const DEFAULT_BIRTHDAY_DATA: BirthdayData = {
  recipientName: 'Ananya',
  senderName: 'Vijay',
  age: '25',
  birthday: '',
  cake: 'midnight-chocolate',
  reasons: [
    'Your smile makes everything better.',
    "You're my favourite person to talk to.",
    'You make ordinary days memorable.',
    'I love the way you laugh.',
    'Your kindness touches everyone around you.',
  ],
  memories: SAMPLE_MEMORIES_DATA,
  letter:
    "Every year I try to find the perfect words to tell you what you mean to me. Some people make life better simply by being in it, and you are truly one of them. Thank you for every shared laugh, quiet conversation, and unforgettable moment. I hope this year brings you all the happiness, gentle moments, and dreams you deserve. Happy Birthday!",
};
