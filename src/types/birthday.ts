export type CakeType = 'midnight-chocolate' | 'strawberry-blush' | 'vanilla-gold';

export interface BirthdayMemory {
  id: string;
  url: string; // base64 or sample SVG/data URL
  caption: string;
  dateOrLocation?: string;
}

export interface BirthdayData {
  recipientName: string;
  senderName: string;
  age?: string;
  birthday?: string; // YYYY-MM-DD
  cake: CakeType;
  reasons: string[];
  memories: BirthdayMemory[];
  letter: string;
  createdAt?: string;
}

export type AppRoute = 'landing' | 'create' | 'view' | 'preview';

export interface BirthdayContextType {
  data: BirthdayData;
  setData: React.Dispatch<React.SetStateAction<BirthdayData>>;
  updateData: (fields: Partial<BirthdayData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  route: AppRoute;
  setRoute: (route: AppRoute) => void;
  resetToDefault: () => void;
  loadSampleData: () => void;
  shareUrl: string;
  isAudioPlaying: boolean;
  toggleAudio: () => void;
  audioInitialized: boolean;
}
