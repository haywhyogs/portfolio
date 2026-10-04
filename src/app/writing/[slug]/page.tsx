import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { getPost, listPosts } from "@/lib/posts";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = await listPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await getPost(slug);
  return {
    title: meta.title,
    description: `Postmortem: ${meta.title} — ${meta.service}, ${meta.severity} severity`,
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;

  let meta, html;
  try {
    ({ meta, html } = await getPost(slug));
  } catch {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="flex-1 pt-14">
        <article className="max-w-3xl mx-auto px-6 py-16">
          <Link
            href="/writing"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-8"
          >
            <ArrowLeft className="size-3.5" />
            All writing
          </Link>

          <header className="mb-10 pb-8 border-b border-[var(--border)]">
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`px-2 py-0.5 rounded-md text-xs font-medium border ${
                  meta.severity === "Critical"
                    ? "border-red-500/40 bg-red-500/10 text-red-500"
                    : "border-amber-500/40 bg-amber-500/10 text-amber-500"
                }`}
              >
                {meta.severity}
              </span>
              <span className="text-xs text-[var(--muted-foreground)]">
                {meta.date}
              </span>
              <span className="text-xs text-[var(--muted-foreground)]">
                · {meta.service}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              {meta.title}
            </h1>
          </header>

          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </main>
      <Footer />
    </>
  );
}