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

// Ambient focus music: pure sine pad with slow pentatonic chord changes.
// No LFO, no triangle waves, no rapid transients. Just sustained, consonant tones.
function startMusic(ctx: AudioContext): () => void {
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0, ctx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 4);
  masterGain.connect(ctx.destination);

  // Pentatonic chords (always consonant, never clash)
  const chords = [
    [130.81, 164.81, 196.0, 220.0],   // C E G A
    [146.83, 174.61, 220.0, 261.63],   // D F A C
    [164.81, 196.0, 246.94, 293.66],   // E G B D
    [110.0, 164.81, 220.0, 329.63],    // A E A E (open fifth)
  ];

  let activeOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
  let chordIndex = 0;

  function playChord(freqs: number[]) {
    const now = ctx.currentTime;

    // Fade out previous chord over 4 seconds
    activeOscs.forEach(({ osc, gain }) => {
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0, now + 4);
      setTimeout(() => { try { osc.stop(); } catch {} }, 4500);
    });

    // Fade in new chord over 4 seconds
    activeOscs = freqs.map((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 4);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      return { osc, gain };
    });
  }

  playChord(chords[0]);

  // Chord change every 12 seconds (very slow evolution)
  const chordInterval = setInterval(() => {
    chordIndex = (chordIndex + 1) % chords.length;
    playChord(chords[chordIndex]);
  }, 12000);

  // Sparse melodic notes (pentatonic, very gentle)
  const melodicNotes = [523.25, 587.33, 659.25, 783.99, 880.0];
  let noteIndex = 0;
  const noteInterval = setInterval(() => {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(melodicNotes[noteIndex % melodicNotes.length], now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.15);
      gain.gain.linearRampToValueAtTime(0, now + 2.5);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 2.5);
      noteIndex++;
    } catch {}
  }, 3000);

  return () => {
    try {
      masterGain.gain.cancelScheduledValues(ctx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      setTimeout(() => {
        activeOscs.forEach(({ osc }) => { try { osc.stop(); } catch {} });
        clearInterval(chordInterval);
        clearInterval(noteInterval);
        try { masterGain.disconnect(); } catch {}
      }, 1200);
    } catch {}
  };
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const savedPref = useSyncExternalStore(() => () => {}, readSoundPref, () => false);
  const [userEnabled, setUserEnabled] = useState<boolean | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const musicCleanupRef = useRef<(() => void) | null>(null);
  const musicPlayingRef = useRef(false);
  const userPausedRef = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const enabled = userEnabled ?? savedPref;

  useEffect(() => {
    musicPlayingRef.current = musicPlaying;
  }, [musicPlaying]);

  useEffect(() => {
    audioCtxRef.current = audioCtx;
  }, [audioCtx]);

  useEffect(() => {
    try { localStorage.setItem("sound-enabled", String(enabled)); } catch {}
  }, [enabled]);

  // Auto-start ambient music on first user interaction (satisfies autoplay policy)
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

      // Remove listeners after first interaction
      document.removeEventListener("pointerdown", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
      document.removeEventListener("scroll", startOnInteraction);
    };

    // Small delay to let the page settle, then listen for any user gesture
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

    if (!next) {
      userPausedRef.current = true;
    } else {
      userPausedRef.current = false;
      // Must create/resume context inside user gesture (click handler)
      const ctx = getCtx();
      ctx.resume().catch(() => {});
    }

    setMusicPlaying(next);
    try { localStorage.setItem("music-enabled", String(next)); } catch {}
  }, [musicPlaying, getCtx]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, play, musicOn: musicPlaying, toggleMusic }}>
      {children}
    </SoundContext.Provider>
  );
}