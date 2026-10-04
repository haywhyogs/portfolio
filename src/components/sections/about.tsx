"use client";

import { motion } from "framer-motion";

const sectionFade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

const capabilities = [
  {
    title: "Provision reproducible Azure environments with Terraform",
    body:
      "VM, Container Registry, Key Vault, networking, and identity — all defined as code, with remote state in Azure Blob Storage. A single terraform apply rebuilds the environment from zero.",
    anchor: "ShopFlow, cloud-native-project-1",
  },
  {
    title: "Instrument services across metrics, traces, and logs",
    body:
      "Prometheus for SLO-grade metrics, Jaeger for distributed tracing, Loki for log aggregation — all correlated by OpenTelemetry trace ID. One slow checkout request tells the full story across all three lenses.",
    anchor: "ShopFlow",
  },
  {
    title: "Wire CI/CD with OIDC and Managed Identity",
    body:
      "Short-lived federated tokens for pipeline-to-cloud auth, Managed Identity for VM-to-registry auth, AcrPush for CI and AcrPull for the VM. No stored secrets anywhere — least privilege at every boundary.",
    anchor: "ShopFlow, cloud-native-project-1",
  },
  {
    title: "Define SLOs that surface real degradation",
    body:
      "p95 latency under 300ms, error rate under 1%, availability over 99.9%. Alerts fire after 2 minutes of sustained breach — enough to ignore noise, fast enough to act before users notice.",
    anchor: "ShopFlow",
  },
  {
    title: "Capture incidents as postmortems",
    body:
      "Every simulated incident gets a timeline, root cause, and follow-up. The postmortems are how the system improves — and they're public, because the lessons learned are the work.",
    anchor: "ShopFlow",
  },
  {
    title: "Operate the platform end-to-end",
    body:
      "From cloud-init bootstrapping a fresh VM, through ACR pulls and Docker Compose restarts, to Azure Logic Apps receiving alert webhooks. The pipeline isn't a side concern — it's the product.",
    anchor: "ShopFlow, cloud-native-project-1",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div {...sectionFade}>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
            What I do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            Cloud infrastructure that&apos;s repeatable, observable, and built
            to be operated — not just shipped
          </h2>
        </motion.div>

        <motion.div
          {...sectionFade}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 space-y-5 text-[var(--muted-foreground)] leading-relaxed text-base"
        >
          <p>
            I build and run production-style systems on Azure — the kind with
            real failure modes, real costs, and real operational consequences.
            My focus is on making infrastructure that holds up under load and
            recovers cleanly when it doesn&apos;t: every resource defined as
            code, every service instrumented before it ships, every credential
            issued just-in-time.
          </p>
          <p>
            ShopFlow is the flagship. Three Flask microservices on a VM,
            instrumented end-to-end with Prometheus, Jaeger, and Loki; deployed
            and updated through GitHub Actions using OIDC; every Azure
            resource — ACR, Key Vault, Application Insights, Logic App, the VM
            itself — managed by Terraform. When something breaks, the alerts
            route through a Logic App webhook and the incident becomes a
            postmortem.
          </p>
          <p>
            The pattern repeats: build the system, break it on purpose,
            instrument the failure path, document what you learned, then ship
            the improvement. Reliability isn&apos;t a phase at the end — it&apos;s
            how the work is shaped from the first commit.
          </p>
        </motion.div>

        <motion.div
          {...sectionFade}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
            Capabilities
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
            What the work looks like in practice
          </h3>
        </motion.div>

        <div className="mt-10 space-y-8">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-8 pb-8 border-b border-[var(--border)] last:border-b-0"
            >
              <div>
                <h4 className="text-base font-semibold leading-snug">
                  {cap.title}
                </h4>
                <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                  {cap.anchor}
                </p>
              </div>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                {cap.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}