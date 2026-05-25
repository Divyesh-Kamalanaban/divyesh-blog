/// <reference path="../.astro/content.d.ts" />
import { defineCollection } from 'astro/content/config';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  readingTime: z.string().optional(),
  category: z.string().optional(),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const byteSchema = z.object({
  type: z.enum(['snippet', 'thought', 'discovery', 'devlog', 'quote']),
  title: z.string(),
  date: z.string().optional(),
  fileName: z.string().optional(),
  content: z.string().optional(),
  code: z.string().optional(),
  link: z.string().optional(),
  tags: z.array(z.string()).optional(),
  quoteText: z.string().optional(),
  quoteAuthor: z.string().optional(),
});

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: blogSchema
  }),
  bytes: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/bytes' }),
    schema: byteSchema
  }),
};

export default collections;
