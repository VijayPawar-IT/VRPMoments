import { useBirthday } from '../../context/BirthdayContext';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export function TopNavigation() {
  const { route, setRoute, isAudioPlaying, toggleAudio } = useBirthday();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#1B0610]/80 border-b border-[#E5C384]/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <button
          onClick={() => setRoute('landing')}
          className="text-left font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FAF5EE] hover:text-[#E5C384] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C384]"
        >
          Vijay&apos;s Moments
        </button>

        {/* Zone 2: Clean nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#FAF5EE]/80" aria-label="Main Navigation">
          <button
            onClick={() => setRoute('landing')}
            className={`transition-colors hover:text-[#FAF5EE] ${
              route === 'landing' ? 'text-[#E5C384] font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setRoute('create')}
            className={`transition-colors hover:text-[#FAF5EE] ${
              route === 'create' ? 'text-[#E5C384] font-semibold' : ''
            }`}
          >
            Create
          </button>
          <button
            onClick={() => setRoute('preview')}
            className={`transition-colors hover:text-[#FAF5EE] ${
              route === 'preview' ? 'text-[#E5C384] font-semibold' : ''
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setRoute('view')}
            className={`transition-colors hover:text-[#FAF5EE] ${
              route === 'view' ? 'text-[#E5C384] font-semibold' : ''
            }`}
          >
            Surprise
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3">
          {/* Audio toggle button with clear 44px hit-box */}
          <button
            onClick={toggleAudio}
            aria-label={isAudioPlaying ? 'Mute background audio' : 'Play background audio'}
            className="min-h-[44px] min-w-[44px] px-3 py-1.5 flex items-center gap-2 rounded-xl text-xs font-medium text-[#FAF5EE] bg-[#2E0B1A] border border-[#E5C384]/20 hover:bg-[#3E0E24] hover:border-[#E5C384]/40 transition-colors focus-visible:ring-2 focus-visible:ring-[#E5C384]"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-[#E5C384] animate-pulse" />
                <span className="hidden sm:inline whitespace-nowrap">Sound On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#FAF5EE]/60" />
                <span className="hidden sm:inline whitespace-nowrap text-[#FAF5EE]/70">Sound Off</span>
              </>
            )}
          </button>

          {/* Primary Action */}
          {route !== 'create' && (
            <button
              onClick={() => setRoute('create')}
              className="min-h-[44px] px-4 py-2 flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1E050D] bg-gradient-to-r from-[#E5C384] to-[#F3D59B] rounded-xl hover:shadow-[0_0_15px_rgba(229,195,132,0.4)] transition-all active:scale-[0.98] whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#1E050D]" />
              <span>Create Magic</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
