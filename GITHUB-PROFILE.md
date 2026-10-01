# Brief: bring the GitHub profile in line with the site

**Paste this whole file into Claude in the browser, with `https://github.com/aksh-sood`
open and signed in.**

You are editing a real, public profile that hiring managers will read. Work in phases.
**Phase A is read-only — inventory, report, and stop.** Do not change anything until
the human has replied.

---

## 1. Why this exists

Aksh Sood is applying for **Forward Deployed Engineer / Solutions Engineer / AI
platform** roles. His site's opening line is:

> For three years I've run AWS and Kubernetes platforms for financial-infrastructure
> customers, usually from inside their environment rather than behind a ticket queue.
> Lately I've been building agent systems the same way.

The site links to this GitHub profile from its hero and its footer. **Right now the
profile contradicts that sentence.** As of 2026-09-30 the six pinned repositories are:

`CredWiz_Baton` · `The_Vault` · `grocery_app` · `Land-Cover-Detection` ·
`minor_project` · `news_app`

Flutter apps and university machine-learning coursework. There is no bio. A hiring
manager who clicks through from "I build AWS platforms and LLM agents" lands on a
grocery app.

**The job:** make the first screen of this profile agree with that sentence, using only
things that are actually there.

---

## 2. Hard rules

These are not preferences.

1. **Never invent a fact.** No invented metrics, dates, employers, or project outcomes.
   If you need a fact that is not in § 3 and not visible on the profile, ask.
2. **Never name the client.** Aksh's employer is Baton Systems — that is public and
   fine. Baton's *customer* is never named anywhere: not in a bio, not in a README, not
   in a repo description, not in a commit message. The approved phrasing is
   "a global financial market infrastructure provider" or "the client". If you find a
   repo, README, or description that names a specific bank, exchange, or clearing house,
   **stop and report it** — that is a leak, not a task.
3. **Never make a private repository public.** Not for any reason. `CredWiz_Baton` is
   named after his employer and may contain work code. If a project you want to pin is
   private, report that and stop.
4. **Never delete a repository.** Never force-push. Never rewrite history.
5. **Never publish a phone number.** It must not appear in any bio, README, or profile
   field.
6. **Archiving is not deleting, but still ask first.** Propose it; do not do it.
7. **Under-pinning beats bad pinning.** Three strong pins are better than six that
   include coursework. An empty slot is a valid outcome.

---

## 3. Facts you may use

Verified against the site's source of truth. Anything not on this list needs asking.

| Field | Value |
|---|---|
| Name | Aksh Sood |
| Role | Senior DevSecOps Engineer |
| Employer | Baton Systems |
| Location | India (works remote) |
| Experience | Joined 2023 as an intern; intern → Engineer I → Engineer II → Senior |
| Domain | Financial infrastructure — trade settlement |
| Fleet | 28 production EKS clusters, 300+ nodes |
| Cost work | ~$180K/year off the AWS bill (Graviton migration + right-sizing) |
| Scaling work | ~80% less compute (Karpenter, VPA, KEDA) |
| Provisioning | Customer environment in 2 hours, down from 4 days |
| DR | 10-minute recovery objective, multi-region, validated in practice |
| Certifications | AWS Solutions Architect · Terraform Associate 003 · Kubernetes CKAD |
| Education | B.Tech Computer Science, SRM Institute of Science and Technology, 2019–2023 |
| LinkedIn | https://www.linkedin.com/in/akshsood/ |
| Email | akshsood0@gmail.com |

**Do NOT add a personal website link.** The domain `akshsood.com` is a placeholder and
is not registered. Leave the website field empty until told otherwise.

**Do NOT publish uptime or availability percentages.** They are deliberately omitted
everywhere.

---

## 4. Phase A — inventory, then stop

Read-only. Change nothing.

1. Open `https://github.com/aksh-sood?tab=repositories` and page through **all 41
   repositories**. For each, record: name, public/private, language, description (or
   that it has none), last-push date, stars/forks.
