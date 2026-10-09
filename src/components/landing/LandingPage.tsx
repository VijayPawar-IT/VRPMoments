import { useState } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { CakeIllustration } from '../common/CakeIllustration';
import { BalloonIllustration } from '../common/BalloonIllustration';
import { FairyLights } from '../common/FairyLights';
import { FloatingParticles } from '../common/FloatingParticles';
import { Sparkles, Eye, Heart, Camera, Mail, Gift, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function LandingPage() {
  const { setRoute } = useBirthday();
  const [activeModal, setActiveModal] = useState<'privacy' | 'contact' | null>(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#18040B] via-[#2A0815] to-[#120207] text-[#FAF5EE] overflow-x-hidden">
      <FloatingParticles count={20} />

      {/* Decorative Top Fairy Lights */}
      <div className="w-full">
        <FairyLights count={14} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 pt-10 pb-16 sm:pt-16 sm:pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#E5C384] bg-[#2E0B1A] border border-[#E5C384]/30 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C384]" />
            <span>A PERSONALIZED DIGITAL GIFT</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FAF5EE] leading-tight">
            Make Their Birthday <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C384] via-[#FCE7F0] to-[#E5C384]">
              Unforgettable 🎂
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#FAF5EE]/80 max-w-xl mx-auto font-light leading-relaxed">
            Not just a birthday wish. <br />
            A little experience they&apos;ll remember.
          </p>

          {/* Dual CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setRoute('create')}
              className="w-full sm:w-auto min-h-[50px] px-8 py-3.5 flex items-center justify-center gap-2 rounded-2xl text-sm font-bold text-[#1E050D] bg-gradient-to-r from-[#E5C384] via-[#F3D59B] to-[#E5C384] hover:shadow-[0_0_25px_rgba(229,195,132,0.5)] transition-all active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-[#1E050D]" />
              <span>Create Their Birthday Moment ✨</span>
            </button>

            <button
              type="button"
              onClick={() => setRoute('preview')}
              className="w-full sm:w-auto min-h-[50px] px-6 py-3.5 flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold text-[#FAF5EE] bg-[#2A0916] border border-[#E5C384]/25 hover:bg-[#3E0E24] hover:border-[#E5C384]/50 transition-all active:scale-[0.98]"
            >
              <Eye className="w-4 h-4 text-[#E5C384]" />
              <span>Preview Experience</span>
            </button>
          </div>
        </motion.div>

        {/* Visual Mockup Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 relative max-w-3xl mx-auto"
        >
          {/* Glowing backdrop halo */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#881337]/30 via-[#E5C384]/20 to-[#881337]/30 rounded-3xl blur-2xl -z-10" />

          <div className="rounded-3xl bg-[#200713]/90 border border-[#E5C384]/30 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Feature 1: Cake */}
              <div className="flex flex-col items-center p-4 rounded-2xl bg-[#1B0610] border border-[#E5C384]/15">
                <CakeIllustration type="midnight-chocolate" isLit={true} size="sm" />
                <span className="font-serif text-sm font-bold text-[#FAF5EE] mt-2">
                  Interactive Cake
                </span>
                <span className="text-[11px] text-[#E5C384]">Light &amp; blow candles</span>
              </div>

              {/* Feature 2: Balloons */}
              <div className="flex flex-col items-center p-4 rounded-2xl bg-[#1B0610] border border-[#E5C384]/15">
                <div className="py-2">
                  <BalloonIllustration colorIndex={0} size="sm" interactive={false} />
                </div>
                <span className="font-serif text-sm font-bold text-[#FAF5EE] mt-2">
                  Secret Reason Balloons
                </span>
                <span className="text-[11px] text-[#E5C384]">Pop to reveal thoughts</span>
              </div>

              {/* Feature 3: Letter & Memories */}
              <div className="flex flex-col items-center p-4 rounded-2xl bg-[#1B0610] border border-[#E5C384]/15">
                <div className="w-16 h-16 rounded-2xl bg-[#FAF5EE] flex items-center justify-center text-[#881337] shadow-lg my-3">
                  <Mail className="w-8 h-8" />
                </div>
                <span className="font-serif text-sm font-bold text-[#FAF5EE] mt-2">
                  Sealed Birthday Letter
                </span>
                <span className="text-[11px] text-[#E5C384]">Words they&apos;ll read twice</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How it Works / Sections */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 py-16 border-t border-[#E5C384]/15">
        <div className="text-center max-w-md mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#E5C384] font-semibold">
            THE JOURNEY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EE] tracking-tight mt-1">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF5EE]/70 mt-1">
            Five simple steps to build an unforgettable digital keepsake.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'Personalize It',
              desc: 'Enter their name, your name, their milestone age, and birthday date.',
              icon: Heart,
            },
            {
              step: '02',
              title: 'Pick & Light Their Cake',
              desc: 'Choose from Midnight Chocolate, Strawberry Blush, or Vanilla Gold.',
              icon: Gift,
            },
            {
              step: '03',
              title: 'Fill Secret Balloons',
              desc: 'Write genuine reasons why they brighten the world. Each pops with confetti.',
              icon: Sparkles,
            },
            {
              step: '04',
              title: 'Hang Up Memories',
              desc: 'Add up to 5 photos with story captions hanging from fairy lights.',
              icon: Camera,
            },
            {
              step: '05',
              title: 'Write Your Letter',
              desc: 'Craft a thoughtful letter from the heart that unfolds like real parchment.',
              icon: Mail,
            },
            {
              step: '✨',
              title: 'Send Through One Link',
              desc: 'Share via WhatsApp or Web Share. No app install or login required.',
              icon: ArrowRight,
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-3xl bg-[#240816]/70 border border-[#E5C384]/20 backdrop-blur-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl font-bold text-[#E5C384]">
                  {item.step}
                </span>
                <div className="p-2 rounded-xl bg-[#E5C384]/15 text-[#E5C384]">
                  <item.icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#FAF5EE]">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF5EE]/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => setRoute('create')}
            className="min-h-[50px] px-8 py-3.5 inline-flex items-center gap-2 rounded-2xl text-sm font-bold text-[#1E050D] bg-gradient-to-r from-[#E5C384] via-[#F3D59B] to-[#E5C384] hover:shadow-[0_0_25px_rgba(229,195,132,0.5)] transition-all active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-[#1E050D]" />
            <span>Create Their Birthday Moment ✨</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#E5C384]/15 bg-[#14030A] py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#FAF5EE]">
              Vijay&apos;s Moments
            </h3>
            <p className="text-xs text-[#FAF5EE]/60 mt-1">
              Made with care, memories and a little bit of magic.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#FAF5EE]/75">
            <button
              onClick={() => setRoute('create')}
              className="hover:text-[#E5C384] transition-colors"
            >
              Create
            </button>
            <button
              onClick={() => setRoute('preview')}
              className="hover:text-[#E5C384] transition-colors"
            >
              Preview
            </button>
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-[#E5C384] transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => setActiveModal('contact')}
              className="hover:text-[#E5C384] transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#240816] border border-[#E5C384]/30 rounded-3xl p-6 max-w-md w-full text-left space-y-4">
            <h4 className="font-serif text-xl font-bold text-[#FAF5EE]">Privacy Policy</h4>
            <p className="text-xs text-[#FAF5EE]/80 leading-relaxed">
              Vijay&apos;s Moments is designed with privacy at its heart. Your personalized photos, messages, and names are stored strictly on your local browser (LocalStorage) and encoded directly into the shareable link. No external servers or analytics trackers store your private memories.
            </p>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full min-h-[44px] rounded-xl bg-[#E5C384] text-[#1E050D] text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#240816] border border-[#E5C384]/30 rounded-3xl p-6 max-w-md w-full text-left space-y-4">
            <h4 className="font-serif text-xl font-bold text-[#FAF5EE]">Contact &amp; Feedback</h4>
            <p className="text-xs text-[#FAF5EE]/80 leading-relaxed">
              Have questions, feedback, or custom celebration ideas for Vijay&apos;s Moments? We&apos;d love to hear how your special someone reacted to their surprise experience!
            </p>
            <div className="text-xs text-[#E5C384]">
              Email: <span className="text-[#FAF5EE]">vijaypawar845298@gmail.com</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full min-h-[44px] rounded-xl bg-[#E5C384] text-[#1E050D] text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
