"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { CliHeader } from "@/components/ui/cli-header";
import { TerminalEmail } from "@/components/sections/terminal-email";

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "ogunsola.ayodeji@yahoo.com",
    href: "mailto:ogunsola.ayodeji@yahoo.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/ayodeji-ogunsola",
    href: "https://www.linkedin.com/in/ayodeji-ogunsola/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/haywhyogs",
    href: "https://github.com/haywhyogs",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <CliHeader index="05" command="ping ayodeji" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight font-[family-name:var(--font-space-grotesk)]">
            Let&apos;s talk infrastructure
          </h2>
          <p className="mt-4 text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
            Available for cloud and platform engineering work — building,
            operating, or hardening Azure infrastructure. Open to
            conversations about whether I can help your team ship repeatable,
            observable systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8"
        >
          <TerminalEmail />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors"
            >
              <div className="size-10 grid place-items-center rounded-md bg-[var(--accent)]/10 text-[var(--accent)] shrink-0">
                <link.icon className="size-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-[var(--muted-foreground)]">
                  {link.label}
                </div>
                <div className="text-sm font-medium truncate">
                  {link.value}
                </div>
              </div>
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[var(--muted-foreground)]"
        >
          <span>base: Lagos, Nigeria</span>
          <a
            href="https://www.google.com/maps?q=Lagos,Nigeria"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-colors"
          >
            6.5244° N · 3.3792° E ↗
          </a>
          <span>tz: WAT · UTC+01:00</span>
        </motion.div>
      </div>
    </section>
  );
}