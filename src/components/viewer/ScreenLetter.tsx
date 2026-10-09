import { useState } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { audio } from '../../utils/audio';
import { Mail, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScreenLetterProps {
  onNext: () => void;
}

export function ScreenLetter({ onNext }: ScreenLetterProps) {
  const { data } = useBirthday();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    audio.playRustle();
    audio.playChime();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 select-none max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="sealed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 max-w-md w-full"
          >
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#E5C384] font-semibold">
                ONE LAST THING...
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EE] tracking-tight">
                Someone wrote you a letter.
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF5EE]/75">
                Take a quiet moment to read what&apos;s inside.
              </p>
            </div>

            {/* Letter Envelope */}
            <div
              onClick={handleOpen}
              className="relative cursor-pointer group bg-[#FAF5EE] rounded-3xl p-6 shadow-2xl border-2 border-[#E5C384]/50 flex flex-col items-center justify-center min-h-[220px] transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              <div className="w-14 h-14 rounded-full bg-[#E5C384]/20 border border-[#E5C384] flex items-center justify-center text-[#881337] mb-3 shadow-inner">
                <Mail className="w-7 h-7" />
              </div>
              <div className="font-serif italic text-xl text-[#881337] font-semibold">
                For {data.recipientName}
              </div>
              <p className="text-xs text-[#4A1226]/60 mt-1">
                From {data.senderName} with love
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpen}
              className="w-full min-h-[50px] px-8 py-3.5 flex items-center justify-center gap-2 rounded-2xl text-sm font-bold text-[#1E050D] bg-gradient-to-r from-[#E5C384] via-[#F3D59B] to-[#E5C384] hover:shadow-[0_0_25px_rgba(229,195,132,0.5)] transition-all active:scale-[0.98]"
            >
              <Heart className="w-4 h-4 fill-[#1E050D]" />
              <span>Open My Letter 💌</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="unfolded"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="space-y-6 max-w-xl w-full"
          >
            {/* The Unfolded Letter on Warm Cream Parchment */}
            <div className="relative rounded-3xl bg-[#FAF5EE] text-[#1E050D] p-6 sm:p-10 shadow-[0_25px_50px_rgba(0,0,0,0.7)] border-2 border-[#E5C384]/60 text-left">
              {/* Subtle watermark or corner accent */}
              <div className="absolute top-4 right-4 text-[#881337]/15 font-serif italic text-4xl select-none">
                ♥
              </div>

              {/* Salutation */}
              <div className="font-serif text-2xl sm:text-3xl text-[#881337] font-semibold mb-5">
                Dear {data.recipientName},
              </div>

              {/* Body in handwritten / refined serif typeface */}
              <div className="font-serif text-lg sm:text-xl text-[#2B0A16] leading-relaxed whitespace-pre-line">
                {data.letter ||
                  "Every year I try to find the perfect words to tell you what you mean to me. Some people make life better simply by being in it, and you are truly one of them. Happy Birthday!"}
              </div>

              {/* Signoff */}
              <div className="mt-8 pt-4 border-t border-[#881337]/20 flex flex-col items-end">
                <span className="font-serif italic text-base sm:text-lg text-[#881337]">
                  With all my love,
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#881337] mt-0.5">
                  {data.senderName}
                </span>
              </div>
            </div>

            {/* Next Celebration Button */}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={onNext}
                className="min-h-[50px] px-8 py-3.5 flex items-center gap-2 rounded-2xl text-sm font-bold text-[#1E050D] bg-gradient-to-r from-[#E5C384] via-[#F3D59B] to-[#E5C384] hover:shadow-[0_0_25px_rgba(229,195,132,0.5)] transition-all active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-[#1E050D]" />
                <span>Celebrate Together ✨</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
