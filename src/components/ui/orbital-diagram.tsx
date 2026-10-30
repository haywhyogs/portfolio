"use client";

import { motion } from "framer-motion";

const rings = [
  {
    radius: 140,
    duration: 60,
    direction: 1,
    items: ["Azure", "Terraform", "Docker", "Python"],
  },
  {
    radius: 200,
    duration: 90,
    direction: -1,
    items: ["Prometheus", "Grafana", "Jaeger", "Loki", "OIDC", "CI/CD"],
  },
];

function RingItems({
  items,
  radius,
}: {
  items: string[];
  radius: number;
}) {
  return (
    <>
      {items.map((item, i) => {
        const angle = (i / items.length) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <span
            key={item}
            className="absolute left-1/2 top-1/2 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium whitespace-nowrap border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)]"
            style={{
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
            }}
          >
            {item}
          </span>
        );
      })}
    </>
  );
}

export function OrbitalDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] mx-auto"
    >
      {/* Ring 1 (inner) — rotates clockwise */}
      <div
        className="absolute inset-0"
        style={{
          animation: `spin 60s linear infinite`,
        }}
      >
        <div
          className="absolute inset-0 rounded-full border border-[var(--border)]"
          style={{
            left: "50%",
            top: "50%",
            width: rings[0].radius * 2,
            height: rings[0].radius * 2,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            animation: `spin 60s linear infinite reverse`,
          }}
        >
          <RingItems items={rings[0].items} radius={rings[0].radius} />
        </div>
      </div>

      {/* Ring 2 (outer) — rotates counter-clockwise */}
      <div
        className="absolute inset-0"
        style={{
          animation: `spin 90s linear infinite reverse`,
        }}
      >
        <div
          className="absolute inset-0 rounded-full border border-[var(--border)]"
          style={{
            left: "50%",
            top: "50%",
            width: rings[1].radius * 2,
            height: rings[1].radius * 2,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            animation: `spin 90s linear infinite`,
          }}
        >
          <RingItems items={rings[1].items} radius={rings[1].radius} />
        </div>
      </div>

      {/* Center avatar */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="size-20 sm:size-24 rounded-full bg-gradient-to-br from-[var(--accent)]/30 via-[var(--accent)]/10 to-[var(--accent)]/30 border border-[var(--accent)]/30 flex items-center justify-center">
          <span className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-[var(--accent)]">
            AO
          </span>
        </div>
      </div>
    </motion.div>
  );
}