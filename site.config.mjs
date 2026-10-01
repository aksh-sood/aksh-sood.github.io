/**
 * The one place the deployed origin is defined.
 *
 * Consumed by astro.config.mjs (for `site`, which drives canonical URLs, the
 * sitemap, RSS and the absolute og:image URLs) and re-exported through
 * src/consts.ts for use in components.
 *
 * Resolution order:
 *
 *   1. SITE_URL            — set this once a real domain is registered.
 *   2. the host's own build-time variable — Vercel, Netlify and Cloudflare
 *                            Pages each inject one. Means a fresh deploy gets
 *                            correct canonicals and working link previews with
 *                            no configuration at all.
 *   3. the placeholder     — local builds only.
 *
 * The Terraform module in infra/ takes the same value as its `domain_name`
 * variable; set SITE_URL explicitly when deploying that way.
 */
const explicit = process.env.SITE_URL;

// Whichever host is building. Netlify's URL and Cloudflare's CF_PAGES_URL
// already include the scheme; Vercel's does not.
const fromHost =
  process.env.URL ??                            // Netlify
  process.env.CF_PAGES_URL ??                   // Cloudflare Pages
  (process.env.VERCEL_PROJECT_PRODUCTION_URL    // Vercel
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

// [CONFIRM: no custom domain registered yet — this is the GitHub Pages user site.
//  When a domain is bought, change this and add public/CNAME.]
const PLACEHOLDER = 'https://aksh-sood.github.io';

export const SITE_URL = (explicit ?? fromHost ?? PLACEHOLDER).replace(/\/$/, '');
