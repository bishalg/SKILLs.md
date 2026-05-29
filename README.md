# 🧠 AI Skills Workspace

**Decentralized skill bundles for AI agents and sub-agent task orchestration.**

Skills live here as the single source of truth. They get **deployed into projects** via a root-level `.agents/` orchestrator layer — keeping skills portable, versioned, and project-independent.

---

## 🤖 Agentic Development Guide

For a deep dive into using these skills with **Google Antigravity 2.0**, **Claude Code**, and **Gemini CLI**, see the [**Agentic Development Guide**](./AGENTIC_DEVELOPMENT.md).

---

## ⚖️ Disclosure & Origins

This repository is a curated showcase of both original architectural research and synthesized industry best practices.

### 🌟 Personal & Original Work
- **Impeccable Design Language:** A 22-command framework for deterministic UI quality. While based on Anthropic's `frontend-design` skill, it has been heavily extended with proprietary design laws, command-routing, and the **Liquid Glass** aesthetic.
- **Liquid Glass Aesthetic:** The specific implementation of frosted glass, OKLCH color matrices, and fluid spacing found in `retained-core-skills/frontend-design`.
- **The Agentic Layer:** The orchestration architecture, including the 5-phase specialist workflow and the `ORCHESTRATOR.md` routing protocol.

