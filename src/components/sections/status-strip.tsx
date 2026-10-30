"use client";

import { motion } from "framer-motion";

const items = [
  { label: "status", value: "operational", live: true },
  { label: "cloud", value: "Azure" },
  { label: "focus", value: "Terraform · observability" },
  { label: "iac", value: "100% coverage" },
];

export function StatusStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-[var(--muted-foreground)]"
    >
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          <span className="text-[var(--accent)]">{item.label}</span>
          <span>:</span>
          {item.live ? (
            <span className="inline-flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {item.value}
            </span>
          ) : (
            <span>{item.value}</span>
          )}
        </span>
      ))}
    </motion.div>
  );
}