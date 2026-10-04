import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  service: string;
  severity: string;
  status: string;
  tags?: string[];
};

const POSTS_DIR = path.join(process.cwd(), "src", "content", "writing");

export async function listPosts(): Promise<PostMeta[]> {
  const files = await fs.readdir(POSTS_DIR);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        service: data.service as string,
        severity: data.severity as string,
        status: data.status as string,
        tags: data.tags as string[] | undefined,
      };
    })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(raw);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);
  const html = processed.toString();
  return {
    meta: {
      slug,
      title: data.title as string,
      date: data.date as string,
      service: data.service as string,
      severity: data.severity as string,
      status: data.status as string,
      tags: data.tags as string[] | undefined,
    },
    html,
  };
}