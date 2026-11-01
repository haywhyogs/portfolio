"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { startTrack, type TrackId } from "@/lib/music-tracks";

type SoundContextType = {
  enabled: boolean;
  toggle: () => void;
  play: (type: "click" | "hover" | "chime") => void;
  musicOn: boolean;
  toggleMusic: () => void;
  trackId: TrackId;
  setTrack: (id: TrackId) => void;
};

const SoundContext = createContext<SoundContextType>({
  enabled: false,
  toggle: () => {},
  play: () => {},
  musicOn: false,
  toggleMusic: () => {},
  trackId: "focus",
  setTrack: () => {},
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
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [trackId, setTrackId] = useState<TrackId>(() => {
    try {
      const v = localStorage.getItem("music-track");
      return v === "focus" || v === "adventure" || v === "ambient" ? v : "focus";
    } catch {
      return "focus";
    }
  });
  const musicCleanupRef = useRef<(() => void) | null>(null);
  const musicPlayingRef = useRef(false);
  const userPausedRef = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const enabled = userEnabled ?? savedPref;
  const currentTrack = trackId;

  useEffect(() => {
    musicPlayingRef.current = musicPlaying;
  }, [musicPlaying]);

  useEffect(() => {
    audioCtxRef.current = audioCtx;
  }, [audioCtx]);

  useEffect(() => {
    try { localStorage.setItem("sound-enabled", String(enabled)); } catch {}
  }, [enabled]);

  useEffect(() => {
    try { localStorage.setItem("music-track", trackId); } catch {}
  }, [trackId]);

  // Auto-start music on first user interaction
  useEffect(() => {
    const startOnInteraction = () => {
      if (userPausedRef.current || musicPlayingRef.current) return;
      try {
        let ctx = audioCtxRef.current;
        if (!ctx) {
          ctx = new AudioContext();
          audioCtxRef.current = ctx;
          setAudioCtx(ctx);
        }
        ctx.resume().then(() => {
          if (!userPausedRef.current && !musicPlayingRef.current) {
            setMusicPlaying(true);
          }
        }).catch(() => {});
      } catch {}
      document.removeEventListener("pointerdown", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
      document.removeEventListener("scroll", startOnInteraction);
    };
    const timer = setTimeout(() => {
      document.addEventListener("pointerdown", startOnInteraction);
      document.addEventListener("keydown", startOnInteraction);
      document.addEventListener("scroll", startOnInteraction, { passive: true });
    }, 500);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("pointerdown", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
      document.removeEventListener("scroll", startOnInteraction);
    };
  }, []);

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

  // Start/stop music based on musicPlaying and trackId
  useEffect(() => {
    if (!audioCtx) return;

    if (musicPlaying) {
      musicCleanupRef.current = startTrack(audioCtx, currentTrack);
    } else {
      musicCleanupRef.current?.();
      musicCleanupRef.current = null;
    }

    return () => {
      musicCleanupRef.current?.();
      musicCleanupRef.current = null;
    };
  }, [musicPlaying, audioCtx, currentTrack]);

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
    if (!next) {
      userPausedRef.current = true;
    } else {
      userPausedRef.current = false;
      const ctx = getCtx();
      ctx.resume().catch(() => {});
    }
    setMusicPlaying(next);
    try { localStorage.setItem("music-enabled", String(next)); } catch {}
  }, [musicPlaying, getCtx]);

  const setTrack = useCallback((id: TrackId) => {
    setTrackId(id);
    // If music is playing, the effect will restart with the new track
    if (!musicPlaying) {
      userPausedRef.current = false;
      const ctx = getCtx();
      ctx.resume().then(() => {
        setMusicPlaying(true);
      }).catch(() => {});
    }
  }, [musicPlaying, getCtx]);

  return (
    <SoundContext.Provider
      value={{
        enabled,
        toggle,
        play,
        musicOn: musicPlaying,
        toggleMusic,
        trackId: currentTrack,
        setTrack,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}