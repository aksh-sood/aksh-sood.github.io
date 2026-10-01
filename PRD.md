# PRD — Personal site for Aksh Sood

Status: **awaiting design approval.** No application code written yet.
Owner: Aksh Sood. Last revised: 2026-09-26.

---

## 1. Goal

A personal site that gets Aksh into interview loops for **Forward Deployed Engineer,
Solutions Engineer, and AI platform** roles.

The reader is a hiring manager with roughly forty seconds. In that time the site must
establish: three years of production platform work for enterprise financial-infrastructure
customers, direct contact with those customers' engineers, and current, hands-on LLM and
agent work. Evidence over adjectives.

### Success criteria

| | Target |
|---|---|
| Positioning legible | A reader understands the role, the domain and the level within 10 seconds of the first screen |
| Depth available | Three case studies, each readable in under 3 minutes, each with a diagram |
| Performance | Lighthouse ≥ 95 across performance, accessibility, best practices, SEO |
| Accessibility | WCAG 2.1 AA; full keyboard operation; `prefers-reduced-motion` honoured |
| Weight | < 150KB transferred on first load, fonts included; zero client JS bar the theme toggle |
| Editability | All copy changes happen in `src/content/**` without touching a layout file |
| Honest content | No invented figure anywhere; every unfillable panel renders a visible `<Slot>` (`CLAUDE.md` § 2) |

### Non-goals

- No CMS, no analytics dashboard, no comment system, no newsletter capture.
- No contact form. Email is a `mailto:` link.
- No i18n, no search, no tag taxonomy for notes until there are more than eight notes.

---

## 2. Content source of truth

Derived from `Resume_Template_aksh.pdf` (platform) and `Resume_Template_aksh_fde.pdf`
(FDE). Where the two disagree, the conflict is recorded in § 9 rather than resolved.

### Identity

- Aksh Sood — Senior DevSecOps Engineer, Baton Systems (Feb 2023 – present)
- Promotion path: Intern → Engineer I → Engineer II → Senior
- Based in India, remote
- akshsood0@gmail.com · github.com/aksh-sood · linkedin.com/in/aksh-sood-115ab418b
- B.Tech Computer Science, SRM Institute of Science and Technology, 2019–2023, CGPA 9.14
- Certifications: AWS Solutions Architect, Terraform Associate 003, Kubernetes CKAD

**Withheld:** phone number (never published). **Never named:** the client — referred to
throughout as "a global financial market infrastructure provider".

### Headline figures

Displayed as large mono figures, not in icon cards.

| Figure | Caption |
|---|---|
| `$180K` | taken off the annual AWS bill, through Graviton migration and right-sizing |
| `80%` | less compute, by rebuilding autoscaling on Karpenter, VPA and KEDA |
| `4 days → 2 hrs` | to stand up a customer environment, after the Terraform automation |
| `10 min` | recovery objective for multi-region failover, validated in practice |

Held in reserve for case-study bodies rather than the headline row: zero-downtime upgrades
across 28 production EKS clusters and 300+ nodes; 30%+ faster incident
response from centralised observability.

### Experience — rewritten as first-person prose

Resume voice removed. Same facts, shorter sentences, no buzzwords. These are drafts for
review; they become `src/content/experience/*.md`.

**Senior DevSecOps Engineer — Apr 2026 to present**

> I'm the engineering contact for a global financial market infrastructure provider. I
> join their technical calls, turn settlement and trade-flow requirements into platform
> designs, and debug live problems inside their AWS environment alongside their engineers.
>
> Most of my build work right now is cross-cloud: EKS to MSK over IAM and IRSA, EKS to
> GCP Pub/Sub through Workload Identity Federation, and Protobuf schemas for FX trade
> payloads. It unblocks data exchange between systems the customer doesn't own.
>
> I'm also re-architecting our Terraform modules and GitOps workflows — Atlantis, ArgoCD,
> Flux — so one set of modules serves multiple customers instead of one. Alongside that I
> run Policy-as-Code with Kyverno and lead the security and compliance programmes.

