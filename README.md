# Portfolio — Ayodeji Ogunsola

Personal portfolio site showcasing production-style cloud engineering projects.

**Live:** https://haywhyogs.netlify.app

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Radix UI primitives
- Markdown (via `remark` + `remark-gfm`)

## Local development

```bash
NODE_ENV=development npm install --include=dev
npm run dev
```

Visit `http://localhost:3000`.

## Deploy

Hosted on Netlify. Configuration in `netlify.toml`. Pushes to `main` auto-deploy.

## Content

- `src/lib/projects.ts` — project metadata (ShopFlow, cloud-native-project-1)
- `src/lib/skills.ts` — skill taxonomy with project attribution
- `src/lib/posts.ts` — post loader (reads `src/content/writing/*.mdx`)
- `src/content/writing/*.mdx` — postmortem posts

Images are sourced from the `shopflow` and `cloud-native-project-1` repos
and copied into `public/images/` during development.