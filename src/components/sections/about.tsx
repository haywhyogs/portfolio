"use client";

import { motion } from "framer-motion";
import { CliHeader } from "@/components/ui/cli-header";
import { IdentityCard } from "@/components/sections/identity-card";
import { OrbitalDiagram } from "@/components/ui/orbital-diagram";

const sectionFade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

const focusAreas = [
  {
    title: "Infrastructure as Code",
    body: "Terraform module catalogues with remote state, policy-as-code scanning, and reproducible environments across AWS and Azure.",
  },
  {
    title: "CI/CD Reliability",
    body: "Pipelines that don't break at 2am. Short-lived credentials, automated testing gates, and deployment patterns that teams actually trust.",
  },
  {
    title: "System Reliability",
    body: "Observability as code with Azure Monitor, Grafana, and Prometheus. SLOs that surface real degradation before users notice.",
  },
  {
    title: "AI Solutions for Local Business",
    body: "Beyond enterprise infrastructure, I build practical AI-powered tools for local businesses, solving real operational problems with the same engineering discipline.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <CliHeader index="01" command="whoami" />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-16 items-start">
          <IdentityCard />

          <div>
            <motion.h2
              {...sectionFade}
              className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight font-[family-name:var(--font-space-grotesk)]"
            >
              Cloud engineer who makes infrastructure something teams
              stop worrying about
            </motion.h2>

            <motion.div
              {...sectionFade}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 space-y-5 text-[var(--muted-foreground)] leading-relaxed text-base"
            >
              <p>
                I&apos;m a DevOps engineer with 4+ years of hands-on experience
                designing and operating scalable cloud infrastructure on AWS
                and Azure. My focus is on infrastructure as code, CI/CD
                reliability, and keeping production systems fast and
                available.
              </p>
              <p>
                I work closely with product and engineering teams to remove
                friction from the release lifecycle. The goal is always the
                same: make deployments boring, make incidents rare, and make
                the infrastructure invisible to the people building on top
                of it. Track record of cutting deployment time by 78%,
                manual release effort by 80%, and deployment-related
                incidents by 70% across enterprise environments.
              </p>
              <p>
                Beyond enterprise platforms, I build AI-powered solutions
                for local businesses. Same engineering principles, applied
                to problems that matter to the people around me. Whether
                it&apos;s a Terraform module or an
                automation tool for a neighbourhood business, the approach
                is the same: understand the problem, build the system,
                measure the outcome.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Orbital diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 mb-8"
        >
          <OrbitalDiagram />
        </motion.div>

        {/* Focus areas */}
        <motion.div
          {...sectionFade}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
            Focus areas
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight font-[family-name:var(--font-space-grotesk)]">
            Where I do my best work
          </h3>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {focusAreas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--azure)]/40 transition-colors"
            >
              <h4 className="text-base font-semibold">{area.title}</h4>
              <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">
                {area.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}