**DevSecOps Engineer II — Apr 2024 to Mar 2026**

> I designed multi-region disaster recovery for FX settlement messaging across Oregon,
> London and Ireland. The vendor didn't support replication between those regions, so I
> built a network-of-brokers topology instead and validated Active/Passive failover to a
> ten-minute recovery objective.
>
> I took $180,000 a year off the AWS bill by migrating to Graviton and right-sizing what
> was left, then cut compute a further 80% by rebuilding autoscaling on Karpenter, VPA
> and KEDA — without giving up headroom during traffic spikes.
>
> I moved deployments off Jenkins onto GitOps with ArgoCD, which made releases auditable
> and rollbacks real. I ran zero-downtime Kubernetes upgrades across 28 production EKS
> clusters and 300+ nodes, co-ordinating version transitions, add-on compatibility and workload validation with no
> customer-facing impact. I added BYOK with AWS KMS and automated key rotation to meet
> enterprise security requirements, and built the observability stack — Prometheus,
> Grafana, Kibana, OpenSearch — that cut incident response time by more than 30%.

**DevSecOps Engineer I — Jun 2023 to Mar 2024**

> I made the release process CIS-compliant and hardened the infrastructure underneath it.
>
> The biggest change was automating deployment in Terraform: standing up a full AWS
> environment went from four days of manual work to a two-hour single-click run. I also
> built the Jenkins CI/CD pipelines and autoscaled the agents, which cut their cost by 60%.

**DevSecOps Engineer Intern — Feb 2023 to May 2023**

> I built an end-to-end CI pipeline on Jenkins and deployed it on Kubernetes, automated
> server provisioning with Ansible, and wrote Spring and React applications from scratch,
> containerised with Docker.

### Case studies

Three, each on its own page at `/work/<slug>`, each following **Context → Constraint →
What I did → Outcome**, each with one hand-drawn-feeling SVG diagram. 600–900 words.

1. **`dr-outside-supported-regions`** — Multi-region DR for FX settlement messaging.
   The strongest story: a vendor limitation, a topology designed around it, a validated
   10-minute RO. Carries the site's signature diagram (Oregon–London–Ireland).
2. **`compute-80-percent`** — 80% less compute and $180K a year, without losing headroom.
   Diagram: node lifecycle before and after Karpenter/VPA/KEDA.
3. **`cross-cloud-trade-flow`** — EKS ↔ MSK ↔ GCP Pub/Sub for client trade flow.
   Diagram: identity and data path across two clouds, IRSA on one side, Workload Identity
   Federation on the other.

### Projects

A list, not a card grid. Columns: name, one line, stack in mono, links.

1. **FleetPulse — Autonomous Freight Operations Platform** *(featured, screenshot)*
   *(Named FleetPulse by the owner on 2026-10-01. The repo is still `SetHaul`.)*
   End-to-end dock coordination: a LangChain agent on AWS Bedrock AgentCore handling
   dispatcher conversations, and a React driver portal for exception logging and ETA
   tracking. Atomic PostgreSQL transactions on Supabase removed the double-booking race;
   Redis session state on Upstash.
   Stack: LangChain, Bedrock AgentCore, React, PostgreSQL/Supabase, Redis/Upstash.
   Links: `[ADD: live demo URL]`, `[ADD: GitHub URL]`
2. **Lead Intelligence System** — Inbound lead scoring and outreach drafting. A hybrid
   deterministic-semantic rubric with 2×2 Fit-Intent routing; batching and rate-limit
   recovery cut LLM API calls by 88%.
   Stack: Python, LangChain, Gemini, LangSmith. Links: `[ADD: GitHub URL]`
