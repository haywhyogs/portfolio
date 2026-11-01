"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";

type SoundContextType = {
  enabled: boolean;
  toggle: () => void;
  play: (type: "click" | "hover" | "chime") => void;
  musicOn: boolean;
  toggleMusic: () => void;
};

const SoundContext = createContext<SoundContextType>({
  enabled: false,
  toggle: () => {},
  play: () => {},
  musicOn: false,
  toggleMusic: () => {},
});

export function useSound() {
  return useContext(SoundContext);
}

const readSoundPref = (): boolean => {
  try {
    return localStorage.getItem("sound-enabled") === "true";
  } catch {
    return false;
  }
};

// Ambient music: gentle arpeggiated pad using Web Audio API
function startMusic(ctx: AudioContext): () => void {
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0, ctx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 1.5);
  masterGain.connect(ctx.destination);

  // Pad chord (Cmaj7 ambient)
  const padFreqs = [130.81, 196.0, 246.94, 329.63];
  const padOscs: OscillatorNode[] = [];
  const lfoOscs: OscillatorNode[] = [];

  padFreqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = i % 2 === 0 ? "sine" : "triangle";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.22, ctx.currentTime);

    // Slow LFO for warmth
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.08 + i * 0.03, ctx.currentTime);
    lfoGain.gain.setValueAtTime(0.06, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    lfo.start();
    lfoOscs.push(lfo);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start();
    padOscs.push(osc);
  });

  // Arpeggiator
  const arpNotes = [523.25, 659.25, 783.99, 659.25];
  let arpIndex = 0;
  const arpInterval = setInterval(() => {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(arpNotes[arpIndex % arpNotes.length], now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.6);
      arpIndex++;
    } catch {}
  }, 700);

  return () => {
    try {
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      setTimeout(() => {
        padOscs.forEach((o) => { try { o.stop(); } catch {} });
        lfoOscs.forEach((o) => { try { o.stop(); } catch {} });
        clearInterval(arpInterval);
        try { masterGain.disconnect(); } catch {}
      }, 500);
    } catch {}
  };
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const savedPref = useSyncExternalStore(() => () => {}, readSoundPref, () => false);
  const [userEnabled, setUserEnabled] = useState<boolean | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const musicCleanupRef = useRef<(() => void) | null>(null);

  const enabled = userEnabled ?? savedPref;

  useEffect(() => {
    try { localStorage.setItem("sound-enabled", String(enabled)); } catch {}
  }, [enabled]);

  // Create or resume AudioContext (must be called from user gesture)
  const getCtx = useCallback((): AudioContext => {
    let ctx = audioCtx;
    if (!ctx) {
      ctx = new AudioContext();
      setAudioCtx(ctx);
    }
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }, [audioCtx]);

  // Start/stop music based on musicPlaying state
  useEffect(() => {
    if (!audioCtx) return;

    if (musicPlaying) {
      musicCleanupRef.current = startMusic(audioCtx);
    } else {
      musicCleanupRef.current?.();
      musicCleanupRef.current = null;
    }

    return () => {
      musicCleanupRef.current?.();
      musicCleanupRef.current = null;
    };
  }, [musicPlaying, audioCtx]);

  const play = useCallback(
    (type: "click" | "hover" | "chime") => {
      if (!enabled) return;
      try {
        const ctx = getCtx();
        const now = ctx.currentTime;

        if (type === "click") {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(800, now);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
        } else if (type === "hover") {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(1200, now);
          gain.gain.setValueAtTime(0.02, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
          osc.start(now);
          osc.stop(now + 0.02);
        } else if (type === "chime") {
          const notes = [523.25, 659.25, 783.99];
          notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(freq, now + i * 0.12);
            gain.gain.setValueAtTime(0.08, now + i * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.3);
            osc.start(now + i * 0.12);
            osc.stop(now + i * 0.12 + 0.3);
          });
        }
      } catch {}
    },
    [enabled, getCtx]
  );

  const toggle = useCallback(() => {
    const next = !enabled;
    setUserEnabled(next);
    if (next) getCtx();
  }, [enabled, getCtx]);

  const toggleMusic = useCallback(() => {
    const next = !musicPlaying;
    setMusicPlaying(next);

    if (next) {
      // Must create/resume context inside user gesture (click handler)
      const ctx = getCtx();
      ctx.resume().catch(() => {});
    }

    try { localStorage.setItem("music-enabled", String(next)); } catch {}
  }, [musicPlaying, getCtx]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, play, musicOn: musicPlaying, toggleMusic }}>
      {children}
    </SoundContext.Provider>
  );
}