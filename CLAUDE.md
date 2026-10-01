# CLAUDE.md — working agreement for Aksh Sood's site

This file governs how any Claude session works in this repo. Read it fully before
touching code. `PRD.md` holds the requirements; this file holds the rules.

---

## 1. What this is

A personal portfolio site for **Aksh Sood**, Senior DevSecOps Engineer at Baton Systems.
The audience is hiring managers for **Forward Deployed Engineer / Solutions Engineer /
AI platform** roles.

Design register: **a dark commercial portfolio template**, rebuilt from a reference
screenshot the owner supplied (the "Antux" freelance-portfolio layout). Dark ground,
vivid orange accent, geometric sans, rounded cards, sparkle decoration, a floating
pill nav.

> **History.** This site was previously built in an "engineering notebook" register —
> warm paper, Newsreader, oxblood accent, hairline rules, zero JavaScript. On
> 2026-09-27 the owner asked for the template look instead, was shown the trade-offs,
> and confirmed. That earlier build is preserved verbatim in `.backup-notebook-ui/`.
> Do not revert to it, and do not reintroduce its rules; but do not delete the backup
> either.

---

## 2. Source of truth — UNCHANGED, and it outranks everything below

`PRD.md` § "Content source of truth" is the **only** place facts may come from. These
rules are about factual integrity, not style. **The visual rebuild did not relax any
of them.**

**Never invent a fact.** No invented metrics, dates, client names, technologies, or
project outcomes. If a fact is needed and not in the PRD, add it to the open-questions
checklist at the bottom of `PRD.md` and render a visible `<Slot>` in the page. Do not
guess and do not silently drop it.

Hard content rules:

- **Never name the client.** Always "a global financial market infrastructure provider"
  or "the client". No exceptions, including in alt text, meta tags, commit messages,
  and diagram labels.
- **Never publish the phone number in the site's own pages.** It must not appear in any
  HTML, meta tag, alt text, or JSON-LD. **The linked résumé PDF is out of scope** — it
  carries the number by the owner's decision (2026-10-01). Do not remove the résumé link
  on these grounds, and do not reintroduce the number into the pages.
- Email, GitHub and LinkedIn are public and may be published.
- Resume bullets are **rewritten into first-person prose**. Same facts, shorter
  sentences, no resume voice. Never paste a resume bullet verbatim.
- The EKS fleet is **28 production clusters, 300+ nodes**. Uptime and data-availability
  percentages are deliberately omitted sitewide — do not reintroduce them.

### The template's unfillable panels

The reference layout carries panels the source material cannot fill. Each renders a
`<Slot kind="CONFIRM|ADD">` with a note, **never a plausible-looking number**:

| Panel | Reference shows | Status |
|---|---|---|
| Years counter | "12+ Years of Experience" | Filled with the real **3** |
| Projects counter | "138+ Projects completed on 30 countries" | `CONFIRM` — no source |
| Client block | "20K+ Clients" + 4 avatars | `CONFIRM` — Aksh is employed, not freelancing |
| Hero portrait | photo on the yellow slab | `ADD` |
| Media tiles | a video and a photo | `ADD` ×2 |
| Services | three service cards | `CONFIRM` — framed as capability areas, not an offer |
| Pricing | a rate card | `CONFIRM` — no rates exist |

A slot is greppable as `data-slot` in the built HTML. Filling one means editing
`src/content/*.json`, not editing a component.

---

## 3. What counts as a defect now

The previous build's banned-patterns list is void — cards, gradients-adjacent fills,
tracked caps, rounded corners and emoji are all part of the reference and are required.
What remains a defect:

- **An invented figure in a slot.** See § 2. This is the only unforgivable one.
- **Naming the client**, anywhere.
- **Contrast below WCAG AA**, in any state.
- **A parent styling a child component's root element.** Astro does not apply a
  parent's scope to a child component's root, so `.hero__spark { top: … }` in
  `Hero.astro` silently does nothing to `<Sparkle />`. This has bitten this repo three
  times — the sparkles landed in flow, the nav arrow filled its flex line, and a slot's
  background never applied and dropped its text to 1.3:1 on the yellow slab. **Pass
  placement, size and tone as props; style the root inside the component that owns it.**
- **Decoration on top of a line of copy.** Sparkles sit at `z-index: 0` behind content
  and take `wideOnly` where one column would put them over text.
- **Motion that ignores `prefers-reduced-motion`.** The typewriter and the count-up
  both check it and render their real value statically.
- **Anything that only works with JavaScript.** See § 7.

---

## 4. Design tokens

Tokens live in `src/styles/tokens.css` as CSS custom properties. **Never hardcode a
colour, font size, or spacing value in a component.** If a value is needed that does
not exist as a token, add the token.

The build is **dark-only** — the reference is drawn that way. There is no light theme
and no theme toggle.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#141414` | page ground |
| `--paper-sunk` | `#1c1c1c` | recessed panels, code blocks, tag pills |
| `--surface` | `#1e1e1e` | cards, the nav pill |
| `--surface-raised` | `#272727` | card hover, social buttons |
| `--ink` | `#ffffff` | headings |
| `--ink-muted` | `#a3a3a3` | body copy and captions (7.3:1 on ground) |
| `--ink-faint` | `#757575` | the hero role line only — large text, 4.0:1 |
| `--rule` | `#2b2b2b` | 1px hairlines only — never text |
| `--accent` | `#f5821f` | buttons, counters, the logo mark (7.1:1 on ground) |
| `--panel` | `#f7b32b` | the yellow slab behind the portrait |

