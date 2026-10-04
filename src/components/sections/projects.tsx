"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectModal } from "@/components/projects/project-modal";
import { projects } from "@/lib/projects";

export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openProject = projects.find((p) => p.slug === openSlug);

  return (
    <section id="projects" className="py-24 px-6 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
            Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            Recent infrastructure work
          </h2>
          <p className="mt-4 text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
            Two systems built and operated on Azure, with full observability
            and incident response.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onOpen={() => setOpenSlug(project.slug)}
            />
          ))}
        </div>
      </div>

      {openProject && (
        <ProjectModal
          project={openProject}
          open={!!openSlug}
          onOpenChange={(o) => !o && setOpenSlug(null)}
        />
      )}
    </section>
  );
}