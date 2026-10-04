"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Star, Zap } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  onOpen: () => void;
};

export function ProjectCard({ project, onOpen }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="group relative rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-[var(--accent)] transition-all"
    >
      <button
        onClick={onOpen}
        className="block w-full text-left"
        aria-label={`Open ${project.title} details`}
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--muted)]">
          <Image
            src={project.hero.src}
            alt={project.hero.alt}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </button>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-xl font-semibold tracking-tight">
            {project.title}
          </h3>
          {project.stars !== undefined && (
            <span className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)] px-2 py-0.5 rounded-md border border-[var(--border)]">
              <Star className="size-3 fill-current" />
              {project.stars}
            </span>
          )}
        </div>

        <p className="text-sm text-[var(--muted-foreground)] mb-4 leading-relaxed">
          {project.tagline}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-5">
          {project.highlights.map((h) => (
            <div
              key={h.label}
              className="rounded-md border border-[var(--border)] bg-[var(--background)] p-2.5"
            >
              <div className="text-xs text-[var(--muted-foreground)]">
                {h.label}
              </div>
              <div className="text-sm font-semibold mt-0.5">{h.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-xs font-mono border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)]"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 6 && (
            <span className="px-2 py-0.5 rounded text-xs font-mono text-[var(--muted-foreground)]">
              +{project.techStack.length - 6}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:opacity-80 transition-opacity"
          >
            <Zap className="size-3.5" />
            Explore architecture
          </button>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <Github className="size-3.5" />
            Source
            <ArrowUpRight className="size-3" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}