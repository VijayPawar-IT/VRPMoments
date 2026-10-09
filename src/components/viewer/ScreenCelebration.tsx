import { useState, useEffect } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { CakeIllustration } from '../common/CakeIllustration';
import { audio } from '../../utils/audio';
import { triggerGrandCelebration } from '../../utils/confetti';
import { shareLink, getWhatsAppShareUrl } from '../../utils/share';
import { Sparkles, RotateCcw, Share2, Copy, Check, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ScreenCelebrationProps {
  onReplay: () => void;
}

export function ScreenCelebration({ onReplay }: ScreenCelebrationProps) {
  const { data, shareUrl, setRoute } = useBirthday();
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [showLoveSent, setShowLoveSent] = useState(false);

  useEffect(() => {
    triggerGrandCelebration();
    audio.playCelebration();
  }, []);

  const handleCopy = async () => {
    const res = await shareLink(
      `Birthday Surprise for ${data.recipientName}`,
      `A special birthday moment made with love for ${data.recipientName}`,
      shareUrl
    );
    if (res === 'copied' || res === 'shared') {
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2500);
    }
  };

  const handleSendLove = () => {
    setShowLoveSent(true);
    triggerGrandCelebration();
    audio.playSparkle();
    setTimeout(() => setShowLoveSent(false), 3000);
  };

  const whatsappUrl = getWhatsAppShareUrl(data.recipientName, shareUrl);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-between text-center px-4 py-8 select-none max-w-2xl mx-auto">
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-2 mt-4"
      >
        <span className="text-xs uppercase tracking-widest text-[#E5C384] font-semibold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>A LIFELONG CELEBRATION</span>
          <Sparkles className="w-3.5 h-3.5" />
        </span>

        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black text-[#FAF5EE] tracking-tight leading-none">
          HAPPY <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C384] via-[#FCE7F0] to-[#E5C384]">
            BIRTHDAY
          </span>
        </h1>

        <div className="font-serif italic text-3xl sm:text-5xl text-[#E5C384] font-medium pt-2">
          {data.recipientName}
        </div>

        <p className="text-sm sm:text-base text-[#FAF5EE]/80 max-w-md mx-auto pt-2">
          Here&apos;s to another beautiful, radiant, unforgettable year of you.
        </p>
      </motion.div>

      {/* Center Cake & Accents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="my-6 relative flex flex-col items-center"
      >
        <CakeIllustration
          type={data.cake || 'midnight-chocolate'}
          isLit={false}
          size="md"
        />

        {showLoveSent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -20 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/2 -translate-y-1/2 px-4 py-2 rounded-2xl bg-[#E5C384] text-[#1E050D] text-xs font-bold shadow-2xl flex items-center gap-1.5 z-30"
          >
            <Heart className="w-4 h-4 fill-[#1E050D]" />
            <span>Love sent to the stars! 💛</span>
          </motion.div>
        )}
      </motion.div>

      {/* Action Buttons: Replay & Send Love */}
      <div className="w-full space-y-4 max-w-md">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={onReplay}
            className="w-full min-h-[48px] px-6 py-3 flex items-center justify-center gap-2 rounded-2xl text-xs sm:text-sm font-semibold text-[#FAF5EE] bg-[#2E0B1A] border border-[#E5C384]/30 hover:bg-[#3E0E24] hover:border-[#E5C384]/60 transition-all active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4 text-[#E5C384]" />
            <span>Replay the Moment ↻</span>
          </button>

          <button
            type="button"
            onClick={handleSendLove}
            className="w-full min-h-[48px] px-6 py-3 flex items-center justify-center gap-2 rounded-2xl text-xs sm:text-sm font-bold text-[#1E050D] bg-[#E5C384] hover:bg-[#F3D59B] transition-all shadow-lg active:scale-[0.98]"
          >
            <Heart className="w-4 h-4 fill-[#1E050D]" />
            <span>Send a little love 💛</span>
          </button>
        </div>

        {/* Share Options */}
        <div className="pt-3 border-t border-[#E5C384]/15">
          <div className="text-[11px] text-[#FAF5EE]/60 uppercase tracking-widest mb-2 font-medium">
            Share this surprise with them
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="min-h-[44px] px-4 py-2 flex items-center gap-1.5 rounded-xl text-xs font-medium text-[#FAF5EE] bg-[#230815] border border-[#FAF5EE]/20 hover:border-[#E5C384]/50 transition-colors"
            >
              {copyStatus === 'copied' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#E5C384]" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2 flex items-center gap-1.5 rounded-xl text-xs font-medium text-[#FAF5EE] bg-[#1F4E38] hover:bg-[#286649] transition-colors border border-emerald-500/30"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span>WhatsApp</span>
            </a>

            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                type="button"
                onClick={handleCopy}
                className="min-h-[44px] px-4 py-2 flex items-center gap-1.5 rounded-xl text-xs font-medium text-[#FAF5EE] bg-[#230815] border border-[#FAF5EE]/20 hover:border-[#E5C384]/50 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-[#E5C384]" />
                <span>Share</span>
              </button>
            )}
          </div>
        </div>

        {/* Creator Back Button if viewing */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setRoute('create')}
            className="text-xs text-[#FAF5EE]/50 hover:text-[#E5C384] transition-colors underline underline-offset-4"
          >
            Create another surprise for someone else →
          </button>
        </div>
      </div>
    </div>
  );
}