2. Specifically determine whether any of these three exist, and whether each is public
   or private:
   - **FleetPulse** — the repo is currently named `SetHaul`
     (https://github.com/aksh-sood/SetHaul). Driver portal plus a Bedrock AgentCore
     dispatch agent. **Already confirmed public — pin this one first.**
     Propose renaming the repo to `FleetPulse` to match the app; GitHub redirects
     the old URL, so nothing breaks.
   - **Lead Intelligence System** — Python, LangChain, Gemini, LangSmith
   - **RAG Pipeline** — LangChain, ChromaDB, HuggingFace embeddings
3. Note whether a profile README repo (`aksh-sood/aksh-sood`) already exists.
4. Flag any repo whose name, description, or README appears to name a client, contain
   credentials, or contain employer code.

Then **report back in this shape and wait**:

```
REPOS: <n> public, <n> private
AI PROJECTS:
  FleetPulse (SetHaul)  — confirmed public, pin first
  Lead Intelligence     — public / private / not found
  RAG Pipeline          — public / private / not found
PROFILE README REPO:    exists / does not exist
STRONGEST CANDIDATES TO PIN (your ranking, with one line of reasoning each):
  1. …
CONCERNS (client names, secrets, employer code):
  …
PROPOSED PINS (up to 6, may be fewer):
  …
```

---

## 5. Phase B — the bio

Only after the human approves. GitHub's bio field is **160 characters**.

Draft, if the facts hold:

> Senior DevSecOps Engineer at Baton Systems. AWS, Kubernetes and Terraform for
> financial infrastructure. Lately: LangChain agents on Bedrock AgentCore.

Also set: **Company** `Baton Systems` · **Location** `India` · **Social** the LinkedIn
URL above. Leave **Website** empty (see § 3).

Rules for the bio: no emoji, no "passionate", no "cutting-edge", no exclamation marks.
Say what he does, in plain words.

---

## 6. Phase C — pinning

Max six. Order matters — the first two get read.

**Priority order:**

1. The three AI projects, **if they are public**. These carry the half of the
   positioning the profile currently has no evidence for.
2. Infrastructure or platform work that is genuinely his and genuinely public.
3. Nothing else.

**Unpin regardless:** `grocery_app`, `news_app`, `minor_project`, `The_Vault`,
`Land-Cover-Detection` — university and hobby work that actively misdirects.

**`CredWiz_Baton` — do not touch without asking.** It is named after the employer. It
may be work code that should not be public at all. Report it; let the human decide.

If fewer than three good repos exist, **pin what is good and say so**. Do not pad.

---

## 7. Phase D — the profile README

Only if the human approves. Create the repo `aksh-sood/aksh-sood` (public, with a
README), which GitHub renders at the top of the profile.

Keep it short — under 200 words, no badge walls, no stats widgets, no trophy images, no
"visitor counter", no animated typing SVG. Suggested content, adjusted to whatever
Phase A actually found:

```markdown
## Aksh Sood

Senior DevSecOps Engineer at Baton Systems, working on financial infrastructure —
the systems banks settle trades on.

Most of what I do is platform work for enterprise customers, usually from inside
their environment rather than behind a ticket queue: 28 production EKS clusters
across 300+ nodes, autoscaling rebuilt on Karpenter, VPA and KEDA, multi-region
disaster recovery with a validated 10-minute recovery objective, and the Terraform
that stands it all up.

Lately I've been building agent systems the same way — LangChain on Bedrock
AgentCore, retrieval pipelines, and the evaluation loop that keeps them honest.

**Certifications** — AWS Solutions Architect · Terraform Associate 003 · CKAD

[LinkedIn](https://www.linkedin.com/in/akshsood/) · akshsood0@gmail.com
```

Do not add the website link until the domain is registered.

---

## 8. Phase E — repo hygiene

For each repo that stays pinned:

- Give it a **one-line description** if it has none. Describe what it does, not what
  it is built with.
- Add **topics** (`langchain`, `aws`, `kubernetes`, `terraform`, `rag`, as accurate).
- If its README is empty or a bare scaffold, note that and propose a short one. Do not
  write a README that claims features you have not verified exist in the code.

---

## 9. When you are done

Report exactly what changed, as a list of before → after. Include anything you chose
**not** to do and why. If you could not complete a step, say so plainly rather than
working around it.

Do not report success on a step you did not verify by reloading the page and looking.
