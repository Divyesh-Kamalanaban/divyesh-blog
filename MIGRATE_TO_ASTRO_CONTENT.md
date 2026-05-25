Migration to official Astro Content (ready-to-apply)

Summary
- This document prepares a complete, ready-to-apply migration from the current Vite/glob-based loader and shim to real `astro:content` usage.
- Because `@astro/content` is not available in your environment (registry 404), the patch below is not applied automatically. Install `@astro/content` first and then follow the steps.

Prerequisites
1. Ensure your npm registry can access the public registry. Example:

```bash
npm config get registry
# if not https://registry.npmjs.org/ then set it:
npm config set registry https://registry.npmjs.org/
```

2. Install the package:

```bash
npm install @astro/content --save-dev
```

If installation fails in your environment, you can also install from a Git URL or tarball if you have one.

What this migration does (high level)
- Add `src/content/config.ts` using `defineCollection` and Zod schemas.
- Replace all uses of `src/astroContentShim.ts` with `import { getCollection, getEntry } from 'astro:content'`.
- Remove `src/astroContentShim.ts` and `src/content.config.js` and the `import.meta.glob`-based loader from `src/content.config.ts` (or convert that file to only export helper types if you want to keep it as reference).
- Update Astro pages and React mounting to use `astro:content` results.
- Remove stale SPA bootstrap (`index.html` script) and optionally remove `src/main.tsx` and `src/App.tsx`.

Ready-to-apply patch
Below are the main file changes to apply AFTER installing `@astro/content` (apply as a single patch or run the edits sequentially). Replace placeholders as needed.

1) Create `src/content/config.ts` (new file):

```ts
import { z } from 'zod';
import { defineCollection, z as zod } from 'astro:content';

const blogSchema = zod.object({
  id: zod.string(),
  title: zod.string(),
  slug: zod.string(),
  date: zod.string(),
  readingTime: zod.string().optional(),
  category: zod.string().optional(),
  excerpt: zod.string().optional(),
  tags: zod.array(zod.string()).optional(),
});

const byteSchema = zod.object({
  id: zod.string(),
  type: zod.enum(['snippet', 'thought', 'discovery', 'devlog', 'quote']),
  title: zod.string(),
  date: zod.string().optional(),
  fileName: zod.string().optional(),
  content: zod.string().optional(),
  code: zod.string().optional(),
  link: zod.string().optional(),
  tags: zod.array(zod.string()).optional(),
  quoteText: zod.string().optional(),
  quoteAuthor: zod.string().optional(),
});

export const collections = {
  blog: defineCollection({ schema: blogSchema }),
  bytes: defineCollection({ schema: byteSchema }),
};
```

2) Remove the old import.meta.glob loader from `src/content.config.ts`.
- Option A: delete the loader code and keep the file with helper types and export the Zod schemas if you want.
- Option B: remove the file entirely if you don't need it.

3) Replace `src/astroContentShim.ts` usage in pages with `astro:content`:
- Example change for `src/pages/posts.astro`:

```diff
-import { getCollection } from '../astroContentShim.js';
-const blogPosts = await getCollection('blog');
+import { getCollection } from 'astro:content';
+const blogPosts = await getCollection('blog');
```

- Example for `[slug].astro`:

```diff
-import { getEntry } from '../../astroContentShim.js';
-const post = await getEntry('blog', slug);
+import { getEntry } from 'astro:content';
+const post = await getEntry({ collection: 'blog', slug });
```

4) Update types and imports for `getCollection` return types if needed. With `@astro/content` the returned entries have typed data and `render()` helpers.

5) Remove `src/astroContentShim.ts` and `src/content.config.js` once pages compile with `astro:content`.

6) Optional: Remove old Vite-only files
- `src/content.config.ts` (if fully replaced)
- `src/content.config.js`
- `src/astroContentShim.ts`
- `src/main.tsx`, `src/App.tsx` (if you want a pure Astro site)

7) Run type-check and build

```bash
npm run lint
npm run build
```

Notes and tips
- `getCollection('blog')` returns `CollectionEntry<'blog'>[]`. Each entry usually has `id`, `slug`, `data` (the frontmatter), and `body` or `render()` depending on configuration.
- For rendering markdown content server-side, use `const rendered = await entry.render();` then insert `rendered.html`.
- Keep `zod` schemas in `src/content/config.ts` to get strong typing in dev-time.

If you want, I can now prepare the exact apply_patch edits and keep them in a patch file here (do you want that?), or I can try installing `@astro/content` again if you change the npm registry or provide a tarball/git URL.

---

If you want the exact git-style patch file now, reply "create patch" and I will generate a single patch file (`ASTRO_CONTENT_CONVERSION.patch`) that you can apply with `git apply` after installing `@astro/content`.
