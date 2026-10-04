"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowUpRight, Github, Shield, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ImageLightbox } from "@/components/lightbox/image-lightbox";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectModal({
  project,
  open,
  onOpenChange,
}: {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState(project.tabs[0].id);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-5xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl">
            <DialogPrimitive.Close
              className="absolute top-4 right-4 size-9 grid place-items-center rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors z-10"
              aria-label="Close"
            >
              <X className="size-4" />
            </DialogPrimitive.Close>

            <div className="relative aspect-[21/9] overflow-hidden rounded-t-xl bg-[var(--muted)]">
              <Image
                src={project.architecture.src}
                alt={project.architecture.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>

            <div className="p-6 sm:p-8 border-b border-[var(--border)]">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <DialogPrimitive.Title className="text-3xl font-bold tracking-tight">
                    {project.title}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description className="mt-2 text-[var(--muted-foreground)]">
                    {project.description}
                  </DialogPrimitive.Description>
                </div>
                {project.stars !== undefined && (
                  <span className="shrink-0 inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] px-2.5 py-1 rounded-md border border-[var(--border)]">
                    <Star className="size-3.5 fill-current" />
                    {project.stars}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-5">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Github className="size-3.5" />
                  View on GitHub
                  <ArrowUpRight className="size-3" />
                </a>
              </div>
            </div>

            <Tabs.Root
              value={activeTab}
              onValueChange={setActiveTab}
              className="p-6 sm:p-8"
            >
              <Tabs.List className="flex flex-wrap gap-1 border-b border-[var(--border)] mb-6 -mx-2 px-2 overflow-x-auto">
                {project.tabs.map((tab) => (
                  <Tabs.Trigger
                    key={tab.id}
                    value={tab.id}
                    className={cn(
                      "px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
                      activeTab === tab.id
                        ? "border-[var(--accent)] text-[var(--foreground)]"
                        : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    )}
                  >
                    {tab.label}
                  </Tabs.Trigger>
                ))}
                {project.incidents && project.incidents.length > 0 && (
                  <Tabs.Trigger
                    value="incidents"
                    className={cn(
                      "px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
                      activeTab === "incidents"
                        ? "border-[var(--accent)] text-[var(--foreground)]"
                        : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    )}
                  >
                    Incidents
                  </Tabs.Trigger>
                )}
                {project.securityNotes && (
                  <Tabs.Trigger
                    value="security"
                    className={cn(
                      "px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
                      activeTab === "security"
                        ? "border-[var(--accent)] text-[var(--foreground)]"
                        : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    )}
                  >
                    Security
                  </Tabs.Trigger>
                )}
              </Tabs.List>

              {project.tabs.map((tab) => (
                <Tabs.Content key={tab.id} value={tab.id} className="space-y-6">
                  <p className="text-[var(--muted-foreground)] leading-relaxed">
                    {tab.summary}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tab.images.map((img, i) => (
                      <ImageLightbox key={i} image={img} />
                    ))}
                  </div>
                </Tabs.Content>
              ))}

              {project.incidents && project.incidents.length > 0 && (
                <Tabs.Content value="incidents" className="space-y-8">
                  {project.incidents.map((incident) => (
                    <div key={incident.id}>
                      <div className="flex items-start gap-3 mb-4">
                        <div
                          className={cn(
                            "px-2 py-0.5 rounded-md text-xs font-medium border shrink-0 mt-1",
                            incident.severity === "Critical"
                              ? "border-red-500/40 bg-red-500/10 text-red-500"
                              : "border-amber-500/40 bg-amber-500/10 text-amber-500"
                          )}
                        >
                          {incident.severity}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {incident.title}
                          </h3>
                          <p className="mt-1 text-sm text-[var(--muted-foreground)] leading-relaxed">
                            {incident.summary}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {incident.images.map((img, i) => (
                          <ImageLightbox key={i} image={img} />
                        ))}
                      </div>
                      {incident.postmortemSlug && (
                        <Link
                          href={`/writing/${incident.postmortemSlug}`}
                          className="inline-flex items-center gap-1.5 mt-4 text-sm text-[var(--accent)] hover:opacity-80"
                        >
                          Read the full postmortem →
                        </Link>
                      )}
                    </div>
                  ))}
                </Tabs.Content>
              )}

              {project.securityNotes && (
                <Tabs.Content value="security" className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-[var(--border)] bg-[var(--background)]">
                    <Shield className="size-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        Security architecture decisions baked into this project.
                        No stored secrets, no exposed keys, least privilege
                        throughout.
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {project.securityNotes.map((note, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-md border border-[var(--border)] bg-[var(--background)]"
                      >
                        <span className="text-[var(--accent)] mt-0.5">▸</span>
                        <span className="text-sm">{note}</span>
                      </li>
                    ))}
                  </ul>
                </Tabs.Content>
              )}
            </Tabs.Root>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}