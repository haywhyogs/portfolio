import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { listPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Postmortems and technical write-ups from building ShopFlow and other production-style systems on Azure.",
};

export default async function WritingIndex() {
  const posts = await listPosts();

  return (
    <>
      <Nav />
      <main className="flex-1 pt-14">
        <section className="max-w-3xl mx-auto px-6 py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-8"
          >
            <ArrowLeft className="size-3.5" />
            Back to home
          </Link>

          <p className="text-sm font-medium text-[var(--accent)] mb-2">
            Writing
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Postmortems & technical notes
          </h1>
          <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed">
            Real incidents from production-style systems I&apos;ve built, with
            timelines, root cause analysis, and follow-up actions. Every
            failure taught me something — here&apos;s what.
          </p>

          <div className="mt-12 space-y-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                className="block p-6 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-0.5 rounded-md text-xs font-medium border ${
                          post.severity === "Critical"
                            ? "border-red-500/40 bg-red-500/10 text-red-500"
                            : "border-amber-500/40 bg-amber-500/10 text-amber-500"
                        }`}
                      >
                        {post.severity}
                      </span>
                      <span className="text-xs text-[var(--muted-foreground)]">
                        {post.date}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold group-hover:text-[var(--accent)] transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                      Service: {post.service} · Status: {post.status}
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}