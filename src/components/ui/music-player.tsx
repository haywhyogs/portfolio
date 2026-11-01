"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Music, Pause } from "lucide-react";
import { useSound } from "@/lib/sound-context";
import { tracks } from "@/lib/music-tracks";

export function MusicPlayer() {
  const { musicOn, toggleMusic, trackId, setTrack } = useSound();

  return (
    <AnimatePresence>
      {musicOn && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40"
        >
          <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-md px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            <button
              onClick={toggleMusic}
              aria-label="Pause music"
              className="size-8 grid place-items-center rounded-full text-[var(--azure)] hover:bg-[var(--muted)] transition-colors"
            >
              <Pause className="size-3.5" />
            </button>

            <div className="flex items-center gap-0.5 px-1">
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => setTrack(track.id)}
                  aria-label={`Switch to ${track.name} track`}
                  title={track.description}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                    trackId === track.id
                      ? "bg-[var(--azure)]/15 text-[var(--azure)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {track.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 pl-1 ml-1 border-l border-[var(--border)]">
              <Music className="size-3 text-[var(--muted-foreground)]" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}