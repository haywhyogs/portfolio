"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Github } from "lucide-react";
import { useState } from "react";
import { ImageLightbox } from "@/components/lightbox/image-lightbox";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-[var(--azure)]/40 transition-colors"
    >
      <div className="p-6 sm:p-8">
        <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
        <p className="mt-1 text-sm text-[var(--azure)]">{project.tagline}</p>

        <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[11px] font-mono border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {project.highlights.map((h) => (
            <div
              key={h.label}
              className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2"
            >
              <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">
                {h.label}
              </div>
              <div className="text-sm font-semibold mt-0.5">{h.value}</div>
            </div>
          ))}
        </div>

        {project.securityNotes && (
          <div className="mt-5 space-y-1">
            {project.securityNotes.map((note, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs text-[var(--muted-foreground)]"
              >
                <span className="text-[var(--cyan)] mt-0.5 shrink-0">▸</span>
                {note}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3 pt-5 border-t border-[var(--border)]">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--azure)] hover:opacity-80 transition-opacity"
          >
            <Github className="size-3.5" />
            Repository
            <ArrowUpRight className="size-3" />
          </a>

          <button
            onClick={() => setGalleryOpen(!galleryOpen)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors ml-auto"
            aria-expanded={galleryOpen}
          >
            {galleryOpen ? "Hide gallery" : `Show gallery (${project.gallery.length})`}
            <ChevronDown
              className={`size-3.5 transition-transform ${galleryOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {galleryOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5">
                {project.gallery.map((img, i) => (
                  <ImageLightbox key={i} image={img} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}