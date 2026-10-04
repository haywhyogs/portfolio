export type Skill = {
  name: string;
  category: "Cloud" | "Observability" | "Infrastructure" | "Languages" | "Practices";
  projects: string[]; // project slugs that use this skill
};

export const skills: Skill[] = [
  // Cloud
  { name: "Azure", category: "Cloud", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "Azure VM", category: "Cloud", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "Azure Container Registry", category: "Cloud", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "Azure Key Vault", category: "Cloud", projects: ["shopflow"] },
  { name: "Azure Monitor (Application Insights)", category: "Cloud", projects: ["shopflow"] },
  { name: "Azure Logic Apps", category: "Cloud", projects: ["shopflow"] },

  // Observability
  { name: "Prometheus", category: "Observability", projects: ["shopflow"] },
  { name: "Grafana", category: "Observability", projects: ["shopflow"] },
  { name: "Jaeger", category: "Observability", projects: ["shopflow"] },
  { name: "Loki", category: "Observability", projects: ["shopflow"] },
  { name: "Promtail", category: "Observability", projects: ["shopflow"] },
  { name: "OpenTelemetry", category: "Observability", projects: ["shopflow"] },
  { name: "SLO / Error Budgets", category: "Observability", projects: ["shopflow"] },

  // Infrastructure
  { name: "Terraform", category: "Infrastructure", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "Docker", category: "Infrastructure", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "Docker Compose", category: "Infrastructure", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "cloud-init", category: "Infrastructure", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "Linux (Ubuntu)", category: "Infrastructure", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "Remote State Management", category: "Infrastructure", projects: ["shopflow", "cloud-native-project-1"] },

  // Languages
  { name: "Python", category: "Languages", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "Flask", category: "Languages", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "Bash", category: "Languages", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "YAML", category: "Languages", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "HCL (Terraform)", category: "Languages", projects: ["shopflow", "cloud-native-project-1"] },

  // Practices
  { name: "GitHub Actions", category: "Practices", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "OIDC Federated Identity", category: "Practices", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "Managed Identity", category: "Practices", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "CI/CD", category: "Practices", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "Incident Response", category: "Practices", projects: ["shopflow"] },
  { name: "Postmortem Documentation", category: "Practices", projects: ["shopflow"] },
  { name: "IaC", category: "Practices", projects: ["shopflow", "cloud-native-project-1"] },
  { name: "Least Privilege (RBAC)", category: "Practices", projects: ["shopflow", "cloud-native-project-1"] },
];

export const skillCategories = ["Cloud", "Observability", "Infrastructure", "Languages", "Practices"] as const;