3. **RAG Pipeline** — Document QA: PDF ingestion, tuned chunking, ChromaDB with
   HuggingFace embeddings, and an LLM re-ranking stage that beat baseline top-k retrieval.
   Stack: LangChain, ChromaDB, HuggingFace. Links: `[ADD: GitHub URL]`

### Toolbox

Grouped plain-text lists in mono-labelled columns. Never a logo wall, never bars.

- **AI engineering** — Python, LangChain, LlamaIndex, LangSmith, FastAPI, RAG, ChromaDB,
  Pinecone, HuggingFace, Bedrock AgentCore, Gemini, Pydantic
- **Cloud & platform** — AWS, GCP, Kubernetes, Docker, Helm, ArgoCD, Flux, Atlantis,
  Jenkins, Karpenter, KEDA, Terraform, Terragrunt, OpenTofu, Ansible
- **Observability** — Prometheus, Grafana, OpenSearch, Loki, Jaeger
- **Security & compliance** — Kyverno, OPA, Checkov, Trivy, Security Hub, GuardDuty,
  Inspector, KMS (BYOK), External Secrets Operator, Keycloak/OIDC, Istio mTLS, CIS,
  SOC 2, PCI-DSS
- **Data & messaging** — PostgreSQL, Redis, Kafka/MSK, ActiveMQ, RabbitMQ, GCP Pub/Sub,
  Protobuf

### About — draft, 96 words

> I grew up wanting to know how things were wired, and ended up in the part of software
> where that's the whole job. I joined Baton as an intern in 2023 and have spent the years
> since on financial infrastructure — the systems banks settle trades on, where a bad
> deploy is somebody's money.
>
> What I like most is the part that isn't infrastructure: being on the call when the
> requirement is still vague, and staying on it until the thing runs.
>
> Outside work, `[PERSONAL DETAIL]`.
>
> I'm in India, and I work remotely.

### Writing

Ships empty but wired: collection, schema, index page, article layout, RSS. One stub post,
unpublished until written — *"What I learned running DR outside vendor-supported regions"*.

---

## 3. Structure

One long editorial home page plus real pages for depth.

| Route | Contents |
|---|---|
| `/` | Header · Opening · Figures · Selected work · Projects · Experience · Toolbox · Writing · About · Contact |
| `/work/<slug>` | Case study, MDX, with diagram and a prev/next pair |
| `/notes` | Writing index |
| `/notes/<slug>` | Note, MDX |
| `/og/*.png` | Generated typographic Open Graph images |

Nav: Work, Projects, Writing, About, Contact. All anchor into the home page except
Writing, which routes to `/notes`.

Header carries the name set typographically as the mark, plus one mono line giving the
current role, and beneath it a second mono line: "Available for FDE / AI platform
roles". Both set at `--step-mono-sm` in `--ink-muted`.

Footer carries email, GitHub, LinkedIn, a resume PDF `[CONFIRM: which resume, or both?]`,
and a "last updated" date in mono, sourced from the build.

---

## 4. Design direction

> **Superseded 2026-09-27.** The owner supplied a dark commercial portfolio
> template as a reference screenshot and asked for it after being shown the
> trade-offs. The direction below describes the original "engineering notebook"
> build, preserved in `.backup-notebook-ui/`. The live direction is documented in
> `CLAUDE.md` §§ 1, 4–6. This section is kept as the record of what was decided
> first and why.


Full tokens, type scale and grid are specified in `CLAUDE.md` §§ 4–6, which is the
binding version. Summary:

- **Paper and ink.** Warm off-white `#F6F3EE`, warm near-black `#171614`, one accent —
  **oxblood `#7A1F2B`** — used like a red pen in a margin, never as a brand wash. Dark
  mode is the same paper at night: warm ground, no neon.
- **Two families.** Newsreader for all prose, using its optical size axis honestly;
  IBM Plex Mono for labels, dates, stacks and figures. Both self-hosted. Not Inter.
