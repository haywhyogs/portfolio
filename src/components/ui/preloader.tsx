"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useSound } from "@/lib/sound-context";

const steps = [
  { cmd: "npm run build", result: "✓ compiled" },
  { cmd: "terraform plan", result: "✓ 12 resources" },
  { cmd: "docker build", result: "✓ image tagged" },
  { cmd: "deploy to azure", result: "✓ live" },
];

const readPlayed = (): boolean => {
  try {
    return sessionStorage.getItem("preloader-played") === "1";
  } catch {
    return false;
  }
};

export function Preloader() {
  const alreadyPlayed = useSyncExternalStore(() => () => {}, readPlayed, () => true);
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [finished, setFinished] = useState(false);
  const { play } = useSound();

  const visible = !alreadyPlayed && !finished;

  useEffect(() => {
    if (!visible) return;
    if (stepIndex >= steps.length) {
      const t = setTimeout(() => {
        play("chime");
        setDone(true);
        setTimeout(() => {
          setFinished(true);
          sessionStorage.setItem("preloader-played", "1");
        }, 500);
      }, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setStepIndex((i) => i + 1);
      play("click");
    }, 500);
    return () => clearTimeout(t);
  }, [visible, stepIndex, play]);

  const skip = () => {
    setFinished(true);
    sessionStorage.setItem("preloader-played", "1");
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[10000] bg-[var(--background)] flex items-center justify-center"
      >
        <div className="w-full max-w-md px-8">
          <div className="space-y-3">
            {steps.slice(0, stepIndex).map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between font-mono text-sm"
              >
                <span className="text-[var(--muted-foreground)]">
                  <span className="text-[var(--accent)]">$</span> {step.cmd}
                </span>
                <span className="text-emerald-500">{step.result}</span>
              </motion.div>
            ))}
            {stepIndex < steps.length && (
              <div className="font-mono text-sm">
                <span className="text-[var(--accent)]">$</span>{" "}
                <span className="animate-pulse">▊</span>
              </div>
            )}
          </div>

          {done && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <span className="text-sm font-mono text-[var(--accent)]">
                deployed · ayodeji-cloud.netlify.app
              </span>
            </motion.div>
          )}
        </div>

        <button
          onClick={skip}
          className="absolute bottom-8 right-8 text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          skip →
        </button>
      </motion.div>
    </AnimatePresence>
  );
}