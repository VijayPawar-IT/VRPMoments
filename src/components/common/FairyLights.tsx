import { motion } from 'motion/react';

export function FairyLights({ count = 12 }: { count?: number }) {
  const bulbs = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="relative w-full overflow-hidden h-12 pointer-events-none select-none" aria-hidden="true">
      {/* Curved wire */}
      <svg className="absolute top-0 left-0 w-full h-8" preserveAspectRatio="none" viewBox="0 0 1000 30">
        <path
          d="M0,8 Q250,22 500,10 T1000,12"
          fill="none"
          stroke="rgba(229, 195, 132, 0.3)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Twinkling light bulbs */}
      <div className="relative flex justify-around items-center px-4 pt-1">
        {bulbs.map((i) => {
          const colors = [
            'bg-[#FFE6A7] shadow-[0_0_12px_3px_rgba(255,230,167,0.7)]',
            'bg-[#FCE7F0] shadow-[0_0_12px_3px_rgba(252,231,240,0.6)]',
            'bg-[#E5C384] shadow-[0_0_12px_3px_rgba(229,195,132,0.75)]',
            'bg-[#FFAA85] shadow-[0_0_12px_3px_rgba(255,170,133,0.6)]',
          ];
          const colorClass = colors[i % colors.length];

          return (
            <div key={i} className="flex flex-col items-center">
              {/* Little socket */}
              <div className="w-1.5 h-1.5 bg-[#4A1226] rounded-t-sm" />
              {/* Glowing bulb */}
              <motion.div
                className={`w-3 h-4 rounded-full ${colorClass}`}
                animate={{
                  opacity: [0.65, 1, 0.55, 0.95],
                  scale: [0.95, 1.05, 0.92, 1],
                }}
                transition={{
                  duration: 2.2 + (i % 3) * 0.7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: (i * 0.18) % 1.5,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
