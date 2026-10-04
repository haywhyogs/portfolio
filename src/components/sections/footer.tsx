export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[var(--muted-foreground)]">
        <p>
          © {new Date().getFullYear()} Ayodeji Ogunsola. Built with Next.js,
          deployed on Netlify.
        </p>
        <p className="text-xs">
          Source on{" "}
          <a
            href="https://github.com/haywhyogs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:opacity-80"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}