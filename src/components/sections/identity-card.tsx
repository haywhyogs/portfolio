"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const rows = [
  { key: "uid", value: "ayodeji" },
  { key: "role", value: "cloud engineer" },
  { key: "base", value: "6.5244° N · 3.3792° E" },
  { key: "focus", value: "Azure · IaC · observability" },
  { key: "status", value: "● available", accent: true },
];

export function IdentityCard() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-xs rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)] bg-[var(--muted)]">
        <span className="text-xs font-mono text-[var(--muted-foreground)]">
          identity.card
        </span>
        <span className="text-xs font-mono text-emerald-500">verified</span>
      </div>

      <div className="relative aspect-square overflow-hidden">
        <Image
          src="/images/profile.jpg"
          alt="Ayodeji Ogunsola"
          fill
          className="object-cover"
          sizes="320px"
        />
        <div className="scan-line" />
      </div>

      <div className="p-4 space-y-2.5">
        {rows.map((row) => (
          <div key={row.key} className="flex items-center justify-between">
            <span className="text-xs font-mono text-[var(--muted-foreground)]">
              {row.key}
            </span>
            <span
              className={`text-xs font-mono ${
                row.accent ? "text-emerald-500" : "text-[var(--foreground)]"
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </motion.aside>
  );
}