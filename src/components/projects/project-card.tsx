"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
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
      className="group rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-[var(--accent)] transition-colors"
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
        </div>
      </button>

      <div className="p-6 sm:p-8">
        <h3 className="text-2xl font-bold tracking-tight">
          {project.title}
        </h3>

        <p className="mt-3 text-base text-[var(--muted-foreground)] leading-relaxed">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-xs font-mono border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between pt-6 border-t border-[var(--border)]">
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:opacity-80 transition-opacity"
          >
            Explore architecture
            <ArrowUpRight className="size-3.5" />
          </button>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <Github className="size-3.5" />
            Source
          </a>
        </div>
      </div>
    </motion.article>
  );
}