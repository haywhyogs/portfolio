import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { AppProviders } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayodeji-cloud.netlify.app"),
  title: {
    default: "Ayodeji Ogunsola, Cloud Engineer",
    template: "%s · Ayodeji Ogunsola",
  },
  description:
    "Cloud engineer building observable, production-grade systems on Azure. Specializing in infrastructure-as-code, observability, and SRE practices with a security-first mindset.",
  keywords: [
    "cloud engineer",
    "Azure",
    "Terraform",
    "observability",
    "Prometheus",
    "Grafana",
    "DevOps",
    "SRE",
    "platform engineering",
  ],
  authors: [{ name: "Ayodeji Ogunsola" }],
  openGraph: {
    title: "Ayodeji Ogunsola, Cloud Engineer",
    description:
      "Cloud engineer building observable, production-grade systems on Azure. Specializing in infrastructure-as-code, observability, and SRE practices with a security-first mindset.",
    images: ["/images/shopflow/architecture.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayodeji Ogunsola, Cloud Engineer",
    description:
      "Cloud engineer building observable, production-grade systems on Azure.",
    images: ["/images/shopflow/architecture.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <div className="noise-overlay" aria-hidden="true" />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}