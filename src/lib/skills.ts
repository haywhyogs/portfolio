export type StackCategory = {
  key: string;
  label: string;
  description: string;
  items: string[];
};

export const stackCategories: StackCategory[] = [
  {
    key: "cloud",
    label: "Cloud",
    description: "Azure resources, identity, and secrets management",
    items: [
      "Azure VM",
      "Azure Container Registry",
      "Azure Key Vault",
      "Application Insights",
      "Azure Logic Apps",
      "Managed Identity",
    ],
  },
  {
    key: "observability",
    label: "Observability",
    description: "Metrics, traces, logs, all correlated by trace ID",
    items: [
      "Prometheus",
      "Grafana",
      "Jaeger",
      "Loki",
      "Promtail",
      "OpenTelemetry",
      "SLO / Error Budgets",
    ],
  },
  {
    key: "infrastructure",
    label: "Infrastructure",
    description: "Everything as code, reproducible from a single command",
    items: [
      "Terraform",
      "Docker",
      "Docker Compose",
      "cloud-init",
      "Linux (Ubuntu)",
      "Remote State",
    ],
  },
  {
    key: "security",
    label: "Security",
    description: "No stored secrets, least privilege at every boundary",
    items: [
      "OIDC Federated Identity",
      "Managed Identity",
      "RBAC (AcrPull / AcrPush)",
      "GitHub Actions",
      "CI/CD",
    ],
  },
];

export const marqueeSkills = [
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

export const stats = [
  { value: 78, suffix: "%", label: "deployment time reduced" },
  { value: 80, suffix: "%", label: "manual release effort cut" },
  { value: 55, suffix: "%", label: "faster pipeline recovery" },
  { value: 4, suffix: "+", label: "years in cloud engineering" },
];