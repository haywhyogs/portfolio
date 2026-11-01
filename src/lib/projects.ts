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
  techStack: string[];
  highlights: { label: string; value: string }[];
  gallery: ImageRef[];
  securityNotes?: string[];
};

export const projects: Project[] = [
  {
    slug: "shopflow",
    title: "ShopFlow",
    tagline: "Production-style e-commerce observability platform on Azure",
    description:
      "Three Flask microservices (catalogue, checkout, notifications) deployed to Azure with full SLO-based observability, distributed tracing, log correlation, and infrastructure managed entirely by Terraform.",
    repoUrl: "https://github.com/haywhyogs/shopflow",
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
      { label: "Incidents", value: "2 postmortems" },
      { label: "IaC coverage", value: "100% Terraform" },
    ],
    gallery: [
      {
        src: "/images/shopflow/architecture.png",
        alt: "ShopFlow architecture diagram",
        caption: "Architecture: three services, one public endpoint",
      },
      {
        src: "/images/shopflow/grafana.png",
        alt: "Grafana dashboard",
        caption: "Grafana: p95 latency, error rate, orders processed",
      },
      {
        src: "/images/shopflow/storefront.png",
        alt: "Storefront homepage",
        caption: "Customer-facing storefront served by Checkout",
      },
      {
        src: "/images/shopflow/jaeger.png",
        alt: "Jaeger trace waterfall",
        caption: "Jaeger: single request traced across all three services",
      },
    ],
    securityNotes: [
      "OIDC federated credentials, no stored secrets in GitHub",
      "User-assigned Managed Identity for VM to ACR and Key Vault",
      "Least privilege role assignments (AcrPull for VM, AcrPush for CI)",
    ],
  },
  {
    slug: "cloud-native-project-1",
    title: "Cloud-Native Monitoring Service",
    tagline: "From Docker to multi-container CI/CD, a 7-phase journey",
    description:
      "A Python monitoring service that grew through seven phases: local Docker, Azure App Service, VM deployment, Terraform IaC, multi-container networking, and automated CI/CD with OIDC.",
    repoUrl: "https://github.com/haywhyogs/cloud-native-project-1",
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
      { label: "Containers", value: "3 instances, mutual checks" },
      { label: "Authentication", value: "OIDC + Managed Identity" },
      { label: "State management", value: "Remote Terraform state" },
    ],
    gallery: [
      {
        src: "/images/cloud-native/architecture.jpg",
        alt: "Cloud-native architecture diagram",
        caption: "Architecture: three monitoring containers on one VM",
      },
      {
        src: "/images/cloud-native/pipeline.jpg",
        alt: "GitHub Actions pipeline",
        caption: "CI/CD: OIDC auth, SHA-tagged builds, automated deploy",
      },
      {
        src: "/images/cloud-native/containers.jpg",
        alt: "Docker containers running",
        caption: "Three containers running on different ports",
      },
      {
        src: "/images/cloud-native/status.jpg",
        alt: "Status endpoint output",
        caption: "Status endpoint: uptime and cross-container health",
      },
    ],
    securityNotes: [
      "OIDC federated identity: no stored credentials in CI/CD",
      "Managed Identity for VM to ACR (AcrPull only)",
      "AcrPush for CI, AcrPull for VM, least privilege throughout",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}