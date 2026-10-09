import { useState } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { LETTER_STARTER_TEMPLATES } from '../../utils/sampleData';
import { Sparkles, ArrowLeft, Heart, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StepLetterProps {
  onComplete: () => void;
}

export function StepLetter({ onComplete }: StepLetterProps) {
  const { data, updateData, prevStep } = useBirthday();
  const [showInspirations, setShowInspirations] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const letter = data.letter || '';
  const maxChars = 500;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= maxChars) {
      updateData({ letter: val });
      if (error) setError(null);
    }
  };

  const handleApplyTemplate = (text: string) => {
    // Personalize template with names if present
    const personalized = text.replace(/\[NAME\]/g, data.recipientName || 'friend');
    updateData({ letter: personalized });
    setShowInspirations(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!letter.trim()) {
      setError('Please write at least a few kind words in the birthday letter.');
      return;
    }
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center max-w-md mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5EE] tracking-tight">
          Write your birthday letter 💌
        </h2>
        <p className="text-sm text-[#FAF5EE]/75 mt-2">
          This is the part they&apos;ll probably read twice.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Inspiration trigger toggle */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#E5C384] uppercase tracking-wider flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5" />
            <span>Your Personal Message</span>
          </span>

          <button
            type="button"
            onClick={() => setShowInspirations(!showInspirations)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#E5C384] bg-[#2E0B1A] border border-[#E5C384]/30 hover:bg-[#3D0E23] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{showInspirations ? 'Hide starters' : 'Need inspiration? ✨'}</span>
          </button>
        </div>

        {/* Local Inspiration drawer */}
        <AnimatePresence>
          {showInspirations && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-2xl bg-[#280918] border border-[#E5C384]/25 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E5C384]">
                  <Lightbulb className="w-4 h-4" />
                  <span>Choose a starting thought (you can edit it anytime):</span>
                </div>
                <div className="space-y-2">
                  {LETTER_STARTER_TEMPLATES.map((tmpl, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#1B0610] border border-[#E5C384]/15 hover:border-[#E5C384]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-semibold text-[#E5C384] uppercase tracking-wider">
                          {tmpl.label}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleApplyTemplate(tmpl.text)}
                          className="text-xs text-[#FAF5EE] bg-[#3E0E24] hover:bg-[#581232] px-2.5 py-0.5 rounded-md transition-colors"
                        >
                          Use this
                        </button>
                      </div>
                      <p className="text-xs text-[#FAF5EE]/80 line-clamp-2 italic">
                        &ldquo;{tmpl.text}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="p-3 text-xs text-rose-300 bg-rose-950/60 border border-rose-500/30 rounded-xl">
            {error}
          </div>
        )}

        {/* Parchment Styled Letter Container */}
        <div className="relative rounded-3xl bg-[#FAF5EE] p-6 sm:p-8 text-[#1E050D] shadow-2xl border-2 border-[#E5C384]/50">
          <div className="font-serif text-lg text-[#881337] font-semibold mb-2">
            Dear {data.recipientName || 'Birthday Star'},
          </div>

          <textarea
            rows={7}
            value={letter}
            onChange={handleTextChange}
            placeholder="Write from the heart... What makes them irreplaceable? What memories made you smile this year? What do you wish for them as they start this new chapter?"
            className="w-full bg-transparent border-0 resize-none text-base leading-relaxed text-[#2A0816] placeholder:text-neutral-400 focus:outline-none font-sans"
          />

          <div className="mt-4 pt-3 border-t border-neutral-300 flex items-center justify-between text-xs text-neutral-500">
            <span className="italic font-serif text-[#881337] text-sm">
              With all my love, {data.senderName || 'Your Name'}
            </span>
            <span className={`font-mono text-xs ${letter.length >= maxChars ? 'text-rose-600 font-bold' : ''}`}>
              {letter.length} / {maxChars}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between max-w-2xl mx-auto pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="min-h-[44px] px-5 py-2.5 flex items-center gap-2 rounded-xl text-xs sm:text-sm font-medium text-[#FAF5EE]/80 bg-[#250816] border border-[#FAF5EE]/15 hover:bg-[#340C20] hover:text-[#FAF5EE] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          className="min-h-[48px] px-7 py-3 flex items-center gap-2 rounded-2xl text-sm font-bold text-[#1E050D] bg-gradient-to-r from-[#E5C384] via-[#F3D59B] to-[#E5C384] hover:shadow-[0_0_25px_rgba(229,195,132,0.5)] transition-all active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4 text-[#1E050D]" />
          <span>Create the Magic ✨</span>
        </button>
      </div>
    </form>
  );
}
