import { useState, useEffect, useMemo } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ScreenCountdownProps {
  onNext: () => void;
}

export function ScreenCountdown({ onNext }: ScreenCountdownProps) {
  const { data } = useBirthday();

  // Target birthday calculation
  const targetTime = useMemo(() => {
    if (!data.birthday) return null;
    const parts = data.birthday.split('-');
    if (parts.length !== 3) return null;

    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const bdayDate = new Date(year, month, day, 0, 0, 0);

    // If past year, compare to upcoming celebration date
    const now = new Date();
    if (bdayDate.getTime() < now.getTime()) {
      // If today is the birthday
      if (
        now.getFullYear() === bdayDate.getFullYear() &&
        now.getMonth() === bdayDate.getMonth() &&
        now.getDate() === bdayDate.getDate()
      ) {
        return null; // Already birthday today!
      }
    }
    return bdayDate;
  }, [data.birthday]);

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    // If no birthday or already past, automatically proceed to reveal!
    if (!targetTime) {
      onNext();
      return;
    }

    const calculate = () => {
      const now = new Date().getTime();
      const diff = targetTime.getTime() - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        onNext();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [targetTime, onNext]);

  // If already birthday or no date, will auto proceed
  if (!targetTime || timeLeft.isPast) {
    return null;
  }

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-6"
      >
        <div className="inline-flex p-3 rounded-2xl bg-[#E5C384]/15 border border-[#E5C384]/30 text-[#E5C384]">
          <Clock className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-[#E5C384] font-semibold">
            NOT QUITE YET...
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EE] tracking-tight mt-1">
            {data.recipientName}&apos;s birthday magic unlocks in
          </h2>
        </div>

        {/* Countdown Flip Cards */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 py-2">
          {[
            { label: 'Days', val: timeLeft.days },
            { label: 'Hours', val: timeLeft.hours },
            { label: 'Minutes', val: timeLeft.minutes },
            { label: 'Seconds', val: timeLeft.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[#240816]/90 border border-[#E5C384]/25 p-3 rounded-2xl shadow-lg flex flex-col items-center"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#E5C384] tabular-nums">
                {String(item.val).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-[#FAF5EE]/60 uppercase tracking-wider mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#FAF5EE]/60 italic">
          The stars are aligning for your celebration.
        </p>

        {/* Peek now escape hatch */}
        <div className="pt-4">
          <button
            type="button"
            onClick={onNext}
            className="min-h-[44px] px-6 py-2.5 inline-flex items-center gap-2 rounded-xl text-xs font-semibold text-[#FAF5EE] bg-[#2E0B1A] border border-[#E5C384]/30 hover:bg-[#3E0E24] hover:border-[#E5C384]/60 transition-all active:scale-[0.98]"
          >
            <span>Peek now</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E5C384]" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
