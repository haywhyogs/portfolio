export type ImageRef = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  repoUrl: string;
  liveUrl?: string;
  stars?: number;
  techStack: string[];
  highlights: { label: string; value: string }[];
  hero: ImageRef;
  architecture: ImageRef;
  tabs: {
    id: string;
    label: string;
    images: ImageRef[];
    summary: string;
  }[];
  incidents?: {
    id: string;
    title: string;
    summary: string;
    severity: string;
    images: ImageRef[];
    postmortemSlug?: string;
  }[];
  securityNotes?: string[];
};

export const projects: Project[] = [
  {
    slug: "shopflow",
    title: "ShopFlow",
    tagline: "Production-style e-commerce observability platform on Azure",
    description:
      "A three-service Flask microservices storefront deployed to Azure with full SLO-based observability, distributed tracing, log correlation, incident simulations, and infrastructure managed entirely by Terraform.",
    repoUrl: "https://github.com/haywhyogs/shopflow",
    stars: 1,
    techStack: [
      "Python",
      "Flask",
      "Docker",
      "Terraform",
      "Prometheus",
      "Grafana",
      "Jaeger",
      "Loki",
      "OpenTelemetry",
      "GitHub Actions",
      "Azure",
    ],
    highlights: [
      { label: "SLO p95 target", value: "<300ms" },
      { label: "Services", value: "3 microservices" },
      { label: "Simulated incidents", value: "2 with postmortems" },
      { label: "IaC coverage", value: "100% Terraform" },
    ],
    hero: {
      src: "/images/shopflow/architecture.png",
      alt: "ShopFlow architecture diagram",
    },
    architecture: {
      src: "/images/shopflow/architecture.png",
      alt: "ShopFlow architecture",
    },
    tabs: [
      {
        id: "app",
        label: "Application",
        summary:
          "Three Flask microservices — catalogue, checkout, notifications — communicating over an internal Docker network. Checkout is the only public endpoint, serving both the storefront and the order API.",
        images: [
          {
            src: "/images/shopflow/storefront.png",
            alt: "ShopFlow storefront homepage",
            caption: "Customer-facing storefront, served by Checkout",
          },
          {
            src: "/images/shopflow/product-detail.png",
            alt: "ShopFlow product detail page",
            caption: "Product detail page with stock validation",
          },
        ],
      },
      {
        id: "observability",
        label: "Observability",
        summary:
          "Three independent lenses — Prometheus metrics, Jaeger distributed traces, Loki aggregated logs — all correlated by OpenTelemetry trace ID.",
        images: [
          {
            src: "/images/shopflow/grafana.png",
            alt: "Grafana dashboard",
            caption: "Grafana: p95 latency, error rate, request volume, orders processed",
          },
          {
            src: "/images/shopflow/jaeger.png",
            alt: "Jaeger trace waterfall",
            caption: "Jaeger: single checkout request traced across all three services",
          },
          {
            src: "/images/shopflow/loki.png",
            alt: "Loki trace correlation",
            caption: "Loki: log lines correlated by trace ID across services",
          },
          {
            src: "/images/shopflow/azure-monitor-p95.png",
            alt: "Azure Monitor p95 latency",
            caption: "Azure Monitor: same traces exported to Application Insights",
          },
        ],
      },
      {
        id: "iac",
        label: "Infrastructure",
        summary:
          "All Azure resources — VM, ACR, Key Vault, Application Insights, Logic App, VNet, NSG, Managed Identity — defined in Terraform with remote state in Azure Blob Storage. The VM bootstraps itself via cloud-init.",
        images: [
          {
            src: "/images/shopflow/azure-monitor-avg.png",
            alt: "Azure resource overview",
            caption: "Azure resources managed entirely by Terraform",
          },
        ],
      },
      {
        id: "cicd",
        label: "CI/CD",
        summary:
          "Every push to main builds and pushes Docker images to ACR via OIDC federated credentials — no stored secrets — then deploys to the VM via SSH.",
        images: [
          {
            src: "/images/shopflow/cicd.png",
            alt: "GitHub Actions pipeline",
            caption: "GitHub Actions: build → tag by SHA → push → deploy",
          },
        ],
      },
      {
        id: "alerting",
        label: "Alerting",
        summary:
          "SLO-based alert rules in Prometheus, evaluated independently of Grafana. Grafana alert rules route firing alerts to an Azure Logic App via webhook for centralized notification routing.",
        images: [
          {
            src: "/images/shopflow/logic-app.png",
            alt: "Logic App alert payload",
            caption: "Azure Logic App: receives alert webhooks with full payload context",
          },
        ],
      },
    ],
    incidents: [
      {
        id: "latency",
        title: "Checkout Latency Spike",
        summary:
          "Artificial 1.5s delay breached the 300ms p95 SLO. Detected within 30 seconds, alert fired after 2 minutes, diagnosed via Jaeger (delay isolated to checkout span only), resolved in 6 minutes total.",
        severity: "Warning",
        images: [
          {
            src: "/images/shopflow/incidents/1-dashboard-spike.png",
            alt: "Grafana dashboard showing latency spike",
            caption: "Dashboard: p95 spiked to ~1.48s, well above 300ms SLO",
          },
          {
            src: "/images/shopflow/incidents/1-alert-firing.png",
            alt: "Grafana alert in firing state",
            caption: "Alert: pending → firing after 2 minutes sustained breach",
          },
          {
            src: "/images/shopflow/incidents/1-trace-list.png",
            alt: "Jaeger trace list during latency incident",
            caption: "Jaeger: slow traces isolated to checkout span",
          },
        ],
        postmortemSlug: "incident-1-latency",
      },
      {
        id: "errors",
        title: "Server Error Rate Spike",
        summary:
          "30% random failure rate breached the 1% error SLO. Single-span error traces in Jaeger immediately identified checkout as the failure source — no downstream calls to investigate.",
        severity: "Critical",
        images: [
          {
            src: "/images/shopflow/incidents/2-dashboard-spike.png",
            alt: "Grafana dashboard showing error spike",
            caption: "Dashboard: error rate jumped to ~25%, SLO breach confirmed",
          },
          {
            src: "/images/shopflow/incidents/2-alert-firing.png",
            alt: "Grafana alert in firing state",
            caption: "Alert: error rate alert in firing state",
          },
          {
            src: "/images/shopflow/incidents/2-trace-list.png",
            alt: "Jaeger trace list during error incident",
            caption: "Jaeger: failed traces have only one span — no downstream calls",
          },
          {
            src: "/images/shopflow/incidents/2-loki-logs.png",
            alt: "Loki logs showing error messages",
            caption: "Loki: exact error message + trace ID for any failed request",
          },
        ],
        postmortemSlug: "incident-2-errors",
      },
    ],
    securityNotes: [
      "OIDC federated credentials — no service principal secrets in GitHub",
      "User-assigned Managed Identity for VM → ACR, ACR → Key Vault access",
      "Least privilege role assignments (AcrPull for VM, AcrPush for CI)",
      "Secrets stored in Azure Key Vault, accessed at VM bootstrap",
    ],
  },
  {
    slug: "cloud-native-project-1",
    title: "Cloud-Native Monitoring Service",
    tagline: "From Docker to multi-container CI/CD — a 7-phase journey",
    description:
      "A Python monitoring service that grew through seven phases: local Docker → Azure App Service → VM deployment → Terraform IaC → multi-container networking → automated CI/CD with OIDC. Three instances monitor each other via /check endpoints.",
    repoUrl: "https://github.com/haywhyogs/cloud-native-project-1",
    stars: 1,
    techStack: [
      "Python",
      "Flask",
      "Docker",
      "Docker Compose",
      "Terraform",
      "Azure VM",
      "Azure Container Registry",
      "GitHub Actions",
      "OIDC",
      "Managed Identity",
      "cloud-init",
    ],
    highlights: [
      { label: "Evolution phases", value: "7 documented stages" },
      { label: "Containers", value: "3 instances, mutual health checks" },
      { label: "Authentication", value: "OIDC + Managed Identity" },
      { label: "State management", value: "Remote Terraform state" },
    ],
    hero: {
      src: "/images/cloud-native/architecture.jpg",
      alt: "Cloud-native architecture diagram",
    },
    architecture: {
      src: "/images/cloud-native/architecture.jpg",
      alt: "Cloud-native project architecture",
    },
    tabs: [
      {
        id: "app",
        label: "Application",
        summary:
          "Three independent container instances exposing /health, /metrics, /status, /check endpoints. Each instance actively monitors the others.",
        images: [
          {
            src: "/images/cloud-native/status.jpg",
            alt: "Status endpoint output",
            caption: "Status endpoint: uptime, dependencies, health of other instances",
          },
          {
            src: "/images/cloud-native/containers.jpg",
            alt: "Docker ps showing three running containers",
            caption: "Three containers running on the same VM, different ports",
          },
        ],
      },
      {
        id: "iac",
        label: "Infrastructure",
        summary:
          "Azure VM, ACR, VNet, and Managed Identity defined in Terraform. Remote state stored in Azure Blob Storage. cloud-init bootstraps the VM on first boot.",
        images: [
          {
            src: "/images/cloud-native/azure-overview.png",
            alt: "Azure resource overview",
            caption: "Azure resources provisioned by Terraform",
          },
        ],
      },
      {
        id: "cicd",
        label: "CI/CD",
        summary:
          "GitHub Actions pipeline: OIDC authentication → build Docker image → push to ACR (tagged by commit SHA) → SSH into VM → pull and restart containers.",
        images: [
          {
            src: "/images/cloud-native/pipeline.jpg",
            alt: "GitHub Actions pipeline",
            caption: "Pipeline: zero stored credentials, SHA-tagged images",
          },
        ],
      },
      {
        id: "security",
        label: "Security",
        summary:
          "OIDC federated identity for GitHub → Azure. Managed Identity for VM → ACR. AcrPush for CI, AcrPull for VM. No credentials in source control.",
        images: [
          {
            src: "/images/cloud-native/oidc.png",
            alt: "OIDC over stored secrets diagram",
            caption: "OIDC eliminates stored secrets in CI/CD",
          },
        ],
      },
    ],
    securityNotes: [
      "OIDC federated identity: GitHub proves identity to Azure dynamically per pipeline run",
      "Managed Identity for VM → ACR access (AcrPull only)",
      "Service principal for CI → ACR (AcrPush only)",
      "No secrets stored anywhere outside Azure",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}