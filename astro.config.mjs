// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import { SITE_URL } from './site.config.mjs';

/**
 * Families are served from src/assets/fonts/, copied out of their Fontsource
 * packages by `npm run fonts`. Nothing is fetched from a font CDN at build
 * time or at runtime.
 *
 * `optimizedFallbacks` lets Astro derive metric-matched fallback faces via
 * capsize, so the swap from the system sans to Poppins does not shift layout.
 */
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'never',
  integrations: [mdx(), sitemap()],
  /*
    `format: 'file'` emits work/slug.html rather than work/slug/index.html.

    GitHub Pages serves a directory only at its trailing-slash URL, so with the
    default directory format every canonical and every sitemap entry — all
    written without a trailing slash by `trailingSlash: 'never'` — took a 301
    before resolving, and no canonical matched the URL actually served. Flat
    files are served directly at the extensionless path, so the redirect goes
    away and the two agree.
  */
  build: { inlineStylesheets: 'auto', format: 'file' },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Poppins',
      cssVariable: '--font-display',
      optimizedFallbacks: true,
      fallbacks: ['Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      options: {
        variants: [
          { weight: 400, style: 'normal', src: ['./src/assets/fonts/poppins-400.woff2'] },
          { weight: 500, style: 'normal', src: ['./src/assets/fonts/poppins-500.woff2'] },
          { weight: 600, style: 'normal', src: ['./src/assets/fonts/poppins-600.woff2'] },
          { weight: 700, style: 'normal', src: ['./src/assets/fonts/poppins-700.woff2'] },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'DM Sans',
      cssVariable: '--font-body',
      optimizedFallbacks: true,
      fallbacks: ['Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      options: {
        variants: [
          {
            weight: '100 1000',
            style: 'normal',
            src: ['./src/assets/fonts/dm-sans-var.woff2'],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      optimizedFallbacks: true,
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./src/assets/fonts/plex-mono-400.woff2'],
          },
        ],
      },
    },
  ],
});
