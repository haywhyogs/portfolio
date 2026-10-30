"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const rings = [
  {
    radius: 130,
    duration: 50,
    reverse: false,
    items: ["Azure", "Terraform", "Docker", "Python"],
  },
  {
    radius: 195,
    duration: 75,
    reverse: true,
    items: ["Prometheus", "Grafana", "Jaeger", "Loki", "OIDC", "CI/CD"],
  },
];

function RingItems({ items, radius }: { items: string[]; radius: number }) {
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

function OrbitingRing({
  radius,
  duration,
  reverse,
  items,
}: {
  radius: number;
  duration: number;
  reverse: boolean;
  items: string[];
}) {
  return (
    <>
      {/* Ring border */}
      <motion.div
        className="absolute left-1/2 top-1/2 rounded-full border border-[var(--border)]"
        style={{
          width: radius * 2,
          height: radius * 2,
          marginLeft: -radius,
          marginTop: -radius,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      {/* Orbiting items: rotate the container */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Counter-rotate labels so they stay upright */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: reverse ? 360 : -360 }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <RingItems items={items} radius={radius} />
        </motion.div>
      </motion.div>
    </>
  );
}

export function OrbitalDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] mx-auto"
    >
      <OrbitingRing {...rings[1]} />
      <OrbitingRing {...rings[0]} />

      {/* Center avatar with photo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="size-20 sm:size-28 rounded-full overflow-hidden border-2 border-[var(--azure)] shadow-[0_0_30px_rgba(47,140,255,0.3)]">
          <Image
            src="/images/profile.jpg"
            alt="Ayodeji Ogunsola"
            width={112}
            height={112}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}