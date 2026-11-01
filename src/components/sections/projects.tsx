"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/project-card";
import { CliHeader } from "@/components/ui/cli-header";
import { projects } from "@/lib/projects";

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto">
        <CliHeader index="04" command="git log --work" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight font-[family-name:var(--font-space-grotesk)]">
            Recent infrastructure work
          </h2>
          <p className="mt-4 text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
            Two systems built and operated on Azure, with full observability
            and incident response. Expand each project to view screenshots.
          </p>
        </motion.div>

        <div className="mt-12 space-y-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}