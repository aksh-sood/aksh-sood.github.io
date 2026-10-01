import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob, file } from 'astro/loaders';

/**
 * Lists live in collections; singletons (site.json, home.json, toolbox.json) are
 * imported directly through src/data.ts, which validates them with the same
 * kind of schema. Either way a bad content edit fails the build rather than
 * shipping a broken page.
 */

const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '**/*.md' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    location: z.string(),
    start: z.string(),
    end: z.string(),
    /** Ascending: 1 is the earliest role, so the promotion path reads upward. */
    order: z.number().int(),
  }),
});

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    /** One line for the home page index row. Roman, not italic. */
    summary: z.string(),
    /** The italic standfirst, case-study page only. */
    standfirst: z.string(),
    period: z.string(),
    stack: z.array(z.string()).nonempty(),
    order: z.number().int(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: file('./src/content/projects.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    tagline: z.string(),
    stack: z.array(z.string()).nonempty(),
    demo: z.string().nullable().default(null),
    repo: z.string().nullable().default(null),
    featured: z.boolean().default(false),
    order: z.number().int(),
  }),
});

const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { experience, work, projects, notes };
