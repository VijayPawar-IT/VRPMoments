import { useState, useEffect } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { audio } from '../../utils/audio';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScreenRevealProps {
  onNext: () => void;
}

export function ScreenReveal({ onNext }: ScreenRevealProps) {
  const { data } = useBirthday();
  const [phase, setPhase] = useState<number>(1);

  useEffect(() => {
    // Stage 1 -> Stage 2 after 1.8s
    const t1 = setTimeout(() => {
      setPhase(2);
      audio.playChime();
    }, 1800);

    // Stage 2 -> Stage 3 after another 1.8s
    const t2 = setTimeout(() => {
      setPhase(3);
      audio.playSparkle();
    }, 3600);

    // Stage 3 -> Stage 4 after another 1.6s
    const t3 = setTimeout(() => {
      setPhase(4);
    }, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 select-none">
      <div className="max-w-xl w-full space-y-8">
        {/* Animated Sequence Container */}
        <div className="min-h-[200px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === 1 && (
              <motion.div
                key="phase-1"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="space-y-2"
              >
                <span className="text-xs uppercase tracking-widest text-[#E5C384] font-semibold">
                  TODAY IS SACRED
                </span>
                <h1 className="font-serif text-5xl sm:text-7xl font-bold text-[#FAF5EE] tracking-tight">
                  Happy Birthday
                </h1>
              </motion.div>
            )}

            {phase === 2 && (
              <motion.div
                key="phase-2"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-3"
              >
                <div className="font-serif text-4xl sm:text-6xl font-light italic text-[#E5C384]">
                  to someone worth celebrating ✨
                </div>
                <p className="text-lg text-[#FAF5EE]/80 font-serif">
                  {data.recipientName}
                </p>
              </motion.div>
            )}

            {phase >= 3 && (
              <motion.div
                key="phase-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="text-xs uppercase tracking-widest text-[#E5C384] font-semibold">
                  A CELEBRATION OF YOU
                </div>
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#FAF5EE] tracking-tight leading-tight">
                  Today is officially <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C384] via-[#FCE7F0] to-[#E5C384]">
                    YOUR DAY.
                  </span>
                </h1>
                <p className="font-serif italic text-xl sm:text-2xl text-[#E5C384] pt-2">
                  Make a wish...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="pt-4 flex justify-center"
        >
          <button
            type="button"
            onClick={onNext}
            className="min-h-[48px] px-8 py-3 flex items-center gap-2 rounded-2xl text-sm font-bold text-[#1E050D] bg-gradient-to-r from-[#E5C384] via-[#F3D59B] to-[#E5C384] hover:shadow-[0_0_25px_rgba(229,195,132,0.5)] transition-all active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-[#1E050D]" />
            <span>Make a wish →</span>
            <ArrowRight className="w-4 h-4 text-[#1E050D]" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
