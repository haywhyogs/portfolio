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

const readMusicPref = (): boolean => {
  try {
    return localStorage.getItem("music-enabled") === "true";
  } catch {
    return false;
  }
};

// Ambient music: gentle arpeggiated pad using Web Audio API
function startMusic(ctx: AudioContext): () => void {
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0, ctx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2);
  masterGain.connect(ctx.destination);

  // Pad chord (Cmaj7-ish ambient)
  const padFreqs = [130.81, 196.0, 246.94, 329.63];
  const padOscs: OscillatorNode[] = [];
  padFreqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = i % 2 === 0 ? "sine" : "triangle";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    // Slow LFO on each pad voice
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.1 + i * 0.05, ctx.currentTime);
    lfoGain.gain.setValueAtTime(0.05, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    lfo.start();
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
      gain.gain.linearRampToValueAtTime(0.06, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.8);
      arpIndex++;
    } catch {}
  }, 600);

  return () => {
    try {
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      setTimeout(() => {
        padOscs.forEach((o) => { try { o.stop(); } catch {} });
        clearInterval(arpInterval);
        try { masterGain.disconnect(); } catch {}
      }, 600);
    } catch {}
  };
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const savedPref = useSyncExternalStore(() => () => {}, readSoundPref, () => false);
  const savedMusic = useSyncExternalStore(() => () => {}, readMusicPref, () => false);
  const [userEnabled, setUserEnabled] = useState<boolean | null>(null);
  const [userMusic, setUserMusic] = useState<boolean | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const musicCleanupRef = useRef<(() => void) | null>(null);

  const enabled = userEnabled ?? savedPref;
  const musicOn = userMusic ?? savedMusic;

  useEffect(() => {
    try { localStorage.setItem("sound-enabled", String(enabled)); } catch {}
  }, [enabled]);

  useEffect(() => {
    try { localStorage.setItem("music-enabled", String(musicOn)); } catch {}
  }, [musicOn]);

  const getCtx = useCallback(() => {
    if (!audioCtx) {
      const ctx = new AudioContext();
      setAudioCtx(ctx);
      return ctx;
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }, [audioCtx]);

  // Start/stop music
  useEffect(() => {
    if (!audioCtx) return;
    if (musicOn) {
      musicCleanupRef.current = startMusic(audioCtx);
    } else {
      musicCleanupRef.current?.();
      musicCleanupRef.current = null;
    }
    return () => {
      musicCleanupRef.current?.();
      musicCleanupRef.current = null;
    };
  }, [musicOn, audioCtx]);

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
          gain.gain.setValueAtTime(0.05, now);
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
            gain.gain.setValueAtTime(0.06, now + i * 0.12);
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
    const next = !(userEnabled ?? savedPref);
    setUserEnabled(next);
    if (next) getCtx();
  }, [userEnabled, savedPref, getCtx]);

  const toggleMusic = useCallback(() => {
    const next = !(userMusic ?? savedMusic);
    setUserMusic(next);
    if (next) getCtx();
  }, [userMusic, savedMusic, getCtx]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, play, musicOn, toggleMusic }}>
      {children}
    </SoundContext.Provider>
  );
}