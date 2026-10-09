import { useState } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { StepDetails } from './StepDetails';
import { StepCake } from './StepCake';
import { StepBalloons } from './StepBalloons';
import { StepMemories } from './StepMemories';
import { StepLetter } from './StepLetter';
import { CreationAnimation } from './CreationAnimation';
import { Eye, RotateCcw, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const STEP_TITLES = [
  'Details',
  'Cake',
  'Balloons',
  'Memories',
  'Letter',
];

export function CreatorWizard() {
  const { currentStep, setCurrentStep, setRoute, resetToDefault } = useBirthday();
  const [isCreatingAnimation, setIsCreatingAnimation] = useState(false);

  const handleCreationComplete = () => {
    setIsCreatingAnimation(true);
  };

  const handleUnwrap = () => {
    setIsCreatingAnimation(false);
    setRoute('view');
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 flex flex-col justify-between">
      {isCreatingAnimation && <CreationAnimation onUnwrap={handleUnwrap} />}

      <div className="max-w-4xl w-full mx-auto space-y-8">
        {/* Top Header & Subtitle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-[#E5C384]/15">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EE] tracking-tight">
              Create a Birthday Moment ✨
            </h1>
            <p className="text-sm text-[#FAF5EE]/75 mt-1">
              Turn your memories, words and wishes into a little experience they&apos;ll remember.
            </p>
          </div>

          {/* Quick Actions: Preview & Reset */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setRoute('preview')}
              className="min-h-[44px] px-3.5 py-1.5 flex items-center gap-1.5 rounded-xl text-xs font-semibold text-[#FAF5EE] bg-[#2E0B1A] border border-[#E5C384]/25 hover:bg-[#3D0E23] transition-all hover:border-[#E5C384]/50"
            >
              <Eye className="w-3.5 h-3.5 text-[#E5C384]" />
              <span>Preview ✨</span>
            </button>

            <button
              type="button"
              onClick={resetToDefault}
              title="Clear & Start Over"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-xs text-[#FAF5EE]/50 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5-Step Progress Indicator */}
        <div className="bg-[#240816]/70 rounded-2xl p-4 sm:p-5 border border-[#E5C384]/20 backdrop-blur-sm shadow-lg">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#E5C384] mb-3">
            <span>STEP {currentStep} OF 5</span>
            <span className="text-[#FAF5EE]/70 font-normal">{STEP_TITLES[currentStep - 1]}</span>
          </div>

          {/* Progress Bar & Step Dots */}
          <div className="relative">
            <div className="h-1.5 w-full bg-[#1B0610] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#E5C384] to-[#F3D59B]"
                initial={false}
                animate={{ width: `${(currentStep / 5) * 100}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>

            {/* Clickable Step Markers */}
            <div className="flex justify-between items-center mt-3">
              {STEP_TITLES.map((title, idx) => {
                const stepNum = idx + 1;
                const isPassed = stepNum < currentStep;
                const isCurrent = stepNum === currentStep;

                return (
                  <button
                    key={title}
                    type="button"
                    onClick={() => setCurrentStep(stepNum)}
                    className="flex flex-col items-center group cursor-pointer focus-visible:outline-none"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                        isPassed
                          ? 'bg-[#E5C384] text-[#1E050D]'
                          : isCurrent
                          ? 'bg-[#BE185D] text-white ring-2 ring-[#E5C384]'
                          : 'bg-[#1B0610] text-[#FAF5EE]/40 border border-[#FAF5EE]/20'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" /> : stepNum}
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs mt-1 transition-colors hidden sm:inline ${
                        isCurrent
                          ? 'text-[#E5C384] font-semibold'
                          : isPassed
                          ? 'text-[#FAF5EE]/80'
                          : 'text-[#FAF5EE]/40'
                      }`}
                    >
                      {title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Step Content with Motion Slide/Fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {currentStep === 1 && <StepDetails />}
            {currentStep === 2 && <StepCake />}
            {currentStep === 3 && <StepBalloons />}
            {currentStep === 4 && <StepMemories />}
            {currentStep === 5 && <StepLetter onComplete={handleCreationComplete} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtle bottom tag */}
      <div className="text-center pt-8 pb-4 text-xs text-[#FAF5EE]/40">
        Vijay&apos;s Moments — Made with care, memories and a little bit of magic.
      </div>
    </div>
  );
}
