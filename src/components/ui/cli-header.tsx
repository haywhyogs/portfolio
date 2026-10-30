"use client";

import { motion } from "framer-motion";

export function CliHeader({
  index,
  command,
  className = "",
}: {
  index: string;
  command: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`cli-header ${className}`}
    >
      <span className="cli-index">{index}</span>
      <span>·</span>
      <span>{command}</span>
    </motion.div>
  );
}