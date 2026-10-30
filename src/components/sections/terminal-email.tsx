"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function TerminalEmail() {
  const [copied, setCopied] = useState(false);
  const email = "ogunsola.ayodeji@yahoo.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="terminal-line hover:border-[var(--accent)] transition-colors group w-full sm:w-auto"
      aria-label="Copy email to clipboard"
    >
      <span className="prompt">$</span>
      <span>echo {email} | clip</span>
      {copied ? (
        <span className="text-emerald-500 flex items-center gap-1">
          <Check className="size-3" /> copied
        </span>
      ) : (
        <Copy className="size-3 opacity-50 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}