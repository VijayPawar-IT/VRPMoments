import { useState } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { CakeIllustration } from '../common/CakeIllustration';
import { audio } from '../../utils/audio';
import { triggerBurstConfetti } from '../../utils/confetti';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScreenCakeProps {
  onNext: () => void;
}

export function ScreenCake({ onNext }: ScreenCakeProps) {
  const { data } = useBirthday();
  const [isLit, setIsLit] = useState<boolean>(true);
  const [wished, setWished] = useState<boolean>(false);

  const handleBlowOut = () => {
    if (!isLit) return;
    setIsLit(false);
    audio.playBlow();
    audio.playSparkle();
    triggerBurstConfetti();

    setTimeout(() => {
      setWished(true);
      audio.playCelebration();
    }, 900);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 select-none">
      <div className="max-w-md w-full space-y-6">
        {/* Dynamic header */}
        <AnimatePresence mode="wait">
          {!wished ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-1.5"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#E5C384] bg-[#2E0B1A] border border-[#E5C384]/30">
                <Flame className="w-3.5 h-3.5 text-[#E5C384] animate-bounce" />
                <span>TAP CANDLES TO BLOW</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EE] tracking-tight">
                Make a silent wish...
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF5EE]/75">
                Take a deep breath and tap the candles to blow them out.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="wished"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-2"
            >
              <span className="text-xs uppercase tracking-widest text-[#E5C384] font-semibold">
                YOUR WISH IS SENT TO THE UNIVERSE
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF5EE] tracking-tight">
                Happy Birthday, {data.recipientName}! 🎂
              </h2>
              <p className="text-sm text-[#FAF5EE]/80 max-w-xs mx-auto">
                May every dream you hold in your heart take flight this year.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Interactive Cake */}
        <div className="relative flex justify-center py-4">
          <CakeIllustration
            type={data.cake || 'midnight-chocolate'}
            isLit={isLit}
            onBlow={handleBlowOut}
            interactive={isLit}
            size="lg"
          />
        </div>

        {/* Interaction Guidance / Next step button */}
        <div className="pt-2">
          {isLit ? (
            <button
              type="button"
              onClick={handleBlowOut}
              className="min-h-[46px] px-6 py-2.5 inline-flex items-center gap-2 rounded-2xl text-xs sm:text-sm font-semibold text-[#1E050D] bg-[#E5C384] hover:bg-[#F3D59B] transition-all shadow-lg active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-[#1E050D]" />
              <span>Tap to blow candles 💨</span>
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                type="button"
                onClick={onNext}
                className="min-h-[50px] px-8 py-3.5 inline-flex items-center gap-2 rounded-2xl text-sm font-bold text-[#1E050D] bg-gradient-to-r from-[#E5C384] via-[#F3D59B] to-[#E5C384] hover:shadow-[0_0_25px_rgba(229,195,132,0.5)] transition-all active:scale-[0.98]"
              >
                <span>Pop the Balloons 🎈</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