Shape: `--radius-sm|md|lg|pill`, and `--notch` (18px) for the cut corner on buttons.

---

## 5. Typography

Three families, all OFL, all **self-hosted** as `woff2` in `src/assets/fonts/`, copied
from their Fontsource packages. No Google Fonts network requests at build or runtime.
`optimizedFallbacks` gives capsize metric-matched fallbacks, so CLS stays at 0.

- **Poppins** (400/500/600/700) — `--face-display`. Headings, the nav, buttons,
  counters. Display weight is 600–700; this is a heavy template and it should read that
  way.
- **DM Sans** (variable) — `--face-body`. All prose.
- **IBM Plex Mono** (400) — `--face-mono`. Diagram labels, dates, stack lists, code.
  Numbers use `font-variant-numeric: tabular-nums`.

Body is 16px at `line-height: 1.75`. The hero name is
`clamp(2.75rem, 7.4vw, 5.5rem)` at weight 700.

Prose still needs a measure: the section body is full-width, so any block of running
copy sets its own `max-width` (About uses `62ch`). Unconstrained it runs past 120
characters a line at 1600px.

---

## 6. Layout

- Container max-width `1180px`, content left-aligned.
- The nav is a **sticky floating pill**, inset from the page edges, collapsing behind a
  toggle below `60rem`. `html { scroll-padding-top: 6rem }` keeps anchor jumps clear of
  it — do not remove that.
- Sections are headed the same way throughout: a tracked-caps eyebrow, a display
  heading, then full-width content (`Section.astro`).
- Hero and stats are two-column above `64rem`, stacked below.
- Breakpoints to verify at: **375 / 768 / 1280 / 1600**.

---

## 7. Stack and constraints

- **Astro**, `output: 'static'`. **MDX** for case studies and notes.
- **Plain CSS** with tokens. No Tailwind, no CSS-in-JS.
- **No UI framework.** No React, Vue or Svelte islands. The template's behaviour is
  three small vanilla scripts: the nav disclosure/mobile menu, the hero typewriter, and
  the stats count-up.
- **Everything must work without JavaScript.** The scripts are progressive enhancement
  only:
  - the role line renders its first role server-side and the typewriter cycles it;
  - the counter renders its real value server-side and the count-up only replaces it
    mid-animation;
  - the nav collapses to a visible list rather than an unopenable menu.
  Verify with JS disabled before claiming any of this works.
- The **DR failover toggle** (`src/components/diagrams/DrTopology.astro`) is still a
  checkbox plus CSS sibling selectors and still ships no JavaScript. It earns its place
  by demonstrating that case study's central claim — a failover moves one endpoint and
  nothing else. Leave it alone.
- Content lives in `src/content/` as typed collections. Every schema is validated with
  zod in `src/content.config.ts` (collections) and `src/data.ts` (the JSON singletons).
- Semantic HTML. One `<h1>` per page. Real `<nav>`, `<main>`, `<article>`, `<time>`.
- **WCAG AA** contrast minimum. Visible keyboard focus on every interactive element.
  `clip-path` crops an `outline`, so clipped buttons draw their ring as an inset
  `box-shadow` instead.
- **Lighthouse ≥ 95** on all four categories, verified before any completion claim.
  Current: **100 / 100 / 100 / 100**, 91 KiB, CLS 0, TBT 0 ms.
- SVG diagrams are authored by hand, inline, monochrome + accent, with `role="img"` and
  a `<title>`/`<desc>` pair. No diagram libraries.
- The site URL lives in exactly one place: `SITE_URL` in `site.config.mjs`, mirrored by
  a Terraform variable. Nothing else hardcodes a domain.

---

## 8. How to work in this repo

1. Build **section by section**. After each section, re-read § 2 and § 3.
2. Never claim a section is done without running the build and checking it at 375px
   and 1280px. Report what you actually ran.
3. Flag every unknown as a `<Slot>` and mirror it into the `PRD.md` checklist. Do not
   guess to keep momentum.
4. Copy is design content. Sentence case, active voice, one job per element.
5. **Verify a style actually applied** before moving on, especially anything set on a
   child component. Three separate bugs in this repo were dead CSS that looked correct
   in the source.

---

## 9. Commands

```
npm run dev       # local dev server
npm run build     # static build to ./dist
npm run preview   # serve the built output
npm run check     # astro check — types and content schema validation
npm run fonts     # re-copy the woff2 files out of the Fontsource packages
```

Deployment targets are Vercel (one-step) and the Terraform module in `infra/`
(S3 + CloudFront + ACM + Route 53). Both must stay working; the IaC path is part of
the portfolio and is not decorative.

Astro documentation: https://docs.astro.build — in particular the
[content collections](https://docs.astro.build/en/guides/content-collections/) and
[routing](https://docs.astro.build/en/guides/routing/) guides.
