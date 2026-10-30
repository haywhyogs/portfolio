"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CliHeader } from "@/components/ui/cli-header";
import { stackCategories } from "@/lib/skills";
import { cn } from "@/lib/utils";

export function Stack() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const yamlLines = [
    { indent: 0, key: "stack", value: "" },
    { indent: 2, key: "cloud", value: "[azure-vm, acr, key-vault, app-insights]" },
    { indent: 2, key: "observability", value: "[prometheus, grafana, jaeger, loki]" },
    { indent: 2, key: "infrastructure", value: "[terraform, docker, cloud-init, linux]" },
    { indent: 2, key: "security", value: "[oidc, managed-identity, rbac, cicd]" },
    { indent: 0, key: "", value: "" },
    { indent: 0, key: "mode", value: "secure_by_default  # no stored secrets" },
  ];

  return (
    <section id="stack" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <CliHeader index="02" command="cat stack.yaml" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            The toolchain, declared
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* YAML file render */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)] bg-[var(--muted)]">
              <span className="text-xs font-mono text-[var(--muted-foreground)]">
                infra/stack.yaml
              </span>
              <span className="text-xs font-mono text-[var(--muted-foreground)]">
                tracked · drift checked
              </span>
            </div>
            <div className="p-4 font-mono text-sm leading-relaxed overflow-x-auto">
              {yamlLines.map((line, i) => {
                const isCategory = ["cloud", "observability", "infrastructure", "security"].includes(line.key);
                return (
                  <div
                    key={i}
                    className={cn(
                      "py-0.5",
                      isCategory && "cursor-pointer rounded px-1 -mx-1",
                      isCategory && hoveredKey === line.key && "bg-[var(--accent)]/10"
                    )}
                    onMouseEnter={() => isCategory && setHoveredKey(line.key)}
                    onMouseLeave={() => setHoveredKey(null)}
                  >
                    <span className="select-none text-[var(--muted-foreground)] mr-3">
                      {String(i + 1).padStart(2, " ")}
                    </span>
                    <span style={{ paddingLeft: `${line.indent * 0.75}rem` }}>
                      {line.key && (
                        <>
                          <span className="yaml-key">{line.key}</span>
                          <span className="yaml-bracket">: </span>
                        </>
                      )}
                      {line.value && (
                        <span className="yaml-value">{line.value}</span>
                      )}
                      {!line.value && line.key === "stack" && (
                        <span className="yaml-comment"># production toolkit</span>
                      )}
                      {line.key === "mode" && (
                        <span className="yaml-comment"># least privilege at every boundary</span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Category cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stackCategories.map((cat, i) => (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => setHoveredKey(cat.key)}
                onMouseLeave={() => setHoveredKey(null)}
                className={cn(
                  "rounded-lg border p-4 transition-colors",
                  hoveredKey === cat.key
                    ? "border-[var(--accent)] bg-[var(--accent)]/5"
                    : "border-[var(--border)] bg-[var(--card)]"
                )}
              >
                <span className="text-xs font-mono text-[var(--accent)]">
                  {cat.key}
                </span>
                <h3 className="mt-1 text-sm font-semibold">{cat.label}</h3>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  {cat.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono border border-[var(--border)] text-[var(--muted-foreground)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}