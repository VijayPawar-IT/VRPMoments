import React, { useState } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { SAMPLE_MEMORIES_DATA } from '../../utils/sampleData';
import { FairyLights } from '../common/FairyLights';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScreenMemoryLaneProps {
  onNext: () => void;
}

export function ScreenMemoryLane({ onNext }: ScreenMemoryLaneProps) {
  const { data } = useBirthday();
  const memories = data.memories && data.memories.length > 0 ? data.memories : SAMPLE_MEMORIES_DATA;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Swipe gesture handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Minimum swipe threshold 40px
    if (diff > 40 && currentIndex < memories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (diff < -40 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    setTouchStart(null);
  };

  const currentMem = memories[currentIndex];
  const isLast = currentIndex === memories.length - 1;

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-between items-center text-center px-4 py-4 select-none max-w-2xl mx-auto">
      {/* Top Fairy Lights Accent */}
      <div className="w-full">
        <FairyLights count={10} />
      </div>

      {/* Header */}
      <div className="space-y-1 mt-1 mb-3">
        <span className="text-xs uppercase tracking-widest text-[#E5C384] font-semibold">
          MEMORIES ({currentIndex + 1} / {memories.length})
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5EE] tracking-tight">
          A walk down memory lane 📸
        </h2>
        <p className="text-xs text-[#FAF5EE]/70">
          Some moments deserve another look.
        </p>
      </div>

      {/* Main Single Photo Stage with Polaroid Card Styling */}
      <div
        className="w-full flex justify-center py-2"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMem.id || currentIndex}
            initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.95, rotate: 1 }}
            transition={{ duration: 0.45 }}
            className="relative bg-[#FAF5EE] p-3 sm:p-4 pb-6 rounded-2xl shadow-2xl border border-white/20 max-w-md w-full text-[#1E050D]"
          >
            {/* Hanging Clip Pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-4 h-6 bg-gradient-to-b from-[#E5C384] to-[#B88E44] rounded-sm shadow-md" />

            {/* Photo Image Frame */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-900 shadow-inner">
              <motion.img
                src={currentMem.url}
                alt={currentMem.caption || 'Memory photo'}
                className="w-full h-full object-cover"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 4, ease: 'easeOut' }}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Photo Caption & Date */}
            <div className="mt-4 text-left px-1">
              <p className="font-serif italic text-base sm:text-lg text-[#2A0816] leading-snug">
                &ldquo;{currentMem.caption}&rdquo;
              </p>
              {currentMem.dateOrLocation && (
                <p className="text-xs font-medium text-[#881337] mt-1 tracking-wider uppercase">
                  {currentMem.dateOrLocation}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls: Arrows on Desktop, Swipe Indicator on Mobile */}
      <div className="w-full flex items-center justify-between max-w-md py-2">
        <button
          type="button"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          aria-label="Previous memory"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-[#2A0916] text-[#FAF5EE] border border-[#E5C384]/20 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#3E0E24] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots indicator */}
        <div className="flex items-center gap-1.5">
          {memories.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to memory ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? 'w-6 bg-[#E5C384]' : 'w-2 bg-[#FAF5EE]/30'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          disabled={isLast}
          onClick={() => setCurrentIndex((prev) => Math.min(memories.length - 1, prev + 1))}
          aria-label="Next memory"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-[#2A0916] text-[#FAF5EE] border border-[#E5C384]/20 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#3E0E24] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Final step trigger when at end */}
      <div className="w-full max-w-md pt-2">
        {isLast ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <p className="text-xs text-[#E5C384] italic">
              Some memories become favourites without us even realizing it.
            </p>
            <button
              type="button"
              onClick={onNext}
              className="w-full min-h-[48px] px-8 py-3 flex items-center justify-center gap-2 rounded-2xl text-sm font-bold text-[#1E050D] bg-gradient-to-r from-[#E5C384] via-[#F3D59B] to-[#E5C384] hover:shadow-[0_0_25px_rgba(229,195,132,0.5)] transition-all active:scale-[0.98]"
            >
              <span>One Last Thing 💌</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <p className="text-[11px] text-[#FAF5EE]/40 italic">
            Swipe left or tap arrows to view more memories
          </p>
        )}
      </div>
    </div>
  );
}
