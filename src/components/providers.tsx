"use client";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { SoundProvider } from "@/lib/sound-context";
import { Preloader } from "@/components/ui/preloader";
import { Cursor } from "@/components/ui/cursor";
import { MusicPlayer } from "@/components/ui/music-player";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SoundProvider>
        <Preloader />
        <Cursor />
        <MusicPlayer />
        {children}
      </SoundProvider>
    </ThemeProvider>
  );
}