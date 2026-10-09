import { motion } from 'motion/react';

interface BalloonProps {
  colorIndex?: number;
  popped?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  interactive?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  numberLabel?: number;
}

const BALLOON_PALETTES = [
  { main: '#BE185D', highlight: '#F472B6', string: '#FBCFE8', shadow: '#831843' }, // Rose Pink
  { main: '#9F1239', highlight: '#FB7185', string: '#FFE4E6', shadow: '#4C0519' }, // Deep Burgundy
  { main: '#D97706', highlight: '#FDE68A', string: '#FEF3C7', shadow: '#78350F' }, // Champagne Gold
  { main: '#701A75', highlight: '#E879F9', string: '#F5D0FE', shadow: '#4A044E' }, // Plum Violet
  { main: '#E11D48', highlight: '#FDA4AF', string: '#FFE4E6', shadow: '#881337' }, // Ruby Red
  { main: '#CA8A04', highlight: '#FEF08A', string: '#FEF9C3', shadow: '#713F12' }, // Warm Honey
];

export function BalloonIllustration({
  colorIndex = 0,
  popped = false,
  onClick,
  interactive = true,
  className = '',
  size = 'md',
  numberLabel,
}: BalloonProps) {
  const palette = BALLOON_PALETTES[colorIndex % BALLOON_PALETTES.length];

  const sizeClasses = {
    sm: 'w-24 h-36',
    md: 'w-32 h-48',
    lg: 'w-44 h-64',
  }[size];

  if (popped) {
    return (
      <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-xs text-[#E5C384] font-medium"
        >
          ✨ Popped!
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={interactive ? { scale: 1.08, y: -8 } : undefined}
      whileTap={interactive ? { scale: 0.95 } : undefined}
      onClick={onClick}
      className={`relative select-none ${sizeClasses} ${className} ${
        interactive ? 'cursor-pointer' : ''
      }`}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`Balloon ${numberLabel ? numberLabel : ''} - Tap to pop`}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
    >
      <svg
        viewBox="0 0 120 180"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`balloon-grad-${colorIndex}`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color={palette.highlight} />
            <stop offset="45%" stop-color={palette.main} />
            <stop offset="100%" stop-color={palette.shadow} />
          </radialGradient>
        </defs>

        {/* Balloon Body */}
        <path
          d="M 60 10 
             C 95 10 115 45 115 80 
             C 115 115 90 135 60 135 
             C 30 135 5 115 5 80 
             C 5 45 25 10 60 10 Z"
          fill={`url(#balloon-grad-${colorIndex})`}
        />

        {/* Specular curved shine highlight */}
        <path
          d="M 30 25 C 20 40 18 65 24 85"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="36" cy="30" r="3" fill="rgba(255, 255, 255, 0.7)" />

        {/* Balloon Knot */}
        <polygon points="56,134 64,134 66,140 54,140" fill={palette.shadow} />

        {/* String */}
        <path
          d="M 60 140 Q 52 155 64 165 T 58 180"
          stroke={palette.string}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Optional inner number or question mark */}
        {numberLabel !== undefined && (
          <text
            x="60"
            y="85"
            textAnchor="middle"
            fill="#FAF5EE"
            fontSize="26"
            fontWeight="bold"
            fontFamily="serif"
            opacity="0.85"
          >
            {numberLabel}
          </text>
        )}
      </svg>
    </motion.div>
  );
}
