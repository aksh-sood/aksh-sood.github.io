import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { site } from '../../data';
import { SITE_DESCRIPTION } from '../../consts';

/**
 * Typographic Open Graph cards, rendered at build time.
 *
 * Satori reads neither woff2 nor variable fonts, so it uses the static
 * instances written by `npm run fonts` into src/assets/fonts/og/. Those are
 * build-only and never served to a browser.
 */

// Resolved from the project root: import.meta.url is rebased into the build
// output bundle, so it does not point at src/ by the time this runs.
const FONT_DIR = join(process.cwd(), 'src/assets/fonts/og');

const [display, mono] = await Promise.all([
  readFile(join(FONT_DIR, 'poppins-700.woff')),
  readFile(join(FONT_DIR, 'plex-mono.ttf')),
]);

// Mirrors tokens.css. Kept as literals because satori runs outside the CSS.
const PAPER = '#141414';
const INK = '#FFFFFF';
const MUTED = '#A3A3A3';
const RULE = '#2B2B2B';
const ACCENT = '#F5821F';

export const getStaticPaths = (async () => {
  const work = await getCollection('work', ({ data }) => !data.draft);
  const notes = await getCollection('notes', ({ data }) => !data.draft);

  return [
    { params: { route: 'default' }, props: { title: SITE_DESCRIPTION, kind: '' } },
    {
      params: { route: 'notes' },
      props: { title: 'Writing', kind: 'Notes' },
    },
    ...work.map((entry) => ({
      params: { route: `work/${entry.id}` },
      props: { title: entry.data.title, kind: 'Case study' },
    })),
    ...notes.map((note) => ({
      params: { route: `notes/${note.id}` },
      props: { title: note.data.title, kind: 'Note' },
    })),
  ];
}) satisfies GetStaticPaths;

const text = (content: string, style: Record<string, unknown>) => ({
  type: 'div',
  props: { style, children: content },
});

export const GET: APIRoute = async ({ props }) => {
  const { title, kind } = props as { title: string; kind: string };

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: PAPER,
          fontFamily: 'Poppins',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 24,
                borderBottom: `1px solid ${RULE}`,
                fontFamily: 'IBM Plex Mono',
                fontSize: 22,
                color: MUTED,
              },
              children: [
                text(site.name, { display: 'flex', color: INK }),
                text(kind, { display: 'flex' }),
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      width: 72,
                      height: 4,
                      marginBottom: 28,
                      background: ACCENT,
                    },
                  },
                },
                text(title, {
                  display: 'flex',
                  fontSize: title.length > 70 ? 50 : 62,
                  fontWeight: 700,
                  lineHeight: 1.12,
                  letterSpacing: '-0.02em',
                  color: INK,
                }),
              ],
            },
          },
          text(`${site.role}, ${site.company}`, {
            display: 'flex',
            fontFamily: 'IBM Plex Mono',
            fontSize: 22,
            color: MUTED,
          }),
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Poppins', data: display, weight: 700, style: 'normal' },
        { name: 'IBM Plex Mono', data: mono, weight: 400, style: 'normal' },
      ],
    },
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
