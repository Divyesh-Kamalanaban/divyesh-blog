import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react(), mdx({ remarkPlugins: [remarkGfm] })],
  vite: {
    plugins: [tailwindcss()]
  },
  site: undefined,
});
