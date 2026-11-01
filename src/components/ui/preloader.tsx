"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useSound } from "@/lib/sound-context";

const stages = [
  { id: "build", label: "Build", detail: "npm run build", result: "compiled in 6.4s" },
  { id: "plan", label: "Infrastructure", detail: "terraform plan", result: "12 to create" },
  { id: "container", label: "Containerize", detail: "docker build", result: "image tagged" },
  { id: "deploy", label: "Deploy", detail: "push to Azure", result: "3 services live" },
  { id: "verify", label: "Verify", detail: "health check", result: "all green" },
];

export function Preloader() {
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [finished, setFinished] = useState(false);
  const { play } = useSound();

  const visible = mounted && !finished;
  const progress = Math.min((activeIndex / stages.length) * 100, 100);

  useEffect(() => {
    if (!visible) return;
    if (activeIndex >= stages.length) {
      const t = setTimeout(() => {
        play("chime");
        setDone(true);
        setTimeout(() => {
          setFinished(true);
        }, 600);
      }, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setActiveIndex((i) => i + 1);
      play("click");
    }, 600);
    return () => clearTimeout(t);
  }, [visible, activeIndex, play]);

  const skip = () => {
    setFinished(true);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[10000] flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 10% 15%, rgba(47,140,255,0.18), transparent 45%), radial-gradient(circle at 80% 40%, rgba(45,212,191,0.12), transparent 45%), #050b14",
        }}
      >
        <div className="w-full max-w-md px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--azure)]">
                Deploying
              </span>
              <span className="text-xs font-mono text-[var(--muted-foreground)]">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="pipeline-bar">
              <motion.div
                className="pipeline-bar-fill"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Pipeline stages */}
          <div className="space-y-0">
            {stages.map((stage, i) => {
              const isDone = i < activeIndex;
              const isActive = i === activeIndex && !done;
              const isPending = i > activeIndex;

              return (
                <div key={stage.id} className="pipeline-stage">
                  <div className="flex flex-col items-center">
                    <div
                      className={`pipeline-dot ${
                        isDone ? "done" : isActive ? "active" : ""
                      }`}
                    />
                    {i < stages.length - 1 && (
                      <div
                        className={`pipeline-connector ${
                          i < activeIndex ? "done" : ""
                        }`}
                      />
                    )}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: isPending ? 0.3 : 1,
                      x: 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex items-center justify-between min-w-0"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-[var(--foreground)]">
                        {stage.label}
                      </div>
                      <div className="text-xs font-mono text-[var(--muted-foreground)] truncate">
                        <span className="text-[var(--azure)]">$</span>{" "}
                        {stage.detail}
                      </div>
                    </div>
                    {isDone && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-xs font-mono text-[var(--lime)] shrink-0 ml-4"
                      >
                        ✓ {stage.result}
                      </motion.span>
                    )}
                    {isActive && (
                      <span className="text-xs font-mono text-[var(--azure)] animate-pulse shrink-0 ml-4">
                        running...
                      </span>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>

          {done && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <span className="text-sm font-mono text-[var(--lime)]">
                ● live · ayodeji-cloud.netlify.app
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