import { motion } from 'motion/react';
import { CakeType } from '../../types/birthday';

interface CakeProps {
  type: CakeType;
  isLit?: boolean;
  onBlow?: () => void;
  interactive?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CakeIllustration({
  type,
  isLit = true,
  onBlow,
  interactive = false,
  className = '',
  size = 'md',
}: CakeProps) {
  const sizeMap = {
    sm: 'w-44 h-44',
    md: 'w-64 h-64',
    lg: 'w-80 h-80 sm:w-96 sm:h-96',
  };

  // Color schemes for original cake designs
  const styles = {
    'midnight-chocolate': {
      plate: '#2C0B1B',
      plateRim: '#E5C384',
      bottomLayer: '#230815',
      topLayer: '#340C1F',
      frosting: '#17040D',
      drip: '#4A122B',
      accents: '#E5C384',
      candleColor: '#E5C384',
      candleStripe: '#881337',
    },
    'strawberry-blush': {
      plate: '#3A0D20',
      plateRim: '#F3A8C6',
      bottomLayer: '#831843',
      topLayer: '#9D174D',
      frosting: '#FCE7F0',
      drip: '#F472B6',
      accents: '#BE185D',
      candleColor: '#FCE7F0',
      candleStripe: '#BE185D',
    },
    'vanilla-gold': {
      plate: '#300E1C',
      plateRim: '#E5C384',
      bottomLayer: '#78350F',
      topLayer: '#B45309',
      frosting: '#FEF3C7',
      drip: '#FDE68A',
      accents: '#D97706',
      candleColor: '#FAF5EE',
      candleStripe: '#D97706',
    },
  }[type];

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${sizeMap[size]} ${className} ${
        interactive ? 'cursor-pointer group' : ''
      }`}
      onClick={interactive && isLit ? onBlow : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && isLit && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onBlow?.();
        }
      }}
      aria-label={interactive ? (isLit ? 'Tap to blow out candles' : 'Candles blown out') : type}
    >
      <svg
        viewBox="0 0 300 280"
        className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glow behind cake */}
        <ellipse
          cx="150"
          cy="235"
          rx="135"
          ry="30"
          fill={isLit ? 'rgba(229, 195, 132, 0.25)' : 'rgba(0,0,0,0.3)'}
          className="transition-all duration-700"
        />

        {/* Cake Stand / Plate */}
        <ellipse cx="150" cy="245" rx="125" ry="18" fill={styles.plate} stroke={styles.plateRim} strokeWidth="2.5" />
        <ellipse cx="150" cy="243" rx="112" ry="14" fill="#13030A" opacity="0.6" />

        {/* Bottom Cake Layer */}
        <path
          d="M 55 190 Q 150 215 245 190 L 245 235 Q 150 260 55 235 Z"
          fill={styles.bottomLayer}
        />
        {/* Layer division cream piping */}
        <path
          d="M 55 190 Q 150 215 245 190"
          stroke={styles.frosting}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="4 6"
        />

        {/* Top Cake Layer */}
        <path
          d="M 75 130 Q 150 152 225 130 L 225 185 Q 150 210 75 185 Z"
          fill={styles.topLayer}
        />

        {/* Frosting drips down the top layer */}
        <path
          d="M 75 130 
             Q 85 155 95 140 
             Q 110 168 120 138 
             Q 135 162 150 142 
             Q 165 172 180 140 
             Q 195 165 210 142 
             Q 218 152 225 130
             L 225 130 Q 150 110 75 130 Z"
          fill={styles.drip}
          opacity="0.95"
        />

        {/* Cake Top Surface */}
        <ellipse cx="150" cy="130" rx="75" ry="20" fill={styles.frosting} />

        {/* Decorative frosting rosettes / pearls on top */}
        <g fill={styles.accents}>
          <circle cx="85" cy="130" r="4.5" />
          <circle cx="102" cy="138" r="4.5" />
          <circle cx="125" cy="144" r="4.5" />
          <circle cx="150" cy="146" r="5" />
          <circle cx="175" cy="144" r="4.5" />
          <circle cx="198" cy="138" r="4.5" />
          <circle cx="215" cy="130" r="4.5" />
          <circle cx="100" cy="122" r="3.5" />
          <circle cx="130" cy="120" r="3.5" />
          <circle cx="170" cy="120" r="3.5" />
          <circle cx="200" cy="122" r="3.5" />
        </g>

        {/* CANDLES */}
        {/* Center Candle */}
        <g transform="translate(145, 65)">
          <rect x="0" y="20" width="10" height="48" rx="3" fill={styles.candleColor} />
          {/* Candle Stripes */}
          <line x1="1" y1="28" x2="9" y2="24" stroke={styles.candleStripe} strokeWidth="2.5" />
          <line x1="1" y1="42" x2="9" y2="38" stroke={styles.candleStripe} strokeWidth="2.5" />
          <line x1="1" y1="56" x2="9" y2="52" stroke={styles.candleStripe} strokeWidth="2.5" />
          {/* Wick */}
          <line x1="5" y1="20" x2="5" y2="12" stroke="#2B0A16" strokeWidth="2" strokeLinecap="round" />

          {/* Flame or Smoke */}
          {isLit ? (
            <g className="animate-pulse">
              {/* Outer Golden Glow */}
              <circle cx="5" cy="4" r="16" fill="rgba(255, 215, 0, 0.35)" />
              {/* Main Flame */}
              <path
                d="M 5 -6 C 1 2, 0 8, 5 11 C 10 8, 9 2, 5 -6 Z"
                fill="#FFB703"
              />
              {/* Inner White-Hot Core */}
              <path
                d="M 5 -2 C 3 3, 2 7, 5 9 C 8 7, 7 3, 5 -2 Z"
                fill="#FFFDF0"
              />
            </g>
          ) : (
            /* Smoke animation when blown out */
            <g className="opacity-80">
              <path
                d="M 5 10 Q 1 0 7 -8 T 2 -18"
                stroke="rgba(250, 245, 238, 0.6)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}
        </g>

        {/* Left Candle */}
        <g transform="translate(115, 75)">
          <rect x="0" y="20" width="8" height="42" rx="2" fill={styles.candleColor} />
          <line x1="1" y1="28" x2="7" y2="25" stroke={styles.candleStripe} strokeWidth="2" />
          <line x1="1" y1="44" x2="7" y2="41" stroke={styles.candleStripe} strokeWidth="2" />
          <line x1="4" y1="20" x2="4" y2="14" stroke="#2B0A16" strokeWidth="1.5" strokeLinecap="round" />
          {isLit ? (
            <g className="animate-pulse" style={{ animationDelay: '0.2s' }}>
              <circle cx="4" cy="5" r="12" fill="rgba(255, 215, 0, 0.28)" />
              <path d="M 4 -3 C 0 3, 0 8, 4 10 C 8 8, 8 3, 4 -3 Z" fill="#FB8500" />
              <path d="M 4 0 C 2 4, 2 7, 4 8 C 6 7, 6 4, 4 0 Z" fill="#FFFDF0" />
            </g>
          ) : (
            <path
              d="M 4 12 Q 8 2 3 -5"
              stroke="rgba(250, 245, 238, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </g>

        {/* Right Candle */}
        <g transform="translate(178, 75)">
          <rect x="0" y="20" width="8" height="42" rx="2" fill={styles.candleColor} />
          <line x1="1" y1="28" x2="7" y2="25" stroke={styles.candleStripe} strokeWidth="2" />
          <line x1="1" y1="44" x2="7" y2="41" stroke={styles.candleStripe} strokeWidth="2" />
          <line x1="4" y1="20" x2="4" y2="14" stroke="#2B0A16" strokeWidth="1.5" strokeLinecap="round" />
          {isLit ? (
            <g className="animate-pulse" style={{ animationDelay: '0.4s' }}>
              <circle cx="4" cy="5" r="12" fill="rgba(255, 215, 0, 0.28)" />
              <path d="M 4 -3 C 0 3, 0 8, 4 10 C 8 8, 8 3, 4 -3 Z" fill="#FB8500" />
              <path d="M 4 0 C 2 4, 2 7, 4 8 C 6 7, 6 4, 4 0 Z" fill="#FFFDF0" />
            </g>
          ) : (
            <path
              d="M 4 12 Q 0 2 6 -6"
              stroke="rgba(250, 245, 238, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </g>
      </svg>
    </div>
  );
}
