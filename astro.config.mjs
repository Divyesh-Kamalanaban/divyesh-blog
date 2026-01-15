// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mermaid from 'astro-mermaid';
import { use } from 'react';

// https://astro.build/config
export default defineConfig({
  site: 'https://divyesh.is-cool.dev',
  integrations: [mdx(), sitemap(), react(), mermaid({
  // Default theme: 'default', 'dark', 'forest', 'neutral', 'base'
  theme: 'forest',
  
  // Enable automatic theme switching based on data-theme attribute
  autoTheme: true,
  
  // Additional mermaid configuration
  mermaidConfig: {
    useMaxWidth: false,
    flowchart: {
      curve: 'basis',
      useMaxWidth: false
    }
  },
  
  // Register icon packs for use in diagrams
  iconPacks: [
    {
      name: 'logos',
      loader: () => fetch('https://unpkg.com/@iconify-json/logos@1/icons.json').then(res => res.json())
    },
    {
      name: 'iconoir',
      loader: () => fetch('https://unpkg.com/@iconify-json/iconoir@1/icons.json').then(res => res.json())
    }
  ]
})],

  vite: {
    plugins: [tailwindcss()],
  },
});