- **A notebook margin grid.** Narrow left column for mono metadata, wide right column
  for prose, a bleed lane on the right that only diagrams may enter. Left-aligned
  throughout. Hairline rules and whitespace carry the structure; there are no cards.
- **Numbers as typography.** The headline outcomes are set large in tabular mono, like
  figures in a report.
- **One motif.** A hand-drawn-feeling line diagram of the Oregon–London–Ireland DR
  topology. Monochrome with a single accent stroke on the failover path. It appears once
  on the home page and full-size on its case study, and it is the only illustration on
  the site.

Everything in `CLAUDE.md` § 3 is banned.

---

## 5. Technical requirements

- Astro 5, `output: 'static'`, MDX. Plain CSS with custom-property tokens; no Tailwind.
- Zero client JS except an inline, no-flash theme toggle under 1KB.
- Self-hosted subsetted woff2; `font-display: swap` with a metric-matched fallback so CLS
  stays at zero.
- Typed content collections in `src/content/` with Zod schemas.
- Responsive and verified at 375, 768, 1280, 1600.
- Semantic HTML, one `<h1>` per page, visible focus states, AA contrast.
- SEO: per-page title and description, canonical, Open Graph and Twitter tags, a generated
  typographic OG image per page, `sitemap.xml`, `robots.txt`, RSS for notes, and JSON-LD
  `Person` schema with `jobTitle`, `alumniOf`, `knowsAbout` and `sameAs`.
- README covering local setup, where each piece of copy lives, how to add a case study or
  note, and both deployment paths.

### Deployment

- **(a) Vercel** — static build, `vercel.json` with cache headers for hashed assets and
  fonts, security headers, one-step deploy from the repo.
- **(b) Terraform module** in `infra/` — S3 private bucket, CloudFront with OAC, ACM
  certificate in `us-east-1`, Route 53 alias records, a response-headers policy, and
  invalidation on deploy. Written as a reusable module with variables and outputs, and
  documented, because the IaC is itself a portfolio artifact.

---

## 6. Build order

1. Scaffold, tokens, fonts, base layout, grid primitives, theme toggle.
2. Header, opening, figures row.
3. Selected work index rows + the three case study pages and their diagrams.
4. Projects list, experience timeline, toolbox.
5. Notes collection, index, article layout, RSS.
6. About, contact, footer.
7. SEO, OG image generation, JSON-LD, sitemap.
8. Accessibility and Lighthouse passes at all four widths.
9. README, Vercel config, Terraform module.

After each of 2–6, re-review against `CLAUDE.md` § 3 and record what was cut.

---

## 7. Content model

```
src/content/
  site.json          name, role, availability line, links, resume path
  home.md            opening sentence, figures with captions
  experience/*.md    role, company, start, end, order, body
  work/*.mdx         title, slug, standfirst, context/constraint/action/outcome, stack, diagram
  projects/*.md      name, tagline, stack[], links{demo,repo}, featured, order
  toolbox.json       groups[] { label, items[] }
  notes/*.mdx        title, description, date, draft
```

Every schema validated in `src/content/config.ts`. Layouts read the collections; layouts
contain no copy.

---

## 8. Definition of done

- [ ] `npm run build` and `npm run check` both clean
- [ ] Lighthouse ≥ 95 on all four categories, on the built output, recorded in the README
- [ ] Renders correctly at 375, 768, 1280 and 1600
- [ ] Keyboard-only pass reaches every link and control with a visible focus ring
- [ ] Contrast audit passes AA in both themes
- [ ] `prefers-reduced-motion: reduce` removes all non-essential motion
- [ ] Banned-patterns review passed, per section
- [ ] No client name, no phone number, anywhere in `dist/`
- [ ] No `[CONFIRM]` or `[ADD]` markers left in shipped copy
- [ ] `terraform validate` and `terraform plan` succeed in `infra/`
- [ ] README explains editing and both deploy paths

---

## 9. Decisions made

