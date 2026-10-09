import React, { useState } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { BalloonIllustration } from '../common/BalloonIllustration';
import { audio } from '../../utils/audio';
import { triggerPopConfetti } from '../../utils/confetti';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScreenBalloonsProps {
  onNext: () => void;
}

export function ScreenBalloons({ onNext }: ScreenBalloonsProps) {
  const { data } = useBirthday();
  const reasons = data.reasons && data.reasons.length > 0 ? data.reasons : [
    'Your smile makes everything brighter.',
    'You are genuinely kind to everyone you meet.',
    'You make ordinary days feel like an adventure.',
  ];

  const [poppedIndices, setPoppedIndices] = useState<number[]>([]);
  const [activeRevealedReason, setActiveRevealedReason] = useState<{
    index: number;
    text: string;
  } | null>(null);

  const handlePop = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (poppedIndices.includes(index)) return;

    audio.playPop();
    triggerPopConfetti(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);

    const newPopped = [...poppedIndices, index];
    setPoppedIndices(newPopped);
    setActiveRevealedReason({ index, text: reasons[index] });

    if (newPopped.length === reasons.length) {
      setTimeout(() => {
        audio.playCelebration();
      }, 700);
    }
  };

  const isAllPopped = poppedIndices.length === reasons.length;

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-between text-center px-4 py-8 select-none max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-1 max-w-md mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#E5C384] font-semibold">
          POPPED: {poppedIndices.length} / {reasons.length}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EE] tracking-tight">
          Pop the balloons 🎈
        </h2>
        <p className="text-xs sm:text-sm text-[#FAF5EE]/75">
          Each one hides a reason why you are so special.
        </p>
      </div>

      {/* Floating Balloons Cluster */}
      <div className="relative w-full max-w-2xl min-h-[300px] sm:min-h-[340px] flex items-center justify-center my-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 items-center justify-items-center w-full">
          {reasons.map((_, idx) => {
            const isPopped = poppedIndices.includes(idx);
            // Stagger bobbing animation
            const floatDelays = [0, 0.4, 0.8, 0.2, 0.6, 1.0];

            return (
              <motion.div
                key={idx}
                animate={
                  !isPopped
                    ? {
                        y: ['0px', '-14px', '0px'],
                        rotate: [(idx % 2 === 0 ? 1 : -1) * -3, (idx % 2 === 0 ? 1 : -1) * 3, (idx % 2 === 0 ? 1 : -1) * -3],
                      }
                    : {}
                }
                transition={{
                  duration: 3 + (idx % 3) * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: floatDelays[idx % floatDelays.length],
                }}
                className="relative"
              >
                <BalloonIllustration
                  colorIndex={idx}
                  popped={isPopped}
                  onClick={(e) => handlePop(idx, e)}
                  numberLabel={idx + 1}
                  size="md"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Revealed Reason Card or Congratulations */}
      <div className="w-full max-w-md min-h-[140px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {isAllPopped ? (
            <motion.div
              key="all-done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 p-5 rounded-3xl bg-[#2E0B1A] border-2 border-[#E5C384]/40 shadow-2xl"
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#E5C384] uppercase tracking-wider">
                <Heart className="w-4 h-4 fill-[#E5C384]" />
                <span>All Balloons Popped</span>
              </div>
              <p className="font-serif text-lg sm:text-xl text-[#FAF5EE] font-medium">
                Okay... you have officially been reminded how special you are. 💛
              </p>
              <button
                type="button"
                onClick={onNext}
                className="min-h-[48px] px-8 py-3 inline-flex items-center gap-2 rounded-2xl text-sm font-bold text-[#1E050D] bg-gradient-to-r from-[#E5C384] via-[#F3D59B] to-[#E5C384] hover:shadow-[0_0_25px_rgba(229,195,132,0.5)] transition-all active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-[#1E050D]" />
                <span>Keep Going ✨</span>
                <ArrowRight className="w-4 h-4 text-[#1E050D]" />
              </button>
            </motion.div>
          ) : activeRevealedReason ? (
            <motion.div
              key={activeRevealedReason.index}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-5 rounded-2xl bg-[#260816]/90 border border-[#E5C384]/30 shadow-xl w-full"
            >
              <span className="text-[10px] uppercase tracking-widest text-[#E5C384] font-semibold">
                REASON #{activeRevealedReason.index + 1}
              </span>
              <p className="font-serif text-lg sm:text-xl text-[#FAF5EE] mt-1.5 italic">
                &ldquo;{activeRevealedReason.text}&rdquo;
              </p>
            </motion.div>
          ) : (
            <p className="text-xs text-[#FAF5EE]/60 italic">
              Tap any floating balloon above to pop it and reveal what&apos;s inside!
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
