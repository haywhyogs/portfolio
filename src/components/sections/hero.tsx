"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";
import { StatusStrip } from "@/components/sections/status-strip";

export function Hero() {
  return (
    <section className="hero-full-viewport px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--azure)] mb-6"
        >
          Cloud & Platform Engineer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[clamp(2rem,7vw,4.5rem)] font-bold tracking-tight leading-[1.1] text-balance"
        >
          Ayodeji Ogunsola
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed text-pretty"
        >
          I design, deploy, and operate cloud infrastructure on Azure.
          Repeatable through infrastructure-as-code, observable end-to-end,
          and secure by default.
        </motion.p>

        <StatusStrip />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic>
            <Link
              href="#projects"
              className="inline-block px-6 py-3 rounded-full btn-primary font-medium text-sm"
            >
              See the work
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/writing"
              className="inline-block px-6 py-3 rounded-full btn-secondary font-medium text-sm"
            >
              Read postmortems
            </Link>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <a
            href="https://github.com/haywhyogs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="social-link"
          >
            <Github className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/ayodeji-ogunsola/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="social-link"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="mailto:ogunsola.ayodeji@yahoo.com"
            aria-label="Email"
            className="social-link"
          >
            <Mail className="size-4" />
          </a>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 inline-flex flex-col items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mx-auto"
        >
          Scroll
          <ArrowDown className="size-3 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}