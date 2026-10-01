import { z } from 'zod';

import siteJson from './content/site.json';
import homeJson from './content/home.json';
import toolboxJson from './content/toolbox.json';
import servicesJson from './content/services.json';
import pricingJson from './content/pricing.json';

/**
 * Singleton content. Validated at build time for the same reason the
 * collections are: a typo in a JSON file should fail the build, not ship.
 *
 * Several fields are nullable on purpose. The reference template has slots the
 * source material cannot fill — a projects-completed count, a client count, two
 * photographs, a video. Those carry `null` plus a `confirm`/`add` string, and
 * the components render that string visibly rather than inventing a figure.
 */

const siteSchema = z.object({
  name: z.string(),
  role: z.string(),
  company: z.string(),
  availability: z.string(),
  location: z.string(),
  email: z.email(),
  github: z.url(),
  linkedin: z.url(),
  resume: z.string(),
  education: z.object({
    degree: z.string(),
    school: z.string(),
    period: z.string(),
    note: z.string(),
  }),
  /** `url` is the public credential page, where one exists. */
  certifications: z
    .array(z.object({ name: z.string(), url: z.url().optional() }))
    .nonempty(),
});

const ctaSchema = z.object({ label: z.string(), href: z.string() });

const homeSchema = z.object({
  hero: z.object({
    greeting: z.string(),
    emoji: z.string(),
    name: z.string(),
    /** Cycled by the typewriter. First entry is what renders without script. */
    roles: z.array(z.string()).nonempty(),
    blurb: z.string(),
    cta: ctaSchema,
    portrait: z.string().nullable().default(null),
  }),
  stats: z
    .array(
      z.object({
        value: z.string().nullable(),
        suffix: z.string().default(''),
        caption: z.string(),
        confirm: z.string().optional(),
      }),
    )
    .nonempty(),
  clients: z.object({
    value: z.string().nullable(),
    label: z.string(),
    confirm: z.string().optional(),
  }),
  statsBody: z.string(),
  statsCta: ctaSchema,
  media: z
    .array(
      z.object({
        id: z.string(),
        kind: z.enum(['video', 'image']),
        caption: z.string(),
        src: z.string().nullable().default(null),
        add: z.string().optional(),
      }),
    )
    .nonempty(),
  opening: z.string(),
  figures: z
    .array(
      z.object({
        value: z.string(),
        caption: z.string(),
        /** Exactly one figure may carry the accent. */
        marked: z.boolean().default(false),
      }),
    )
    .min(3)
    .max(4),
  about: z.array(z.string()).nonempty(),
});

const toolboxSchema = z.object({
  groups: z
    .array(z.object({ label: z.string(), items: z.array(z.string()).nonempty() }))
    .nonempty(),
});

const servicesSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  confirm: z.string().optional(),
  items: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        body: z.string(),
        tags: z.array(z.string()).nonempty(),
      }),
    )
    .nonempty(),
});

const pricingSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  confirm: z.string().optional(),
  tiers: z.array(
    z.object({
      name: z.string(),
      price: z.string(),
      body: z.string(),
      includes: z.array(z.string()),
    }),
  ),
});

export const site = siteSchema.parse(siteJson);
export const home = homeSchema.parse(homeJson);
export const toolbox = toolboxSchema.parse(toolboxJson);
export const services = servicesSchema.parse(servicesJson);
export const pricing = pricingSchema.parse(pricingJson);
