import { useBirthday } from '../../context/BirthdayContext';
import { CakeIllustration } from '../common/CakeIllustration';
import { CakeType } from '../../types/birthday';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CakeOption {
  id: CakeType;
  name: string;
  description: string;
  tag: string;
}

const CAKE_OPTIONS: CakeOption[] = [
  {
    id: 'midnight-chocolate',
    name: 'Midnight Chocolate',
    description: 'Rich, dark & dreamy',
    tag: 'Decadent Cacao & Gold Drip',
  },
  {
    id: 'strawberry-blush',
    name: 'Strawberry Blush',
    description: 'Soft, sweet & rosy',
    tag: 'Whipped Cream & Fresh Berry',
  },
  {
    id: 'vanilla-gold',
    name: 'Vanilla Gold',
    description: 'Classic, warm & glowing',
    tag: 'Vanilla Bean & Champagne Flakes',
  },
];

export function StepCake() {
  const { data, updateData, nextStep, prevStep } = useBirthday();

  const handleSelect = (id: CakeType) => {
    updateData({ cake: id });
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-md mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5EE] tracking-tight">
          Pick their cake 🎂
        </h2>
        <p className="text-sm text-[#FAF5EE]/75 mt-2">
          They&apos;ll light the candles, make a wish and blow them out.
        </p>
      </div>

      {/* 3 Interactive Cake Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {CAKE_OPTIONS.map((cake) => {
          const isSelected = data.cake === cake.id;

          return (
            <motion.div
              key={cake.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(cake.id)}
              className={`relative cursor-pointer rounded-3xl p-5 flex flex-col items-center text-center transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-b from-[#3E0E24] to-[#250817] border-2 border-[#E5C384] shadow-[0_0_30px_rgba(229,195,132,0.3)]'
                  : 'bg-[#250816]/70 border border-[#E5C384]/15 hover:border-[#E5C384]/40 hover:bg-[#2F0B1E]/70'
              }`}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  handleSelect(cake.id);
                }
              }}
            >
              {/* Check indicator */}
              <div
                className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#E5C384] text-[#1E050D] shadow-sm'
                    : 'border border-[#FAF5EE]/20 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>

              {/* Cake Illustration */}
              <div className="py-2">
                <CakeIllustration type={cake.id} isLit={true} size="sm" />
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-lg font-bold text-[#FAF5EE] mt-3">
                {cake.name}
              </h3>
              <p className="text-xs text-[#E5C384] font-medium mt-0.5">
                {cake.description}
              </p>
              <p className="text-[11px] text-[#FAF5EE]/60 mt-1">
                {cake.tag}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between max-w-4xl mx-auto pt-4">
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
          onClick={nextStep}
          className="min-h-[44px] px-6 py-2.5 flex items-center gap-2 rounded-xl text-xs sm:text-sm font-semibold text-[#1E050D] bg-[#E5C384] hover:bg-[#F3D59B] transition-all shadow-md active:scale-[0.98]"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
