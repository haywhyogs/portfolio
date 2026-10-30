"use client";

const skills = [
  "Azure",
  "Terraform",
  "Docker",
  "Prometheus",
  "Grafana",
  "Jaeger",
  "Loki",
  "OpenTelemetry",
  "GitHub Actions",
  "OIDC",
  "Managed Identity",
  "Cloud-init",
  "Python",
  "Flask",
  "CI/CD",
  "IaC",
  "SLO",
  "Incident Response",
  "RBAC",
  "Key Vault",
];

export function Marquee() {
  const duplicated = [...skills, ...skills];

  return (
    <div className="border-y border-[var(--border)] bg-[var(--muted)]/30 py-3 overflow-hidden select-none">
      <div className="marquee-track">
        {duplicated.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="inline-flex items-center gap-3 px-4 text-xs font-mono uppercase tracking-wider text-[var(--muted-foreground)] whitespace-nowrap"
          >
            <span className="size-1 rounded-full bg-[var(--accent)]" />
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}