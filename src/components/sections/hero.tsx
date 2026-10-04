"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative hero-gradient min-h-[90vh] flex items-center justify-center px-6 pt-14">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)]/60 backdrop-blur-sm text-xs text-[var(--muted-foreground)] mb-8"
        >
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Open to cloud & platform engineering roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
        >
          Ayodeji Ogunsola
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-xl sm:text-2xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed"
        >
          Cloud engineer building observable, production-grade systems on Azure.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-base text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed"
        >
          Infrastructure-as-code, SLO-based observability, and security by default.
          I build systems that fail loudly and recover quietly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="px-5 py-2.5 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] font-medium hover:opacity-90 transition-opacity"
          >
            View projects
          </a>
          <Link
            href="/writing"
            className="px-5 py-2.5 rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] font-medium hover:border-[var(--accent)] transition-colors"
          >
            Read postmortems
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <a
            href="https://github.com/haywhyogs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="size-10 grid place-items-center rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-colors"
          >
            <Github className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/ayodeji-ogunsola/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="size-10 grid place-items-center rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-colors"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="mailto:ogunsola.ayodeji@yahoo.com"
            aria-label="Email"
            className="size-10 grid place-items-center rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-colors"
          >
            <Mail className="size-4" />
          </a>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 inline-flex flex-col items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          Scroll
          <ArrowDown className="size-3 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}