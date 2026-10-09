import { useState } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { INSPIRATION_BALLOONS } from '../../utils/sampleData';
import { BalloonIllustration } from '../common/BalloonIllustration';
import { Sparkles, Plus, Trash2, ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function StepBalloons() {
  const { data, updateData, nextStep, prevStep } = useBirthday();
  const [showInspirations, setShowInspirations] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reasons = data.reasons || [];

  const handleReasonChange = (index: number, val: string) => {
    const updated = [...reasons];
    updated[index] = val;
    updateData({ reasons: updated });
    if (error) setError(null);
  };

  const addBalloon = () => {
    if (reasons.length >= 6) return;
    const randomInspiration = INSPIRATION_BALLOONS[reasons.length % INSPIRATION_BALLOONS.length];
    updateData({ reasons: [...reasons, randomInspiration] });
  };

  const removeBalloon = (index: number) => {
    if (reasons.length <= 3) {
      setError('Please keep at least 3 reasons for the balloon experience.');
      return;
    }
    const updated = reasons.filter((_, i) => i !== index);
    updateData({ reasons: updated });
  };

  const applyInspiration = (text: string) => {
    // Fill first empty slot or append if < 6
    const emptyIndex = reasons.findIndex((r) => !r.trim());
    if (emptyIndex !== -1) {
      handleReasonChange(emptyIndex, text);
    } else if (reasons.length < 6) {
      updateData({ reasons: [...reasons, text] });
    } else {
      // replace the last one
      handleReasonChange(reasons.length - 1, text);
    }
    setShowInspirations(false);
  };

  const handleContinue = () => {
    // Validate that at least 3 reasons have text
    const filled = reasons.filter((r) => r.trim().length > 0);
    if (filled.length < 3) {
      setError('Please provide at least 3 reasons so the balloons feel magical.');
      return;
    }
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-md mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5EE] tracking-tight">
          Fill the balloons 🎈
        </h2>
        <p className="text-sm text-[#FAF5EE]/75 mt-2">
          Each balloon hides one reason they&apos;re special.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {/* Inspiration trigger toggle */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setShowInspirations(!showInspirations)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#E5C384] bg-[#2E0B1A] border border-[#E5C384]/30 hover:bg-[#3D0E23] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{showInspirations ? 'Hide inspiration' : 'Need inspiration? ✨'}</span>
          </button>
        </div>

        {/* Local Inspiration Drawer */}
        <AnimatePresence>
          {showInspirations && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-2xl bg-[#280918] border border-[#E5C384]/25 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E5C384]">
                  <Lightbulb className="w-4 h-4" />
                  <span>Tap any thought to add it to your balloons:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {INSPIRATION_BALLOONS.map((insp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applyInspiration(insp)}
                      className="text-left text-xs p-2.5 rounded-xl bg-[#1B0610] text-[#FAF5EE]/85 hover:text-[#FAF5EE] hover:bg-[#340C20] border border-[#E5C384]/15 hover:border-[#E5C384]/40 transition-all"
                    >
                      &ldquo;{insp}&rdquo;
                    </button>
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

        {/* Balloons List */}
        <div className="space-y-3">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#250816]/70 border border-[#E5C384]/20 backdrop-blur-sm"
            >
              <div className="shrink-0 w-8 h-10 flex items-center justify-center">
                <BalloonIllustration
                  colorIndex={index}
                  interactive={false}
                  size="sm"
                  className="!w-7 !h-10"
                />
              </div>

              <div className="flex-1">
                <label className="block text-[10px] font-semibold text-[#E5C384] uppercase tracking-wider mb-1">
                  Balloon #{index + 1}
                </label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => handleReasonChange(index, e.target.value)}
                  placeholder="e.g. Your laugh is my absolute favourite sound"
                  maxLength={120}
                  className="w-full px-3 py-2 text-xs sm:text-sm text-[#FAF5EE] bg-[#1B0610] rounded-xl border border-[#E5C384]/20 focus:outline-none focus:border-[#E5C384] focus:ring-1 focus:ring-[#E5C384] placeholder:text-[#FAF5EE]/30"
                />
              </div>

              {reasons.length > 3 && (
                <button
                  type="button"
                  onClick={() => removeBalloon(index)}
                  aria-label={`Delete balloon ${index + 1}`}
                  className="p-2 text-[#FAF5EE]/40 hover:text-rose-400 rounded-lg hover:bg-rose-950/40 transition-colors self-end mb-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Balloon Button */}
        {reasons.length < 6 && (
          <button
            type="button"
            onClick={addBalloon}
            className="w-full min-h-[44px] py-2.5 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#E5C384]/30 text-xs font-semibold text-[#E5C384] hover:bg-[#E5C384]/10 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Balloon ({reasons.length}/6)</span>
          </button>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between max-w-3xl mx-auto pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="min-h-[44px] px-5 py-2.5 flex items-center gap-2 rounded-xl text-xs sm:text-sm font-medium text-[#FAF5EE]/80 bg-[#250816] border border-[#FAF5EE]/15 hover:bg-[#340C20] hover:text-[#FAF5EE] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="min-h-[44px] px-6 py-2.5 flex items-center gap-2 rounded-xl text-xs sm:text-sm font-semibold text-[#1E050D] bg-[#E5C384] hover:bg-[#F3D59B] transition-all shadow-md active:scale-[0.98]"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
