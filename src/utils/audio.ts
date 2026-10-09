/**
 * Audio Engine for Vijay's Moments
 * Supports optional /audio/birthday.mp3 or synthesizes a warm music-box ambient melody.
 * Synthesizes crisp, responsive micro sound-effects (pop, blow, chime, sparkle, rustle).
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private bgAudioEl: HTMLAudioElement | null = null;
  private isMuted: boolean = true;
  private isMelodyPlaying: boolean = false;
  private synthInterval: number | null = null;
  private currentMelodyNote: number = 0;
  private musicBoxGain: GainNode | null = null;

  // Pentatonic notes based on soft happy birthday motif (frequencies in Hz)
  private readonly notes = [
    261.63, 261.63, 293.66, 261.63, 349.23, 329.63, // C4 C4 D4 C4 F4 E4
    261.63, 261.63, 293.66, 261.63, 392.00, 349.23, // C4 C4 D4 C4 G4 F4
    261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66, // C4 C4 C5 A4 F4 E4 D4
    466.16, 466.16, 440.00, 349.23, 392.00, 349.23  // Bb4 Bb4 A4 F4 G4 F4
  ];

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.pauseBackgroundMusic();
    } else {
      this.startBackgroundMusic();
    }
    return !this.isMuted;
  }

  public getIsPlaying(): boolean {
    return !this.isMuted;
  }

  public startBackgroundMusic() {
    this.isMuted = false;
    this.initContext();

    // Try HTMLAudioElement for /audio/birthday.mp3
    if (!this.bgAudioEl && typeof window !== 'undefined') {
      this.bgAudioEl = new Audio('/audio/birthday.mp3');
      this.bgAudioEl.loop = true;
      this.bgAudioEl.volume = 0.35;
    }

    if (this.bgAudioEl) {
      const playPromise = this.bgAudioEl.play();
      if (playPromise) {
        playPromise
          .then(() => {
            // MP3 is playing successfully
            this.stopSynthesizedMelody();
          })
          .catch(() => {
            // Audio file missing or blocked -> fallback to synthesized music box
            this.startSynthesizedMelody();
          });
      } else {
        this.startSynthesizedMelody();
      }
    } else {
      this.startSynthesizedMelody();
    }
  }

  public pauseBackgroundMusic() {
    this.isMuted = true;
    if (this.bgAudioEl) {
      this.bgAudioEl.pause();
    }
    this.stopSynthesizedMelody();
  }

  private startSynthesizedMelody() {
    if (this.isMelodyPlaying) return;
    const ctx = this.initContext();
    if (!ctx) return;

    this.isMelodyPlaying = true;
    this.currentMelodyNote = 0;

    // Main gain for music box
    this.musicBoxGain = ctx.createGain();
    this.musicBoxGain.gain.setValueAtTime(0.08, ctx.currentTime);
    this.musicBoxGain.connect(ctx.destination);

    // Play next note with chime timbre every 520ms
    this.synthInterval = window.setInterval(() => {
      if (this.isMuted) return;
      const freq = this.notes[this.currentMelodyNote % this.notes.length];
      this.playChimeNote(freq);
      this.currentMelodyNote++;
    }, 540);
  }

  private stopSynthesizedMelody() {
    this.isMelodyPlaying = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  private playChimeNote(freq: number) {
    if (this.isMuted || !this.ctx || !this.musicBoxGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc2.type = 'triangle';

      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc2.frequency.setValueAtTime(freq * 2, this.ctx.currentTime); // delicate overtone

      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.12, now + 0.03);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

      osc.connect(noteGain);
      osc2.connect(noteGain);
      noteGain.connect(this.musicBoxGain);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 0.95);
      osc2.stop(now + 0.95);
    } catch {
      // Audio context might be closing
    }
  }

  // --- Sound Effects ---

  public playPop() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // High-to-low pitch drop oscillator for snappy balloon pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      // Noise burst for air snap
      const bufferSize = ctx.sampleRate * 0.06;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);
      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
      noise.start(now);
    } catch {
      // safe fallback
    }
  }

  public playBlow() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Gentle filtered white noise simulating blowing air
      const duration = 0.7;
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.linearRampToValueAtTime(700, now + 0.3);
      filter.frequency.linearRampToValueAtTime(200, now + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // safe fallback
    }
  }

  public playChime() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.001, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.85);
      });
    } catch {
      // safe fallback
    }
  }

  public playSparkle() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [1046.50, 1318.51, 1567.98, 2093.00, 2637.02]; // C6, E6, G6, C7, E7
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.001, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.05 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.55);
      });
    } catch {
      // safe fallback
    }
  }

  public playRustle() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const duration = 0.35;
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(1.5, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // safe fallback
    }
  }

  public playCelebration() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Arpeggiated celebratory fanfare
      const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.001, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.15, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 1.3);
      });
    } catch {
      // safe fallback
    }
  }
}

export const audio = new AudioEngine();
