import { useState } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { audio } from '../../utils/audio';
import { Sparkles, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface ScreenEnvelopeProps {
  onNext: () => void;
}

export function ScreenEnvelope({ onNext }: ScreenEnvelopeProps) {
  const { data, toggleAudio, isAudioPlaying } = useBirthday();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    audio.playRustle();
    audio.playChime();
    // Start background music automatically if not already on
    if (!isAudioPlaying) {
      toggleAudio();
    }
    setTimeout(() => {
      onNext();
    }, 1200);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 select-none">
      {/* Intro Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-2 mb-8"
      >
        <span className="text-xs uppercase tracking-widest text-[#E5C384] font-semibold">
          FOR SOMEONE SPECIAL...
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#FAF5EE] tracking-tight">
          {data.recipientName}
        </h1>
        <p className="text-sm sm:text-base text-[#FAF5EE]/75 max-w-sm mx-auto">
          You have a little something waiting for you.
        </p>
      </motion.div>

      {/* Sealed Envelope Graphic */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, delay: 0.4 }}
        className="relative w-72 sm:w-80 h-48 sm:h-52 cursor-pointer group"
        onClick={!isOpen ? handleOpen : undefined}
      >
        {/* Envelope Body */}
        <div className="relative w-full h-full bg-[#FAF5EE] rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.6)] border-2 border-[#E5C384]/60 overflow-hidden flex items-center justify-center">
          {/* Decorative Corner Filigrees */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#881337]/30" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#881337]/30" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#881337]/30" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#881337]/30" />

          {/* Recipient Monogram / Label */}
          <div className="text-center px-4">
            <div className="font-serif italic text-2xl text-[#881337] font-bold">
              {data.recipientName}
            </div>
            <div className="text-[11px] text-[#4A1226]/70 uppercase tracking-widest mt-1">
              Private &amp; Confidential
            </div>
          </div>

          {/* Envelope Top Flap */}
          <motion.div
            className="absolute top-0 left-0 w-full h-24 origin-top z-10"
            animate={isOpen ? { rotateX: 180, opacity: 0 } : { rotateX: 0 }}
            transition={{ duration: 0.8 }}
          >
            <svg viewBox="0 0 320 96" className="w-full h-full drop-shadow-md" preserveAspectRatio="none">
              <polygon points="0,0 320,0 160,96" fill="#F5EBE1" stroke="#E5C384" strokeWidth="1.5" />
            </svg>
          </motion.div>

          {/* Golden Wax Seal */}
          <motion.div
            className="absolute z-20 w-12 h-12 rounded-full bg-gradient-to-br from-[#E5C384] via-[#B88E44] to-[#785418] shadow-lg flex items-center justify-center border-2 border-[#FAF5EE]"
            animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Heart className="w-5 h-5 text-[#FAF5EE] fill-[#FAF5EE]/40" />
          </motion.div>
        </div>
      </motion.div>

      {/* Button to Open */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <button
          type="button"
          onClick={handleOpen}
          disabled={isOpen}
          className="min-h-[48px] px-8 py-3 flex items-center gap-2 rounded-2xl text-sm font-bold text-[#1E050D] bg-gradient-to-r from-[#E5C384] via-[#F3D59B] to-[#E5C384] hover:shadow-[0_0_25px_rgba(229,195,132,0.5)] transition-all active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4 text-[#1E050D]" />
          <span>{isOpen ? 'Unfolding...' : 'Open the Surprise ✨'}</span>
        </button>
      </motion.div>
    </div>
  );
}
