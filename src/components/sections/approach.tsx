"use client";

import { motion } from "framer-motion";
import { ShieldAlert, BookOpen, Rocket } from "lucide-react";

const values = [
  {
    icon: Rocket,
    title: "Ship Real Systems",
    body:
      "Production realism over tutorial-perfect demos. Real Azure, real costs, real incident response. If it doesn't survive a deliberate failure test, it isn't done.",
  },
  {
    icon: ShieldAlert,
    title: "Security by Default",
    body:
      "OIDC instead of stored secrets. Managed Identity instead of API keys. Least privilege RBAC scoped to each component's needs. I'd want it that way in prod, so I build it that way from day one.",
  },
  {
    icon: BookOpen,
    title: "Learn in Public",
    body:
      "Every incident gets a postmortem. Every mistake gets documented. Every improvement ships with the reasoning behind it. Failures teach more than clean demos ever will.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium text-[var(--accent)] mb-2">
            How I work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Three principles that shape every system I build
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--accent)] transition-colors"
            >
              <div className="size-10 grid place-items-center rounded-md bg-[var(--accent)]/10 text-[var(--accent)] mb-4">
                <v.icon className="size-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}