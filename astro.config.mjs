// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './src/lib/remark.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.jee-eun-k.dev',
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'gruvbox-dark-medium',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap(),
    mdx({
      optimize: true,
      syntaxHighlight: 'shiki',
    }),
  ],
  experimental: {
    fonts: [
      {
        name: 'Inter',
        cssVariable: '--font-inter',
        provider: 'local',
        variants: [
          { src: ['./src/assets/fonts/Inter-Regular.woff2'], weight: 400, style: 'normal' },
          { src: ['./src/assets/fonts/Inter-Medium.woff2'], weight: 500, style: 'normal' },
          { src: ['./src/assets/fonts/Inter-SemiBold.woff2'], weight: 600, style: 'normal' },
          { src: ['./src/assets/fonts/Inter-Bold.woff2'], weight: 700, style: 'normal' },
          { src: ['./src/assets/fonts/Inter-ExtraBold.woff2'], weight: 800, style: 'normal' },
          { src: ['./src/assets/fonts/InterVariable.woff2'], weight: 'variable', style: 'normal' },
        ],
      },
      {
        name: 'InterVariable',
        cssVariable: '--font-inter-variable',
        provider: 'local',
        variants: [{ src: ['./src/assets/fonts/InterVariable.woff2'], weight: 'variable', style: 'normal' }],
      },
    ],
  },
});