> Entries below marked **superseded** were reversed by the 2026-09-27 template
> rebuild. They are kept because the reasoning still explains why the original
> build looked the way it did.

- Opening statement: the "for three years…" version, agent work carried in the second sentence.
- ~~Accent is **oxblood `#7A1F2B`** (`#D77A84` in dark), used like a red pen in a margin.~~ **Superseded** — the accent is orange `#F5821F`.
- ~~Type is **Newsreader** (opsz 16–72, wght 400–700) with **IBM Plex Mono**, both self-hosted.~~ **Superseded** — Poppins + DM Sans + IBM Plex Mono, all self-hosted.
- EKS cluster count is **28**, per the FDE resume.
- The header carries an availability line, set in mono beneath the role.
- The footer links the **FDE résumé only**, at `/aksh-sood-resume.pdf`.
- **Uptime and data-availability percentages are omitted sitewide.** 99.9% and 99% appear nowhere.
- Domain is unregistered; `SITE_URL` in `site.config.mjs` and `domain_name` in
  `infra/terraform.tfvars` are the only two places it is written.

## 10. Open questions

Carried until answered. Nothing here is guessed. Each item below also renders visibly
on the page or sits in the source, so none can be forgotten.

### 10a. Slots the template layout opened (2026-09-27)

The site was rebuilt to a dark commercial portfolio template supplied as a screenshot.
That layout has panels the source material cannot fill. Each renders a visible
`<Slot>` — greppable as `data-slot` in `dist/` — rather than a plausible-looking
number.

| # | Panel | Reference shows | What is needed |
|---|---|---|---|
| A | **Projects-completed counter** | "138+ Projects completed on 30 countries" | A real count and scope, or delete the stat. `home.json` → `stats[1]`. |
| B | **Client count + 4 avatars** | "20K+ Clients" | Aksh is employed, not freelancing, so there is no client roster. Supply a figure and avatar images, or delete the block. `home.json` → `clients`. |
| C | **Hero portrait** | photo on the yellow slab | A cut-out or plain-background shot, 1200px+ short edge. Set `home.json` → `hero.portrait`. |
| D | **Intro video tile** | a video with a play badge | Video plus poster frame, or delete the tile. `home.json` → `media[0]`. |
| E | **Second photo tile** | a working photo | One image. `home.json` → `media[1]`. |
| F | **"Services" framing** | three service cards sold to clients | Written as capability areas from real work, not as an offer. Confirm the framing or rename the section and drop the nav item. `services.json`. |
| G | **Pricing section** | a freelance rate card | No rates exist and none are implied by the source. Supply them if freelancing is intended, or delete the section and its nav item. `pricing.json`. |

Two further decisions the rebuild forced, recorded rather than asked:

- **Years of experience** — the reference shows "12+". The real figure is **3**
  (Baton Systems, 2023–present), and that is what ships. It is the honest version of
  the same panel.
- **Light theme and theme toggle removed.** The reference is dark-only, so the toggle
  had nothing to switch between. The previous build's light palette is preserved in
  `.backup-notebook-ui/`.

### 10a-bis. FleetPulse — findings from the repo and deployment (2026-10-01)

The repo and deployed URL were supplied and both were inspected directly. The repo link
is now live on the site. **The demo link is deliberately not**, and three things need
deciding.

