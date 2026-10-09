import React, { useState } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { Sparkles, Calendar, User, Heart } from 'lucide-react';

export function StepDetails() {
  const { data, updateData, nextStep } = useBirthday();
  const [errors, setErrors] = useState<{ recipientName?: string; senderName?: string }>({});

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { recipientName?: string; senderName?: string } = {};

    if (!data.recipientName.trim()) {
      newErrors.recipientName = "Please enter the birthday star's name";
    }
    if (!data.senderName.trim()) {
      newErrors.senderName = 'Please enter your name';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    nextStep();
  };

  return (
    <form onSubmit={handleContinue} className="space-y-6">
      <div className="text-center max-w-md mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5EE] tracking-tight">
          Who&apos;s the birthday star? 🎂
        </h2>
        <p className="text-sm text-[#FAF5EE]/75 mt-2">
          Let&apos;s make this feel like it was made only for them.
        </p>
      </div>

      <div className="space-y-5 max-w-lg mx-auto bg-[#240816]/70 p-6 sm:p-8 rounded-3xl border border-[#E5C384]/20 shadow-xl backdrop-blur-sm">
        {/* Recipient Name */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-[#E5C384] uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5" />
            <span>Their Name (Required)</span>
          </label>
          <input
            type="text"
            required
            value={data.recipientName}
            onChange={(e) => {
              updateData({ recipientName: e.target.value });
              if (errors.recipientName) setErrors((prev) => ({ ...prev, recipientName: undefined }));
            }}
            placeholder="e.g. Ananya"
            className="w-full px-4 py-3 rounded-xl bg-[#1B0610] text-[#FAF5EE] border border-[#E5C384]/25 focus:outline-none focus:border-[#E5C384] focus:ring-2 focus:ring-[#E5C384]/30 text-base placeholder:text-[#FAF5EE]/30 transition-all"
          />
          {errors.recipientName && (
            <p className="text-xs text-rose-400 mt-1.5">{errors.recipientName}</p>
          )}
        </div>

        {/* Sender Name */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-[#E5C384] uppercase tracking-wider mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Your Name (Required)</span>
          </label>
          <input
            type="text"
            required
            value={data.senderName}
            onChange={(e) => {
              updateData({ senderName: e.target.value });
              if (errors.senderName) setErrors((prev) => ({ ...prev, senderName: undefined }));
            }}
            placeholder="e.g. Vijay"
            className="w-full px-4 py-3 rounded-xl bg-[#1B0610] text-[#FAF5EE] border border-[#E5C384]/25 focus:outline-none focus:border-[#E5C384] focus:ring-2 focus:ring-[#E5C384]/30 text-base placeholder:text-[#FAF5EE]/30 transition-all"
          />
          {errors.senderName && (
            <p className="text-xs text-rose-400 mt-1.5">{errors.senderName}</p>
          )}
        </div>

        {/* Age (Optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#FAF5EE]/80 uppercase tracking-wider mb-2">
              Age (Optional)
            </label>
            <input
              type="text"
              value={data.age || ''}
              onChange={(e) => updateData({ age: e.target.value })}
              placeholder="e.g. 25"
              className="w-full px-4 py-3 rounded-xl bg-[#1B0610] text-[#FAF5EE] border border-[#E5C384]/20 focus:outline-none focus:border-[#E5C384] focus:ring-2 focus:ring-[#E5C384]/30 text-base placeholder:text-[#FAF5EE]/30 transition-all"
            />
          </div>

          {/* Birthday Date (Optional) */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#FAF5EE]/80 uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5 text-[#E5C384]" />
              <span>Birthday (Optional)</span>
            </label>
            <input
              type="date"
              value={data.birthday || ''}
              onChange={(e) => updateData({ birthday: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#1B0610] text-[#FAF5EE] border border-[#E5C384]/20 focus:outline-none focus:border-[#E5C384] focus:ring-2 focus:ring-[#E5C384]/30 text-sm placeholder:text-[#FAF5EE]/30 transition-all"
            />
          </div>
        </div>

        <p className="text-[11px] text-[#FAF5EE]/60 italic text-center">
          Adding their birthday date activates an automatic midnight countdown if they open it before the big day!
        </p>

        {/* CTA Button */}
        <button
          type="submit"
          className="w-full min-h-[48px] mt-4 flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold text-[#1E050D] bg-gradient-to-r from-[#E5C384] via-[#F3D59B] to-[#E5C384] hover:shadow-[0_0_20px_rgba(229,195,132,0.4)] transition-all active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4 text-[#1E050D]" />
          <span>Let&apos;s Begin ✨</span>
        </button>
      </div>
    </form>
  );
}
