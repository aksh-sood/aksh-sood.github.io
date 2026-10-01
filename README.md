# aksh sood — personal site

An Astro site. Static output, no client-side framework, three self-hosted
typefaces, and content in structured files so copy can change without touching
layout.

Dark ground, orange accent, rounded cards and a floating pill nav — rebuilt on
2026-09-27 from a commercial portfolio template the owner supplied as a
screenshot. The previous "engineering notebook" build (warm paper, Newsreader,
oxblood, zero JavaScript) is preserved verbatim in `.backup-notebook-ui/`.

`CLAUDE.md` is the working agreement — design tokens, the content rules, and the
one Astro scoping trap that has caused three separate bugs here. `PRD.md` is the
requirements and the open-questions list. Read `CLAUDE.md` before changing
anything visual.

**Seven panels on the page are unfilled slots**, not finished content — the
template asks for figures and images the source material does not have. They
render as visible `CONFIRM` / `ADD` markers. See `PRD.md` § 10a, or:

```bash
npm run build && grep -c 'data-slot' dist/index.html
```

---

## Running it

**Needs:** Node 22 or newer (`node -v`). Nothing else — no database, no env
vars, no API keys. `npm run fonts` additionally wants Python 3, but you will
almost never run it; see [The fonts](#the-fonts).

```bash
git clone <repo> && cd personal-website
npm install
npm run dev          # http://localhost:4321
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built output, for Lighthouse or a final look |
| `npm run check` | Type-check and validate every content schema |
| `npm run fonts` | Re-subset the typefaces (only after upgrading the font packages) |

Run `npm run check` before committing. Content is schema-validated, so a typo
in a JSON or frontmatter field fails the build rather than shipping.

---

## Project structure

```
personal-website/
├── CLAUDE.md               working agreement: tokens, content rules, the scoping trap
├── GITHUB-PROFILE.md       brief for an agent to bring github.com/aksh-sood in line
├── PRD.md                  requirements, decisions, and the open-questions list
├── README.md               this file
├── astro.config.mjs        integrations, static output, the three font families
├── site.config.mjs         SITE_URL — the only place the domain is written
├── vercel.json             build config, cache and security headers
│
├── public/                 served verbatim at the site root, never processed
│   ├── aksh-sood-resume.pdf
│   ├── favicon.svg
│   └── robots.txt
│
├── scripts/
│   └── fonts.mjs           copies the woff2 out of the Fontsource packages
│
├── .backup-notebook-ui/    the previous build, kept verbatim. Not wired into anything.
│
├── infra/                  Terraform: S3 + CloudFront + ACM + Route 53
│   ├── main.tf providers.tf variables.tf outputs.tf versions.tf
│   ├── terraform.tfvars.example
│   ├── deploy.sh           sync dist/ and invalidate
│   ├── README.md
│   └── modules/static-site/  the reusable module
│
└── src/
    ├── consts.ts           site title, description, nav items
    ├── data.ts             loads and validates the five JSON singletons
    ├── content.config.ts   Zod schemas for the four collections
    │
    ├── content/            ← all copy lives here
    │   ├── site.json  home.json  toolbox.json  projects.json
    │   ├── services.json  pricing.json
    │   ├── experience/*.md
    │   ├── work/*.mdx      case studies
    │   └── notes/*.mdx     writing
    │
    ├── assets/fonts/       woff2, processed and hashed by the build
    │   └── og/             static faces for satori, build-time only, never served
    │
    ├── layouts/
    │   └── Base.astro      <head>, meta, JSON-LD, font preloads, skip link
    │
    ├── components/
    │   ├── Header.astro    the floating pill nav, its menu and disclosure
    │   ├── Hero.astro      name, typewriter, CTA, socials, the yellow slab
    │   ├── Stats.astro     the orange counters and the client block
    │   ├── MediaRow.astro  the two media tiles
    │   ├── Figures.astro   the four real outcome figures
    │   ├── Services.astro  Pricing.astro  Work.astro  Projects.astro
    │   ├── Experience.astro Toolbox.astro Writing.astro About.astro Footer.astro
    │   ├── Section.astro   the eyebrow + heading + body every section uses
    │   ├── Slot.astro      renders an unfilled CONFIRM / ADD panel
    │   ├── Icon.astro      line icons — sizes itself, see the trap above
    │   ├── Sparkle.astro   the decorative star — positions itself, likewise
    │   └── diagrams/       one hand-authored SVG component per case study
    │
    ├── styles/
    │   ├── tokens.css      every colour, size and space. Start here.
    │   ├── base.css        reset, element defaults, buttons, cards, focus ring
    │   ├── prose.css       long-form layout for MDX
    │   └── diagram.css     shared SVG chrome
    │
    └── pages/              routes
        ├── index.astro         /
        ├── 404.astro           /404
        ├── work/[id].astro     /work/<slug>
        ├── notes/index.astro   /notes
        ├── notes/[id].astro    /notes/<slug>
        ├── og/[...route].png.ts  generates every Open Graph card
        └── rss.xml.ts          /rss.xml
```

Three rules hold this together:

1. **Layouts contain no copy.** If you are editing words, you are in
   `src/content/`. If you are editing how words look, you are in
   `src/styles/` or a component.
2. **Nothing hardcodes a colour, size or space.** They are all tokens in
   `tokens.css`. Adding a value means adding a token.
3. **The domain is written twice**, in `site.config.mjs` and
   `infra/terraform.tfvars`. Nowhere else.

---

## Assets

Two places, and the difference matters.

### `public/` — copied as-is

Files keep their exact name and land at the site root. Use it for anything that
needs a stable, predictable URL.

| File | Served at | Notes |
|---|---|---|
| `aksh-sood-resume.pdf` | `/aksh-sood-resume.pdf` | Path is set in `site.json` → `resume` |
| `favicon.svg` | `/favicon.svg` | Linked from `Base.astro` |
| `robots.txt` | `/robots.txt` | Update the sitemap URL when the domain changes |

Nothing here is optimised, hashed, or cache-busted — change a file and the old
one may stay in a browser cache. That is the trade for a stable URL.

### `src/assets/` — processed by the build

Files here are optimised, content-hashed and emitted into `/_astro/`. Use it for
anything the pages reference, which is how those files earn a one-year immutable
cache header.

Currently it holds only the fonts. **To add the FleetPulse screenshot** (open
question #4), put the image here and use Astro's `<Image>` so it gets sized and
converted:

```astro
---
import { Image } from 'astro:assets';
import fleetpulse from '../assets/fleetpulse.png';
---
<Image src={fleetpulse} alt="The FleetPulse driver portal" width={640} />
```

Then delete the `[ADD: screenshot]` placeholder block in
`src/components/Projects.astro`.

### Open Graph images

Not files — they are generated at build time by `src/pages/og/[...route].png.ts`
and written to `dist/og/`. One per page, rendered with satori from the static
TTFs in `src/assets/fonts/og/`. A new case study gets a card automatically; you
never add an image by hand. To change how they look, edit that one file.

### Diagrams

Not image files either. They are hand-authored Astro components in
`src/components/diagrams/`, written as inline SVG so they inherit the theme
tokens and stay crisp at any zoom. See
[Adding a case study](#adding-a-case-study).

The DR topology diagram is the one interactive thing on the site: a **Simulate
failover** toggle that repoints the endpoint from Oregon to London so you can
watch that only the endpoint moves. It is a checkbox plus CSS sibling
selectors — no JavaScript, no hydration, about 5KB — and it is keyboard
operable and announced as a toggle because the control is a real checkbox.
Both visual states are authored into the SVG and swapped with `display`, since
CSS cannot rewrite the text inside an SVG node.

### The favicon

`public/favicon.svg` is the nav wordmark's glyph — the orange A and its swoosh
on the page ground. SVG only — current Chrome, Firefox,
Edge and Safari all read SVG favicons. Very old Safari falls back to no icon
rather than a broken one; add a `favicon.ico` alongside it if that matters.

---

## Editing content

Everything a person would want to change lives in `src/content/`. No layout file
contains copy.

| File | Holds |
|---|---|
| `site.json` | Name, role, availability line, email, links, résumé path, education, certifications |
| `home.json` | The opening statement, the four headline figures, the About paragraphs |
| `toolbox.json` | The grouped skill lists |
| `projects.json` | The AI projects list |
| `experience/*.md` | One file per role — frontmatter plus first-person prose |
| `work/*.mdx` | The case studies |
| `notes/*.mdx` | Writing |

Every file is validated against a schema (`src/content.config.ts` for the
collections, `src/data.ts` for the three JSON singletons). A typo fails the
build rather than shipping — that is intentional, so run `npm run check` after
editing.

### The figures

`home.json` → `figures`. Three or four entries, each `value` plus `caption`.
Keep values short — six characters or so. They are set at display size in
tabular mono, and a long value will not hold in a four-up row.

Exactly one figure may carry `"marked": true`, which gives it the orange fill. The
accent is budgeted at two elements per viewport across the whole site, so
marking a second figure is a design regression, not a preference.

### Adding a case study

Create `src/content/work/<slug>.mdx`:

```mdx
---
title: What it was
summary: One line for the home page index row.
standfirst: The italic line under the title on the case study page.
period: "2025"
stack: [Terraform, EKS]
order: 4
---

## Context
## Constraint
## What I did
## Outcome
```

The four `##` headings sit in the notebook margin beside their first paragraph
at wide sizes — that is what the grid is for, so keep the structure.

A diagram is a hand-authored Astro component in `src/components/diagrams/`,
imported at the top of the MDX and dropped in as a tag. Line art only:
`.diagram__art` for ink, `.diagram__accent` for the single emphasised path.
Set `period` in quotes if it is a bare year, or YAML reads it as a number.

### Editing a role

One file per role in `src/content/experience/`, frontmatter plus prose:

```md
---
role: Senior DevSecOps Engineer
company: Baton Systems
location: Remote, India
start: Apr 2026
end: Present
order: 4
---

First person, short sentences, no resume voice.
```

`order` is **ascending — 1 is the earliest role.** The page renders newest
first and derives the promotion path from it, so a new role gets the next
number up, not a renumbering of everything below it. Dates are free text, so
they read the way you would say them.

### Adding a note

Create `src/content/notes/<slug>.mdx` with `title`, `description`, `date` and
`draft`. Drafts do not render and do not appear in the feed. While no note is
published, `/notes` shows an empty state naming what is coming, and the home
page omits the writing section entirely.

### Placeholders

Placeholders are deliberate — they are unanswered questions, listed in
`PRD.md`, rendered visibly so they cannot be forgotten. There are two kinds.

**Template slots** (`<Slot kind="CONFIRM|ADD">`) are the panels the reference
layout asks for and the source material cannot fill. They carry their note in
`src/content/*.json` as a `confirm` or `add` field, and a component renders that
note rather than inventing a figure. Fill one by supplying the real value next
to the note:

```jsonc
// src/content/home.json — before
{ "value": null, "suffix": "+", "caption": "Projects completed",
  "confirm": "Projects-completed count. …" }

// after: drop the confirm, supply the value
{ "value": "12", "suffix": "+", "caption": "Projects completed" }
```

**Inline markers** — `[ADD: ...]`, `[CONFIRM: ...]`, `[PERSONAL DETAIL]` — are
the older style, still used in prose and in `projects.json`.

Find both before treating the site as finished:

```bash
grep -rn "\[ADD:\|\[CONFIRM:\|PERSONAL DETAIL" src/
npm run build && grep -o 'data-slot="[A-Z]*"' dist/index.html | sort | uniq -c
```

---

## Design

Tokens are in `src/styles/tokens.css`. Nothing else may hardcode a colour, a
size, or a space.

- **Ground and ink** — `#141414` page, `#1e1e1e` cards, white headings,
  `#a3a3a3` body copy. The accent is a single vivid orange `#f5821f`, with
  `#f7b32b` for the yellow slab behind the portrait.
- **Dark only.** The reference template is drawn that way, so there is no light
  palette and no theme toggle. The previous build's light tokens are in
  `.backup-notebook-ui/src/styles/tokens.css` if they are ever wanted back.
- **Type** — Poppins 600/700 for headings, the nav and the counters; DM Sans for
  prose; IBM Plex Mono for diagram labels, dates and stack lists. All three
  self-hosted, all OFL.
- **Shape** — rounded cards (`--radius-md`), a pill nav, and a cut top-right
  corner on buttons (`--notch`, done with `clip-path`). Structure comes from
  cards and the eyebrow/heading pair, not from hairlines.

### The one trap to know about

**Astro does not apply a parent's scoped styles to a child component's root
element.** A rule like `.hero__spark { top: 12% }` written in `Hero.astro` will
not touch the `<svg>` that `Sparkle.astro` renders — it compiles to
`.hero__spark[data-astro-cid-hero]`, and the svg only carries Sparkle's own cid.

This bit three times during the rebuild, each time as CSS that looked correct in
the source and silently did nothing:

| Symptom | Cause |
|---|---|
| Sparkles piled up in the middle of the hero | `.hero__spark { top/right }` never matched |
| "Let's Talk" arrow filled the whole nav pill | `.talk__arrow { width }` never matched, so the svg defaulted to 100% |
| Portrait slot text sat at 1.3:1 on the yellow slab | `.panel__slot { background }` never matched |

The fix in every case was to move the property onto the component that owns the
element, as a prop: `<Sparkle top="12%" />`, `<Icon size="0.8rem" />`,
`<Slot tone="panel" />`. Do that rather than reaching for `:global()`.

### The fonts

`npm run fonts` copies the faces out of their Fontsource packages into
`src/assets/fonts/`. The output is committed, so a normal build does not need
the script — re-run it only after upgrading `@fontsource/poppins`,
`@fontsource-variable/dm-sans` or `@fontsource/ibm-plex-mono`.

It also writes a static `.woff` to `src/assets/fonts/og/`, because satori —
which renders the Open Graph cards at build time — reads neither woff2 nor
variable fonts. Those are build-only and never served.

Preloaded: DM Sans, and Poppins 600 and 700. Poppins 400/500 and the mono load
on demand. Fallbacks are metric-matched by Astro via capsize, so the swap costs
no layout shift.

---

## Measured

Lighthouse against the built output (`npm run build && npm run preview`):

| Page | Perf | A11y | Best practices | SEO | Transferred | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 | 91 KB | 0 | 0 ms |

The template build is lighter than the notebook build it replaced (91 KB against
138 KB) because dropping Newsreader removed 176 KB of variable font for three
weights of Poppins at 7.7 KB each.

Also verified against the built output:

- No horizontal overflow at 375 / 768 / 1280 / 1600.
- Every focusable element shows a visible ring — 8 kinds at 1280px, 6 at 375px,
  checked by real `Tab` traversal. (Probing with `element.focus()` from script
  reports false failures: Chrome does not match `:focus-visible` on programmatic
  focus.)
- The mobile menu and the nav disclosure both open by keyboard, expose
  `aria-expanded`, and close on `Escape`.
- Under `prefers-reduced-motion: reduce` the typewriter does not cycle, the
  caret does not blink, and the counter shows its real value without animating.
- **With JavaScript disabled** the role line and the counter still render their
  real values, and the nav is a plain visible list.
- All nine colour pairs meet WCAG AA; the tightest is the hero role line at
  4.0:1 against a 3.0 requirement for its size.
- The DR failover toggle still ships zero JavaScript and still swaps exactly one
  status line.
- No phone number and no client name appear anywhere in `dist/`.

---

## Deploying

### Vercel

`vercel.json` is committed with cache and security headers. Import the repo, or:

```bash
npx vercel --prod
```

Build command `npm run build`, output `dist`. Nothing else to configure.

### AWS, with the Terraform in `infra/`

S3 + CloudFront + ACM + Route 53, with the bucket private behind Origin Access
Control. See `infra/README.md`. Short version:

```bash
cd infra
cp terraform.tfvars.example terraform.tfvars   # fill in domain + zone id
terraform init && terraform apply
cd .. && npm run build && ./infra/deploy.sh
```

`deploy.sh` reads the bucket and distribution from Terraform outputs, uploads
fingerprinted assets before the HTML that references them, sets cache headers
per file class, and invalidates.

### The domain

It is written in exactly two places: `SITE_URL` in `site.config.mjs`, and
`domain_name` in `infra/terraform.tfvars`. Canonical URLs, the sitemap, RSS and
JSON-LD all derive from the first.

---

## Troubleshooting

**`data does not match collection schema`** — a content file has a field the
schema rejects. The error names the file and the field. The usual cause is a
bare year in `period:`, which YAML reads as a number; quote it (`period: "2026"`).

**A note or case study isn't appearing** — check `draft: true` in its
frontmatter. Drafts are excluded from the page, the index, the feed and the OG
generation, by design.

**Fonts look wrong after `npm install`** — the woff2 files in
`src/assets/fonts/` are committed, so this should not happen. If they are
missing, run `npm run fonts`.

**OG images fail to build with `ENOENT`** — the static face in
`src/assets/fonts/og/` is missing. Run `npm run fonts`.

**A page scrolls sideways on mobile** — something escaped the measure. Wide
content (a table, a diagram, a long code block) needs its own
`overflow-x: auto` container; the page body must never scroll horizontally.

**CSS changes seem to have no effect** — two causes, in this order.

1. **You are styling a child component's root element from its parent.** Astro
   does not apply a parent's scope there, so the rule compiles to a selector
   that matches nothing. This is the single most common bug in this repo — see
   "The one trap to know about" above. Move the property onto the component that
   owns the element and pass it as a prop.
2. **Specificity.** A `:nth-child` rule outranks a plain class rule, so a mobile
   rule can silently beat a desktop one. Scope the narrower rule inside its own
   media query rather than reaching for `!important`.

To tell them apart, look at the built HTML: if the element carries a different
`data-astro-cid-*` than the stylesheet's selector expects, it is cause 1.

**An anchor link lands under the nav bar** — the bar is sticky, and
`html { scroll-padding-top: 6rem }` in `base.css` is what clears it. Do not
remove that rule.

---

## Notes

- **`npm audit` reports a moderate advisory in `fflate`, via `satori`.** Both
  are devDependencies used only at build time, and satori only ever parses the
  two local font files this repo generates. Nothing reaches a browser. The fix
  is a breaking satori downgrade, which is not worth taking for this.
- **The résumé PDF at `public/aksh-sood-resume.pdf` contains a phone number.**
  The site itself never prints it, but linking the PDF does publish it. See
  `PRD.md` open questions.
