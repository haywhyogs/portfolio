"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CliHeader } from "@/components/ui/cli-header";
import { stats } from "@/lib/skills";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section id="stats" className="py-24 px-6 bg-[var(--muted)]/30">
      <div className="max-w-6xl mx-auto">
        <CliHeader index="03" command="git diff --stat" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            The work, diffed
          </h2>
          <p className="mt-3 text-[var(--muted-foreground)]">
            Real numbers from real systems.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 text-center"
            >
              <CountUp target={stat.value} suffix={stat.suffix} />
              <div className="mt-2 text-xs font-mono text-[var(--muted-foreground)]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}