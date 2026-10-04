"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

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
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
            Get in touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3"
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
      </div>
    </section>
  );
}