/**
 * Copies the faces the site serves out of their Fontsource packages and into
 * src/assets/fonts/, so the build hashes them and they earn an immutable cache.
 * Nothing is fetched from a font CDN at build time or at runtime.
 *
 * Run after `npm install` or after changing a weight: `npm run fonts`.
 */
import { copyFile, mkdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const root = process.cwd();
const web = join(root, 'src/assets/fonts');
// Satori reads neither woff2 nor variable fonts, so the OG cards get their own
// static copies. These are build-only and never served to a browser.
const og = join(web, 'og');

const files = [
  ['@fontsource/poppins/files/poppins-latin-400-normal.woff2', `${web}/poppins-400.woff2`],
  ['@fontsource/poppins/files/poppins-latin-500-normal.woff2', `${web}/poppins-500.woff2`],
  ['@fontsource/poppins/files/poppins-latin-600-normal.woff2', `${web}/poppins-600.woff2`],
  ['@fontsource/poppins/files/poppins-latin-700-normal.woff2', `${web}/poppins-700.woff2`],
  ['@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2', `${web}/dm-sans-var.woff2`],
  ['@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2', `${web}/plex-mono-400.woff2`],
  ['@fontsource/poppins/files/poppins-latin-700-normal.woff', `${og}/poppins-700.woff`],
];

await mkdir(og, { recursive: true });

let total = 0;
for (const [from, to] of files) {
  const src = join(root, 'node_modules', from);
  await mkdir(dirname(to), { recursive: true });
  await copyFile(src, to);
  const { size } = await stat(to);
  total += size;
  console.log(`  ${(size / 1024).toFixed(1).padStart(6)} KB  ${to.replace(root + '/', '')}`);
}
console.log(`\n${files.length} files, ${(total / 1024).toFixed(1)} KB total.`);
