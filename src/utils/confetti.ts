import confetti from 'canvas-confetti';

const BURGUNDY_PALETTE = ['#881337', '#9F1239', '#BE185D', '#E5C384', '#F7EAD0', '#FB7185', '#FFF1F2'];

export function triggerBurstConfetti() {
  confetti({
    particleCount: 70,
    spread: 60,
    origin: { y: 0.65 },
    colors: BURGUNDY_PALETTE,
    disableForReducedMotion: true,
  });
}

export function triggerPopConfetti(x: number, y: number) {
  confetti({
    particleCount: 35,
    spread: 45,
    origin: {
      x: Math.max(0.1, Math.min(0.9, x / window.innerWidth)),
      y: Math.max(0.1, Math.min(0.9, y / window.innerHeight)),
    },
    colors: BURGUNDY_PALETTE,
    scalar: 0.8,
    disableForReducedMotion: true,
  });
}

export function triggerGrandCelebration() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100, disableForReducedMotion: true };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Left cannon
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: BURGUNDY_PALETTE,
    });
    // Right cannon
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: BURGUNDY_PALETTE,
    });
  }, 250);
}
