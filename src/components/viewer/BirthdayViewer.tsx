import { useState } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { ScreenEnvelope } from './ScreenEnvelope';
import { ScreenCountdown } from './ScreenCountdown';
import { ScreenReveal } from './ScreenReveal';
import { ScreenCake } from './ScreenCake';
import { ScreenBalloons } from './ScreenBalloons';
import { ScreenMemoryLane } from './ScreenMemoryLane';
import { ScreenLetter } from './ScreenLetter';
import { ScreenCelebration } from './ScreenCelebration';
import { FloatingParticles } from '../common/FloatingParticles';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function BirthdayViewer({ isPreview = false }: { isPreview?: boolean }) {
  const { data, setRoute, route } = useBirthday();
  const [currentScreen, setCurrentScreen] = useState<number>(1);

  const previewActive = isPreview || route === 'preview';

  const nextScreen = () => {
    setCurrentScreen((prev) => Math.min(prev + 1, 8));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplay = () => {
    setCurrentScreen(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#18040B] via-[#2A0815] to-[#120207] text-[#FAF5EE] overflow-x-hidden flex flex-col justify-between">
      {/* Floating particles background */}
      <FloatingParticles count={24} />

      {/* Preview Mode Top Floating Bar */}
      {previewActive && (
        <div className="sticky top-0 z-50 w-full bg-[#1B0610]/95 backdrop-blur-md border-b border-[#E5C384]/30 px-4 py-2 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => setRoute('create')}
            className="min-h-[40px] px-3 py-1.5 flex items-center gap-1.5 rounded-lg text-xs font-semibold text-[#1E050D] bg-[#E5C384] hover:bg-[#F3D59B] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Editor</span>
          </button>

          <span className="text-[#E5C384] hidden sm:inline flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preview Mode — What {data.recipientName} will see</span>
          </span>

          {/* Quick jump to screen */}
          <div className="flex items-center gap-1">
            <span className="text-[#FAF5EE]/60 text-[10px] hidden md:inline">Jump:</span>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <button
                key={s}
                onClick={() => setCurrentScreen(s)}
                className={`w-6 h-6 rounded text-[10px] font-bold transition-all ${
                  currentScreen === s
                    ? 'bg-[#E5C384] text-[#1E050D]'
                    : 'bg-[#2A0916] text-[#FAF5EE]/70 hover:bg-[#3E0E24]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Interactive Story Viewport */}
      <main className="relative z-10 flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -12 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full"
          >
            {currentScreen === 1 && <ScreenEnvelope onNext={nextScreen} />}
            {currentScreen === 2 && <ScreenCountdown onNext={nextScreen} />}
            {currentScreen === 3 && <ScreenReveal onNext={nextScreen} />}
            {currentScreen === 4 && <ScreenCake onNext={nextScreen} />}
            {currentScreen === 5 && <ScreenBalloons onNext={nextScreen} />}
            {currentScreen === 6 && <ScreenMemoryLane onNext={nextScreen} />}
            {currentScreen === 7 && <ScreenLetter onNext={nextScreen} />}
            {currentScreen === 8 && <ScreenCelebration onReplay={handleReplay} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quiet Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-[#FAF5EE]/40 border-t border-[#E5C384]/10">
        Vijay&apos;s Moments — Made with care, memories and a little bit of magic.
      </footer>
    </div>
  );
}
