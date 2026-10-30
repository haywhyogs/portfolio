"use client";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { SoundProvider } from "@/lib/sound-context";
import { Preloader } from "@/components/ui/preloader";
import { Cursor } from "@/components/ui/cursor";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SoundProvider>
        <Preloader />
        <Cursor />
        {children}
      </SoundProvider>
    </ThemeProvider>
  );
}