### 🔧 Curated & Synthesized Work
- **Refactoring UI Plugin:** Heuristics and sub-skills synthesized from the principles in *Refactoring UI* by Adam Wathan & Steve Schoger.
- **UX Layers Framework:** A strategy-to-surface framework based on industry-standard UX models (e.g., Jesse James Garrett's *Elements of User Experience*).
- **Core Engineering:** Best practices curated from the **Vercel**, **Next.js**, **React 19**, and **shadcn/ui** ecosystems.

---

## 📂 Workspace Structure

```
SKILLS/
├── README.md                        ← This file — master index & deployment guide
│
├── impeccable/                      ← 🎭 Design Language (22 commands)
│   ├── SKILL.md                     ← Main orchestrator — load first
│   ├── reference/                   ← 37 domain guidelines (color, type, motion…)
│   ├── agents/                      ← impeccable-asset-producer sub-agent
│   └── scripts/                     ← load-context.mjs · pin.mjs · live.mjs
│
├── refactoring-ui-plugin/           ← 🔧 UI Fix Engine (11 sub-skills)
│   ├── SKILL.md                     ← Main skill — entry point
│   └── skills/                      ← 01-visual-hierarchy → meta-refactor-ui
│
├── layers-skills/                   ← 🏗️ UX Strategy Framework (9 sub-skills)
│   └── skills/                      ← layers-product-strategy → layers-surface
│
├── retained-core-skills/            ← ⚙️ Core Engineering (7 skills)
│   ├── frontend-design/             ← Liquid Glass, OKLCH, CSS tokens
│   ├── harden/                      ← Errors, i18n, offline-first
│   ├── next-browser/                ← React DevTools CLI, hydration, paint
│   ├── optimize/                    ← LCP · INP · CLS · bundle
│   ├── react-19-optimistic-ui/      ← useOptimistic, background sync
│   ├── shadcn/                      ← Component registry, Radix a11y
│   └── vercel-composition-patterns/ ← Compound components, render props
│
└── _archived-2026-05-20/            ← Legacy skills (Science, Firebase, Utilities)
```

---

## 🚀 Deployment — How Skills Get Into Projects

Skills are copied into the target project and wired to agents. The agent layer handles routing — no manual skill invocation needed.

### Step 1 — Copy skill bundles into the project

```bash
# From the project root (e.g. astrofusion-nextjs/)
mkdir -p skills/design

cp -R /path/to/SKILLS/impeccable              skills/design/impeccable
cp -R /path/to/SKILLS/refactoring-ui-plugin   skills/design/refactoring-ui
cp -R /path/to/SKILLS/layers-skills/skills    skills/design/ux-layers
cp -R /path/to/SKILLS/retained-core-skills    skills/design/core-engineering
```

### Step 2 — Create the `.agents/` orchestrator layer at project root

```
project-root/
├── .agents/
│   ├── ORCHESTRATOR.md          ← Root entry point (routing table + 5-phase workflow)
│   ├── agents/
│   │   ├── design-director.agent.md      ← Routes impeccable (22 commands)
│   │   ├── ux-strategist.agent.md        ← Routes ux-layers (9 sub-skills)
│   │   ├── ui-refactor.agent.md          ← Routes refactoring-ui (11 sub-skills)
│   │   ├── engineering-lead.agent.md     ← Routes core-engineering (7 skills)
│   │   ├── astro-domain.agent.md         ← Domain-specific guard (project-specific)
│   │   └── qa-validator.agent.md         ← 5-gate QA (tests · a11y · i18n · perf · domain)
│   └── commands/
│       ├── design.md            ← /design
│       ├── ux-audit.md          ← /ux-audit
│       ├── refactor-ui.md       ← /refactor-ui
│       ├── polish.md            ← /polish
│       ├── harden.md            ← /harden
│       ├── optimize.md          ← /optimize
│       └── validate.md          ← /validate
├── PRODUCT.md                   ← Required by impeccable (brand context)
└── DESIGN.md                    ← Required by impeccable (design system snapshot)
```

### Step 3 — Scaffold context files

`PRODUCT.md` — brand context required by the `impeccable` skill:
- Product purpose, target users, tone, anti-references, strategic principles

`DESIGN.md` — design system snapshot:
- Color tokens (OKLCH), typography scale, spacing system, component patterns

Load both into agent context:
```bash
node skills/design/impeccable/scripts/load-context.mjs
```

---

## 🧩 The Agentic Layer — How Routing Works

The `.agents/ORCHESTRATOR.md` is the root entry point. Skills never need to be invoked by name — the orchestrator detects topic keywords and routes to the correct specialist agent automatically.

### Keyword → Agent → Skill Chain

```
Keyword detected          → Agent                → Skill loaded
─────────────────────────────────────────────────────────────────
design, brand, typography → design-director       → impeccable/SKILL.md
                                                       └─ reference/<command>.md
ux, strategy, user-needs  → ux-strategist         → ux-layers/layers-intro/SKILL.md
                                                       └─ layers-*/SKILL.md (in order)
refactor, hierarchy, clutter → ui-refactor        → refactoring-ui/meta-refactor-ui
                                                       └─ 01–10 sub-skills
performance, LCP, bundle  → engineering-lead      → core-engineering/optimize/SKILL.md
                                                       └─ next-browser, harden, shadcn…
vedic, rashi, sweph        → astro-domain         → astro-validation/SKILL.md (project)
test, a11y, validate       → qa-validator         → 5-gate protocol (tests→a11y→i18n→perf→domain)
```

### One Agent Per Turn

The orchestrator routes to **exactly one specialist per turn** and returns control before loading the next. This prevents context bloat and keeps each agent focused.

---

## 🔄 The 5-Phase Workflow (project-level)

Every feature in a wired project follows this loop:

```
1. ORIENT   → ux-strategist   Load PRODUCT.md + DESIGN.md. Identify UX gaps.
2. DESIGN   → design-director  impeccable shape → craft. Liquid Glass aesthetic.
3. BUILD    → engineering-lead Next.js patterns, React 19, domain calculations.
4. REFINE   → ui-refactor + design-director /polish + engineering-lead /harden
5. VALIDATE → qa-validator     5 gates → PASS / FIX / BLOCK. Required before push.
```

---

## 📚 Skill Bundles — Full Reference

---

### 🎭 Impeccable Design Language — `/impeccable`

**Main file:** [impeccable/SKILL.md](./impeccable/SKILL.md)

An elite design language and deterministic quality system. Context-aware brand/product register. Eliminates boilerplate AI output.

**Setup required:**
1. Run `node scripts/load-context.mjs` to load `PRODUCT.md` + `DESIGN.md`
2. Identify register: **brand** (design IS product) or **product** (design SERVES data)
3. Load matching reference: `reference/brand.md` or `reference/product.md`

**22 Commands:**

| Group | Command | What it does |
|-------|---------|-------------|
| Build | `craft` | Shape + build a feature end-to-end |
| Build | `shape` | Plan UX/UI before writing code |
| Build | `teach` | Create or update PRODUCT.md + DESIGN.md |
| Build | `document` | Generate DESIGN.md from existing code |
| Build | `extract` | Pull reusable tokens into design system |
| Evaluate | `critique` | UX review with heuristic scoring |
| Evaluate | `audit` | Technical quality (a11y, perf, responsive) |
| Refine | `polish` | Final quality pass before shipping |
| Refine | `bolder` | Amplify bland or safe designs |
| Refine | `quieter` | Tone down aggressive designs |
| Refine | `distill` | Strip to essence, remove complexity |
| Refine | `harden` | Production-ready: errors, i18n, edge cases |
| Refine | `onboard` | First-run flows, empty states, activation |
| Enhance | `animate` | Add purposeful motion and transitions |
| Enhance | `colorize` | Add strategic color to monochromatic UIs |
| Enhance | `typeset` | Improve typography hierarchy and fonts |
| Enhance | `layout` | Fix spacing, rhythm, visual hierarchy |
| Enhance | `delight` | Add personality and memorable touches |
| Enhance | `overdrive` | Push past conventional limits |
| Fix | `clarify` | Improve UX copy, labels, error messages |
| Fix | `adapt` | Adapt for different devices and screens |
| Fix | `optimize` | Diagnose and fix UI performance |
| Iterate | `live` | Visual variant mode in browser |

**Reference guides:** [reference/](./impeccable/reference/)
- `color-and-contrast.md` — OKLCH, tinted neutrals, accessible contrast, dark mode
- `typography.md` — Type scales, pairings, custom fonts, open-type control
- `spatial-design.md` — Mathematical layout, rhythmic grids, padding bounds
- `motion-design.md` — Spring rates, easing curves, choreography
- `responsive-design.md` — Mobile-first queries, fluid sizing
- `interaction-design.md` — Intuitive states, focus, custom scrollbars
- `ux-writing.md` — Copy guides, micro-interactions, error messages
- `brand.md` — Brand register design laws
- `product.md` — Product register design laws
- + 28 more (`craft.md`, `shape.md`, `polish.md`, `animate.md`…)

**Sub-agent:** [agents/impeccable-asset-producer.md](./impeccable/agents/impeccable-asset-producer.md)
Generates design assets, icons, and visual resources on demand.

**Shared design laws (always apply):**
- OKLCH color space only — never `#000`/`#fff`
- No gradient text, no side-stripe borders, no identical card grids
- Typography: cap body at 65–75ch, hierarchy via scale + weight (≥1.25 ratio)
- Motion: ease-out-quart/expo only — no bounce, no elastic
- The AI slop test: if it looks obviously AI-generated, rewrite it

---

### 🔧 Refactoring UI — `/refactoring-ui-plugin`

**Main file:** [refactoring-ui-plugin/SKILL.md](./refactoring-ui-plugin/SKILL.md)

Programmatic UI fixes based on proven design heuristics. Always start with `meta-refactor-ui` for triage — it identifies which sub-skills to load and in what order.

**11 Sub-skills:**

| # | Sub-skill | Fixes |
|---|----------|-------|
| meta | [meta-refactor-ui](./refactoring-ui-plugin/skills/meta-refactor-ui/SKILL.md) | Triage + orchestration — load first |
| 01 | [establish-visual-hierarchy](./refactoring-ui-plugin/skills/01-establish-visual-hierarchy/SKILL.md) | Flat, undifferentiated elements |
| 02 | [apply-typography-scale](./refactoring-ui-plugin/skills/02-apply-typography-scale/SKILL.md) | Inconsistent sizing or line heights |
| 03 | [build-color-palette](./refactoring-ui-plugin/skills/03-build-color-palette/SKILL.md) | Muddy or inconsistent colors |
| 04 | [apply-consistent-spacing](./refactoring-ui-plugin/skills/04-apply-consistent-spacing/SKILL.md) | Arbitrary padding/margins |
| 05 | [design-button-hierarchy](./refactoring-ui-plugin/skills/05-design-button-hierarchy/SKILL.md) | Primary/secondary weight issues |
| 06 | [eliminate-visual-clutter](./refactoring-ui-plugin/skills/06-eliminate-visual-clutter/SKILL.md) | Borders, cards, dividers overuse |
| 07 | [design-empty-states](./refactoring-ui-plugin/skills/07-design-empty-states/SKILL.md) | Blank or unhelpful zero-data views |
| 08 | [use-shadows-appropriately](./refactoring-ui-plugin/skills/08-use-shadows-appropriately/SKILL.md) | Incorrect elevation or depth |
| 09 | [manage-color-contrast](./refactoring-ui-plugin/skills/09-manage-color-contrast/SKILL.md) | Accessibility or legibility issues |
| 10 | [group-related-elements](./refactoring-ui-plugin/skills/10-group-related-elements/SKILL.md) | Disconnected or crowded groups |

**Fix order:** Always hierarchy → spacing → color → polish. One sub-skill per turn.

---

### 🏗️ UX Layers Framework — `/layers-skills`

**Sub-skills:** [layers-skills/skills/](./layers-skills/skills/)

9 UX strategy sub-skills covering the 5 dimensions of user experience design. Load `layers-intro` first to identify which layers need attention.

**9 Sub-skills (load in sequence):**

| Layer | File | Covers |
|-------|------|--------|
| Intro | [layers-intro](./layers-skills/skills/layers-intro/SKILL.md) | Layer selector — start here |
| 1. Product Strategy | [layers-product-strategy](./layers-skills/skills/layers-product-strategy/SKILL.md) | Business objectives, KPIs, personas, value propositions |
| 2. User Needs | [layers-user-needs](./layers-skills/skills/layers-user-needs/SKILL.md) | Customer workflows, pain points, jobs-to-be-done |
| 3. Conceptual Model | [layers-conceptual-model](./layers-skills/skills/layers-conceptual-model/SKILL.md) | Logical entities, data flow, mental maps |
| 4. Domain | [layers-domain](./layers-skills/skills/layers-domain/SKILL.md) | Boundary definitions, model structures, architecture |
| 5. Interaction Flow | [layers-interaction-flow](./layers-skills/skills/layers-interaction-flow/SKILL.md) | Page routing, state transitions, wizard processes |
| 6. Orient | [layers-orient](./layers-skills/skills/layers-orient/SKILL.md) | Breadcrumbs, placement indicators, site structure |
| 7. Surface | [layers-surface](./layers-skills/skills/layers-surface/SKILL.md) | Final UI aesthetics, glass properties, premium polish |
| 8. Observed Behaviour | [layers-observed-behaviour](./layers-skills/skills/layers-observed-behaviour/SKILL.md) | Analytics, session replays, click patterns |

**Protocol:** Work strategy → surface (top-down). Don't design the surface before understanding the strategy. Each layer produces specific artifacts before moving to the next.

---

### ⚙️ Core Engineering — `/retained-core-skills`

**7 high-fidelity engineering skills** curated for Next.js App Router + Expo monorepos.

#### 🌟 [Frontend Design](./retained-core-skills/frontend-design/SKILL.md)
Build modern, responsive web experiences from first principles.
- Liquid Glass, frosted overlays, fluid spacing, CSS Custom Properties, OKLCH color matrices
- Avoid: hard grids, plain cards, purple gradients, AI-slop aesthetics

#### 🛡️ [Harden & Robustness](./retained-core-skills/harden/SKILL.md)
Make code production-ready against all edge cases.
- Structural bounds check, i18n dynamic interpolation, error boundary wrapping
- Offline-first fallbacks — skeleton views when data fails, never blank screens

#### 🌐 [Next Browser Introspection](./retained-core-skills/next-browser/SKILL.md)
React DevTools and Next.js diagnostics as shell commands.
- React component tree, client state dumps, PPR hydration frames
- Network waterfall, actual DOM paint times, hydration analysis

#### 🚀 [Performance & Optimization](./retained-core-skills/optimize/SKILL.md)
Maximize Core Web Vitals — LCP, INP, CLS.
- Native lazy loading, responsive asset srcsets, non-blocking font pipelines
- Layout shift prevention, smart static builds, bundle splitting

#### ⚛️ [React 19 Optimistic UI](./retained-core-skills/react-19-optimistic-ui/SKILL.md)
Modern responsive state using native React 19 hooks.
- `useOptimistic` hook, graceful transaction fallbacks
- Instant UI updates, background action syncing

#### 📦 [Shadcn UI Customizer](./retained-core-skills/shadcn/SKILL.md)
Setup, build, and style dynamic custom components.
- Custom registry, Tailwind overrides, component composition, Radix accessibility

#### 🧩 [Vercel Composition Patterns](./retained-core-skills/vercel-composition-patterns/SKILL.md)
Clean, reusable React component architecture.
- Compound components, render props, context providers
- Eliminate prop-drilling and messy conditional layers

---

## 🗄️ Archived Skills — `/_archived-2026-05-20`

Legacy skills preserved for reference or specialized tasks.

| Bundle | Contents |
|--------|---------|
| Science | Custom research tools, mathematical processing, astrophysics scripts |
| Browser Automation | Puppeteer orchestration, automated Browserbase integrations |
| Firebase Tools | Security profiles, database sharding, serverless bindings |
| Developer Utilities | Directory crawling, automated git branch setup |
| Design Polish | Legacy adapt, animate, and color command variants |

---

## 📋 Deployed Projects

Skills from this workspace have been deployed to:

| Project | Path | Agent Layer |
|---------|------|-------------|
| AstroFusion (Next.js monorepo) | `astrofusion-nextjs/skills/design/` | `astrofusion-nextjs/.agents/ORCHESTRATOR.md` |

To add a new project: follow the 3-step deployment guide above and create a project-specific domain agent (like `astro-domain.agent.md`) for any domain-specific validation.

---

## ⚡ Quick Load Reference (for AI agents)

Copy this into a prompt to orient an AI agent immediately:

```
Skills workspace: /Users/bishalghimire/Documents/WORK/SKILLS/
Bundles:
  impeccable/SKILL.md          → 22-command design language
  refactoring-ui-plugin/SKILL.md → 11 UI fix sub-skills (start: meta-refactor-ui)
  layers-skills/skills/        → 9 UX strategy layers (start: layers-intro)
  retained-core-skills/        → 7 engineering skills (optimize, harden, next-browser…)

Routing: keyword → agent → skill chain (one skill per turn)
Design: design-director → impeccable → reference/<command>.md
UX: ux-strategist → layers-intro → layers-*/SKILL.md
Refactor: ui-refactor → meta-refactor-ui → 01–10 sub-skills
Perf/harden: engineering-lead → optimize/harden/next-browser
Validate: qa-validator → 5 gates (tests → a11y → i18n → perf → domain)
```
