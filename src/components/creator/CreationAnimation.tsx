import { useState, useEffect } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { FloatingParticles } from '../common/FloatingParticles';
import { audio } from '../../utils/audio';
import { triggerBurstConfetti } from '../../utils/confetti';
import { Sparkles, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CreationAnimationProps {
  onUnwrap: () => void;
}

const CHECKLIST_ITEMS = [
  'Lighting the candles',
  'Tying the balloons',
  'Hanging the memories',
  'Sealing the letter',
  'Adding a little magic',
];

export function CreationAnimation({ onUnwrap }: CreationAnimationProps) {
  const { data } = useBirthday();
  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    // Stagger checklist items
    const interval = setInterval(() => {
      setCompletedSteps((prev) => {
        if (prev < CHECKLIST_ITEMS.length) {
          audio.playChime();
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 550);

    const finishTimer = setTimeout(() => {
      setIsFinished(true);
      triggerBurstConfetti();
      audio.playCelebration();
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#18040B] via-[#2A0815] to-[#120207] p-6 text-center select-none overflow-hidden">
      <FloatingParticles count={25} />

      <div className="relative z-10 max-w-md w-full mx-auto">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key="building"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="inline-flex p-3 rounded-full bg-[#E5C384]/15 border border-[#E5C384]/30 text-[#E5C384] animate-spin-slow">
                <Sparkles className="w-8 h-8" />
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5EE] tracking-tight">
                Creating your birthday moment...
              </h2>

              {/* Animated Checklist */}
              <div className="bg-[#230612]/80 border border-[#E5C384]/20 rounded-2xl p-5 text-left space-y-3.5 backdrop-blur-md shadow-2xl">
                {CHECKLIST_ITEMS.map((item, index) => {
                  const isDone = completedSteps > index;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0.4, x: -10 }}
                      animate={{
                        opacity: isDone ? 1 : 0.4,
                        x: 0,
                      }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          isDone
                            ? 'bg-[#E5C384] text-[#1E050D] shadow-[0_0_10px_rgba(229,195,132,0.5)]'
                            : 'border border-[#FAF5EE]/30 text-transparent'
                        }`}
                      >
                        ✓
                      </div>
                      <span className={`transition-colors duration-300 ${isDone ? 'text-[#FAF5EE] font-medium' : 'text-[#FAF5EE]/50'}`}>
                        {item}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="space-y-6"
            >
              <div className="inline-flex p-4 rounded-3xl bg-[#E5C384]/20 border border-[#E5C384]/40 text-[#E5C384] shadow-[0_0_30px_rgba(229,195,132,0.3)]">
                <Gift className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#E5C384] font-semibold">
                  SURPRISE READY
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EE] tracking-tight mt-1">
                  A surprise for {data.recipientName}
                </h2>
                <p className="text-sm text-[#FAF5EE]/80 mt-2 max-w-sm mx-auto">
                  Someone who loves you made this — just for you.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onUnwrap}
                  className="w-full min-h-[52px] px-8 py-3.5 flex items-center justify-center gap-2 rounded-2xl text-base font-bold text-[#1E050D] bg-gradient-to-r from-[#E5C384] via-[#F3D59B] to-[#E5C384] hover:shadow-[0_0_30px_rgba(229,195,132,0.5)] transition-all active:scale-[0.98]"
                >
                  <Sparkles className="w-5 h-5 text-[#1E050D]" />
                  <span>Unwrap It ✨</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