| # | Finding | What is needed |
|---|---|---|
| H | **The deployed demo is broken.** `https://set-haul-ui.vercel.app/` serves the front end (HTTP 200) and the login screen works, but every API route returns `500 {"error":"TypeError: fetch failed"}` — `/api/drivers/:id`, `/api/shipments/active/:id`, `/api/shipments/history/:id`. Signing in as the published demo driver lands on an error screen. A server-side `fetch failed` with no detail points at `SUPABASE_URL`/`SUPABASE_KEY` missing on Vercel, or a free-tier Supabase project that has auto-paused. **Not linked from the site until it works** — a dead "Live demo" is worse than none. |
| I | ~~The project has three different names.~~ **RESOLVED 2026-10-01 — the name is FleetPulse.** The site now says FleetPulse throughout. Two artifacts still carry old names and are the owner's to change: the repo is `SetHaul` (renaming is safe — GitHub redirects the old URL, and the site's link would keep working), and `SetuHaul_Presentation_1.pptx` is committed inside it. |
| J | **The deployed app's `<title>` is "My Google AI Studio App"** — leftover scaffolding. It is what a hiring manager's browser tab will say. One line in `index.html`. |
| K | ~~LangChain is not in the repo.~~ **RESOLVED 2026-10-01 — owner-confirmed; the agent code is not published yet.** LangChain is back in FleetPulse's stack list. Note the standing of this claim: it is attested by the owner, who is the source of truth under § 2, but it is the one stack entry a reader cannot check, because `github.com/aksh-sood/SetHaul` contains only the portal and API — the agent is invoked by ARN and its README says the agent code is not in the repository. Publishing the agent repo closes the gap. |
| L | **LangChain is claimed in 6 other places** — the hero opening, the Services card and its tags, and the Lead Intelligence and RAG Pipeline stacks. Covered by the same owner confirmation as item K. Those two projects still have no public repo (item 3). |

Repo hygiene worth a minute, noticed while reading: `.vite/deps` (a build artifact) and
`SetuHaul_Presentation_1.pptx` are committed, and `package.json` still has
`"name": "react-example"`.

### 10ab. Closed since

- **LinkedIn URL** — updated to `https://www.linkedin.com/in/akshsood/` (2026-09-30).
- **Project named FleetPulse** (2026-10-01), replacing SetuHaul sitewide.
- **FleetPulse source link** — `https://github.com/aksh-sood/SetHaul`, verified public
  (2026-10-01). Its tagline and stack were rewritten from the repo's own README rather
  than from the earlier summary.
- **First note published** (2026-09-30) — "What I learned running DR outside
  vendor-supported regions", 991 words, drawn from the DR case study. The Writing
  section now renders on the home page and the note is in the RSS feed.
- **Availability line restored** — the template rebuild had dropped
  `site.availability`; it is back in the hero as a pill above the name.

### 10b. Carried over from the original build

| # | Item | Where | Detail |
|---|---|---|---|
| 1 | **The résumé PDF publishes a phone number** | `public/aksh-sood-resume.pdf` | The site never prints it, but linking the PDF does publish it — which the brief said not to do. Options: ship a redacted PDF, drop the download, or accept it. Needs a decision. |
| 2 | **FleetPulse live demo** | `projects.json` | Source link is live. The demo is withheld until the 500s are fixed — see item H. |
| 3 | **Lead Intelligence / RAG Pipeline repos** | `projects.json` | Public GitHub URLs, or set them to stay unlinked. |
| 4 | **FleetPulse screenshot** | `Projects.astro` | Currently a dashed placeholder box. The driver portal's login screen renders fine, so a screenshot can be taken now without fixing the API. |
| 5 | **`[PERSONAL DETAIL]`** | `home.json` → `about` | One human sentence. Without it the About reads like a second summary. |
| 6 | **Naming the managed broker** | `work/dr-outside-supported-regions.mdx` | Written as ActiveMQ with Amazon MQ in the stack list — inferred from "network-of-brokers" plus the skills list, not stated in either resume. Confirm before publishing. |
| 7 | **Case study periods** | `work/*.mdx` | Shown as 2024–2025, 2024–2025 and 2026. Inferred from role dates; confirm. |
| 8 | **Senior start date** | `experience/4-senior.md` | Both resumes say Apr 2026. Confirming because the promotion path is a headline story. |
| 9 | **Domain** | `site.config.mjs`, `infra/terraform.tfvars` | Placeholder `akshsood.com` until registered. |
