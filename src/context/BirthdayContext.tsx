import React, { createContext, useContext, useState, useEffect } from 'react';
import { BirthdayData, BirthdayContextType, AppRoute } from '../types/birthday';
import { DEFAULT_BIRTHDAY_DATA } from '../utils/sampleData';
import { decodeBirthdayFromUrl, encodeBirthdayToUrl } from '../utils/share';
import { audio } from '../utils/audio';

const STORAGE_KEY = 'vijays_moments_birthday_data_v1';

const BirthdayContext = createContext<BirthdayContextType | undefined>(undefined);

export function BirthdayProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<BirthdayData>(() => {
    // 1. Check URL parameters first (e.g. if opened from a shared link)
    const urlData = decodeBirthdayFromUrl();
    if (urlData && urlData.recipientName) {
      return {
        ...DEFAULT_BIRTHDAY_DATA,
        ...urlData,
      };
    }

    // 2. Check localStorage
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object' && parsed.recipientName) {
            return parsed;
          }
        }
      } catch {
        // Corrupted storage fallback
      }
    }

    return DEFAULT_BIRTHDAY_DATA;
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [route, setRoute] = useState<AppRoute>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode');

      if (mode === 'view' || path === '/view') return 'view';
      if (mode === 'create' || path === '/create') return 'create';
      if (mode === 'preview' || path === '/preview') return 'preview';
      if (path === '/birthday' || path === '/') return 'landing';
    }
    return 'landing';
  });

  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [audioInitialized, setAudioInitialized] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn('LocalStorage quota or save error:', e);
      }
    }
  }, [data]);

  // Update browser history when route changes
  const navigateTo = (newRoute: AppRoute) => {
    setRoute(newRoute);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (newRoute === 'landing') {
        url.searchParams.delete('mode');
      } else {
        url.searchParams.set('mode', newRoute);
      }
      window.history.pushState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateData = (fields: Partial<BirthdayData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetToDefault = () => {
    if (typeof window !== 'undefined' && window.confirm('Are you sure you want to clear your current progress and start fresh?')) {
      setData(DEFAULT_BIRTHDAY_DATA);
      setCurrentStep(1);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // safe fallback
      }
    }
  };

  const loadSampleData = () => {
    setData(DEFAULT_BIRTHDAY_DATA);
  };

  const toggleAudio = () => {
    setAudioInitialized(true);
    const newState = audio.toggleMute();
    setIsAudioPlaying(newState);
  };

  const shareUrl = encodeBirthdayToUrl(data);

  return (
    <BirthdayContext.Provider
      value={{
        data,
        setData,
        updateData,
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        route,
        setRoute: navigateTo,
        resetToDefault,
        loadSampleData,
        shareUrl,
        isAudioPlaying,
        toggleAudio,
        audioInitialized,
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
}

export function useBirthday() {
  const context = useContext(BirthdayContext);
  if (!context) {
    throw new Error('useBirthday must be used within a BirthdayProvider');
  }
  return context;
}
