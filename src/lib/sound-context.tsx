"use client";

import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore } from "react";

type SoundContextType = {
  enabled: boolean;
  toggle: () => void;
  play: (type: "click" | "hover" | "chime") => void;
};

const SoundContext = createContext<SoundContextType>({
  enabled: false,
  toggle: () => {},
  play: () => {},
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

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const savedPref = useSyncExternalStore(() => () => {}, readSoundPref, () => false);
  const [userEnabled, setUserEnabled] = useState<boolean | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const enabled = userEnabled ?? savedPref;

  useEffect(() => {
    try {
      localStorage.setItem("sound-enabled", String(enabled));
    } catch {}
  }, [enabled]);

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
      } catch {
        // Audio context unavailable
      }
    },
    [enabled, getCtx]
  );

  const toggle = useCallback(() => {
    const next = !(userEnabled ?? savedPref);
    setUserEnabled(next);
    if (next) {
      getCtx();
    }
  }, [userEnabled, savedPref, getCtx]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, play }}>
      {children}
    </SoundContext.Provider>
  );
}