import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayodeji-cloud.netlify.app"),
  title: {
    default: "Ayodeji Ogunsola — Cloud Engineer",
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
    title: "Ayodeji Ogunsola — Cloud Engineer",
    description:
      "Cloud engineer building observable, production-grade systems on Azure. Specializing in infrastructure-as-code, observability, and SRE practices with a security-first mindset.",
    images: ["/images/shopflow/architecture.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayodeji Ogunsola — Cloud Engineer",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}