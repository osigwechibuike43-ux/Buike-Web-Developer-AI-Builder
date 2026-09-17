import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playHoverSound: () => void;
  playClickSound: () => void;
  volume: number;
  setVolume: (v: number) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const STORAGE_KEY = 'buike_ui_sounds_enabled';
const VOLUME_KEY = 'buike_ui_sounds_volume';

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    }
    return false;
  });

  const [volume, setVolumeState] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const savedVol = localStorage.getItem(VOLUME_KEY);
      if (savedVol) {
        const parsed = parseFloat(savedVol);
        return isNaN(parsed) ? 0.2 : Math.min(Math.max(parsed, 0.05), 1);
      }
    }
    return 0.2;
  });

  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastHoverTimeRef = useRef<number>(0);
  const lastTargetRef = useRef<EventTarget | null>(null);

  // Lazy AudioContext initialization
  const getAudioContext = (): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  };

  const playHoverSound = () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Subtle organic blip
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.025);

      const peakGain = Math.max(0.01, volume * 0.12);
      gain.gain.setValueAtTime(peakGain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // Ignore audio synthesis errors on locked autoplay
    }
  };

  const playClickSound = () => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

      const peakGain = Math.max(0.02, volume * 0.22);
      gain.gain.setValueAtTime(peakGain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Ignore audio synthesis errors
    }
  };

  const playChime = (enabled: boolean) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      if (enabled) {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(660, now + 0.06);
        osc.frequency.setValueAtTime(880, now + 0.12);
      } else {
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.setValueAtTime(440, now + 0.07);
      }

      const peakGain = Math.max(0.02, volume * 0.18);
      gain.gain.setValueAtTime(peakGain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (enabled ? 0.22 : 0.16));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + (enabled ? 0.22 : 0.16));
    } catch {
      // Ignore
    }
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, String(nextState));
    }
    // Play confirmation tone
    setTimeout(() => {
      playChime(nextState);
    }, 10);
  };

  const setVolume = (v: number) => {
    const clamped = Math.min(Math.max(v, 0.05), 1);
    setVolumeState(clamped);
    if (typeof window !== 'undefined') {
      localStorage.setItem(VOLUME_KEY, String(clamped));
    }
  };

  // Global mouseover listener for interactive elements
  useEffect(() => {
    if (!soundEnabled) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || target === lastTargetRef.current) return;

      const interactive = target.closest('button, a, input, select, textarea, [role="button"], [data-interactive="true"], summary');
      if (!interactive) return;

      const now = Date.now();
      // Throttle to avoid audio clutter
      if (now - lastHoverTimeRef.current < 45) return;

      lastHoverTimeRef.current = now;
      lastTargetRef.current = target;
      playHoverSound();
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('button, a, [role="button"]');
      if (interactive) {
        playClickSound();
      }
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, [soundEnabled, volume]);

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playHoverSound,
        playClickSound,
        volume,
        setVolume,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}
