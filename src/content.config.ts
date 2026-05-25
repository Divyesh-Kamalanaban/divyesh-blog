import { Post, Byte } from './types';

// Astro collection definitions mock for structure representing content schemas
export const collections = {
  blog: {
    schema: 'zod validation placeholder'
  },
  bytes: {
    schema: 'zod validation placeholder'
  }
};

// Directly load markdown collections from our separated content sources
const blogMarkdownModules = import.meta.glob('./content/blog/*.md', {
  eager: true,
  import: 'default',
  query: '?raw'
}) as Record<string, string>;

type FrontmatterValue = string | string[];
type FrontmatterMap = Record<string, FrontmatterValue>;

const byteMarkdownModules = import.meta.glob('./content/bytes/*.md', {
  eager: true,
  import: 'default',
  query: '?raw'
}) as Record<string, string>;

const parseFrontmatter = (raw: string): { frontmatter: FrontmatterMap; body: string } => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: raw.trim() };
  }

  const [, frontmatterText, body] = match;
  const frontmatter: FrontmatterMap = {};

  frontmatterText.split('\n').forEach((line) => {
    const separator = line.indexOf(':');
    if (separator === -1) {
      return;
    }

    const key = line.slice(0, separator).trim();
    const valueText = line.slice(separator + 1).trim();
    if (!key || !valueText) {
      return;
    }

    if (valueText.startsWith('[') && valueText.endsWith(']')) {
      try {
        frontmatter[key] = JSON.parse(valueText) as string[];
      } catch {
        frontmatter[key] = [];
      }
      return;
    }

    if (
      (valueText.startsWith('"') && valueText.endsWith('"')) ||
      (valueText.startsWith("'") && valueText.endsWith("'"))
    ) {
      frontmatter[key] = valueText.slice(1, -1);
      return;
    }

    frontmatter[key] = valueText;
  });

  return {
    frontmatter,
    body: body.trim()
  };
};

const parseByteMarkdown = (path: string, raw: string): Byte => {
  const { frontmatter, body } = parseFrontmatter(raw);
  const fileSlug = path.split('/').pop()?.replace('.md', '') ?? 'byte';

  const type = (frontmatter.type as Byte['type']) ?? 'thought';
  const id = (frontmatter.id as string) ?? fileSlug;
  const title = (frontmatter.title as string) ?? fileSlug;
  const date = (frontmatter.date as string) ?? '';

  const byte: Byte = {
    id,
    type,
    title,
    date,
    fileName: frontmatter.fileName as string | undefined,
    link: frontmatter.link as string | undefined,
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : undefined,
    subtitle: frontmatter.subtitle as string | undefined,
    quoteText: frontmatter.quoteText as string | undefined,
    quoteAuthor: frontmatter.quoteAuthor as string | undefined
  };

  if (type === 'snippet') {
    const codeMatch = body.match(/```[\w-]*\n([\s\S]*?)```/);
    byte.code = codeMatch?.[1]?.trim() ?? body;
  } else if (type !== 'quote') {
    byte.content = body;
  }

  return byte;
};

const parsePostMarkdown = (path: string, raw: string): Post => {
  const { frontmatter, body } = parseFrontmatter(raw);
  const fileSlug = path.split('/').pop()?.replace('.md', '') ?? 'post';
  const slug = (frontmatter.slug as string) ?? fileSlug;

  return {
    id: (frontmatter.id as string) ?? slug,
    title: (frontmatter.title as string) ?? fileSlug,
    slug,
    date: (frontmatter.date as string) ?? '',
    readingTime: (frontmatter.readingTime as string) ?? '',
    category: (frontmatter.category as Post['category']) ?? 'Devlog',
    excerpt: (frontmatter.excerpt as string) ?? '',
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    content: body
  };
};

const postsSortByDate = (a: Post, b: Post): number => {
  const aDate = Date.parse(a.date);
  const bDate = Date.parse(b.date);

  if (Number.isNaN(aDate) || Number.isNaN(bDate)) {
    return b.id.localeCompare(a.id);
  }

  return bDate - aDate;
};

const bytesSortById = (a: Byte, b: Byte): number => {
  const aId = Number(a.id.replace(/[^0-9]/g, ''));
  const bId = Number(b.id.replace(/[^0-9]/g, ''));

  if (Number.isNaN(aId) || Number.isNaN(bId)) {
    return b.id.localeCompare(a.id);
  }

  return bId - aId;
};

export const bytesList: Byte[] = Object.entries(byteMarkdownModules)
  .map(([path, raw]) => parseByteMarkdown(path, raw))
  .sort(bytesSortById);

export const blogPosts: Post[] = Object.entries(blogMarkdownModules)
  .map(([path, raw]) => parsePostMarkdown(path, raw))
  .sort(postsSortByDate);
