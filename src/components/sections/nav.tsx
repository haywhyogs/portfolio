"use client";

import { Music, Pause, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useSound } from "@/lib/sound-context";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

function SoundToggle() {
  const { enabled, toggle, musicOn, toggleMusic } = useSound();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={toggleMusic}
        aria-label={musicOn ? "Pause music" : "Play music"}
        className="size-9 grid place-items-center rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-colors"
      >
        {musicOn ? <Pause className="size-4" /> : <Music className="size-4" />}
      </button>
      <button
        onClick={toggle}
        aria-label={enabled ? "Mute sound" : "Enable sound"}
        className="size-9 grid place-items-center rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-colors"
      >
        {enabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
      </button>
    </>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold tracking-tight text-[var(--foreground)] hover:text-[var(--azure)] transition-colors"
        >
          Ayodeji<span className="text-[var(--azure)]">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors rounded-md"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SoundToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}