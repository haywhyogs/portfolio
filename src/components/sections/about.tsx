"use client";

import { motion } from "framer-motion";
import { skillCategories, skills } from "@/lib/skills";
import { cn } from "@/lib/utils";

const sectionFade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div {...sectionFade}>
          <p className="text-sm font-medium text-[var(--accent)] mb-2">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Pragmatic systems, real production, security by default
          </h2>
        </motion.div>

        <motion.div
          {...sectionFade}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 space-y-4 text-[var(--muted-foreground)] leading-relaxed"
        >
          <p>
            I&apos;m a cloud engineer focused on infrastructure that holds up under
            real conditions — not tutorial-perfect setups that fall apart the
            moment something unexpected happens. My approach is to build the
            messy version first, watch how it fails, and then harden it with
            observability, IaC, and CI/CD until the failures are visible,
            bounded, and recoverable.
          </p>
          <p>
            ShopFlow, my main project, started as three Flask services on a VM
            and grew into a production-style platform with Prometheus SLO
            alerting, distributed tracing via Jaeger, log correlation through
            Loki, and an Azure Logic App routing alerts to a webhook endpoint.
            Every piece of infrastructure — VM, ACR, Key Vault, Managed
            Identity, Application Insights — is defined in Terraform and
            reproducible from a single <code className="font-mono text-sm">terraform apply</code>.
          </p>
          <p>
            Security isn&apos;t a layer I add at the end. It&apos;s how the
            system is wired: OIDC for CI/CD instead of stored secrets, Managed
            Identity for VM-to-cloud access instead of API keys, and RBAC roles
            scoped to exactly what each component needs (AcrPush for CI,
            AcrPull for the VM, nothing more). I&apos;d rather take the time
            to wire it correctly than ship a shortcut that creates a foothold.
          </p>
        </motion.div>

        <motion.div
          {...sectionFade}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-4">
            Skills
          </h3>
          <div className="space-y-6">
            {skillCategories.map((category) => {
              const categorySkills = skills.filter((s) => s.category === category);
              return (
                <div key={category}>
                  <div className="text-xs font-medium text-[var(--muted-foreground)] mb-2">
                    {category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.name}
                        className={cn(
                          "px-2.5 py-1 rounded-md text-xs border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]"
                        )}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}