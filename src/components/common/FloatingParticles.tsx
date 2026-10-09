import { motion, useReducedMotion } from 'motion/react';
import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'sparkle' | 'heart' | 'star';
  opacity: number;
}

export function FloatingParticles({ count = 20 }: { count?: number }) {
  const shouldReduceMotion = useReducedMotion();

  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 10 + 12,
      delay: Math.random() * 5,
      type: i % 4 === 0 ? 'heart' : i % 3 === 0 ? 'star' : 'sparkle',
      opacity: Math.random() * 0.4 + 0.15,
    }));
  }, [count]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: ['0px', '-40px', '0px'],
            x: ['0px', `${(p.id % 2 === 0 ? 1 : -1) * 15}px`, '0px'],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        >
          {p.type === 'heart' ? (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="#F3A8C6"
              className="drop-shadow-[0_0_8px_rgba(243,168,198,0.5)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : p.type === 'star' ? (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="#E5C384"
              className="drop-shadow-[0_0_8px_rgba(229,195,132,0.6)]"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ) : (
            <div
              style={{ width: `${p.size * 0.6}px`, height: `${p.size * 0.6}px` }}
              className="rounded-full bg-[#FAF5EE] shadow-[0_0_10px_2px_rgba(229,195,132,0.8)]"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
