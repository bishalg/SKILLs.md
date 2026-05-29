# 🤖 Agentic Development Guide

**Transforming AI agents from chat-bots into autonomous software engineers using deterministic skill bundles.**

This repository is designed for the 2026 **Agent-First** era. It provides the "Expert Capabilities" that power autonomous coding systems like **Google Antigravity 2.0**, **Claude Code**, and **Gemini CLI**.

---

## 🏗️ The Core Thesis: Skill Injection

Traditional "Prompt Engineering" is fragile. It relies on the model's memory of its training data. **Skill Injection** shifts this by providing the agent with structured, deterministic "playbooks" (`SKILL.md` files) at runtime.

### Why this repo?
1. **Deterministic Quality:** Skills like `impeccable` enforce design laws (e.g., OKLCH, motion curves) that prevent "AI Slop."
2. **Context Efficiency:** Agents only load the specialized skill they need for the current task, keeping the context window lean and high-signal.
3. **Multi-Agent Orchestration:** Designed for systems where an **Orchestrator** delegates to **Specialists** (UX Strategist, UI Refactor, Engineering Lead).

---

## 🔄 The 5-Phase Agentic Workflow

Every feature implemented via these skills follows a structured loop. This ensures that the agent doesn't "hallucinate" code before understanding the product strategy.

1. **ORIENT (ux-strategist):** Loads `PRODUCT.md` and `DESIGN.md`. Maps user needs to technical entities.
2. **DESIGN (design-director):** Uses `impeccable craft` to plan the UI. Enforces the **Liquid Glass** aesthetic.
3. **BUILD (engineering-lead):** Implements using **Core Engineering** skills (Next.js, React 19, shadcn).
4. **REFINE (ui-refactor):** Sweeps for hierarchy, spacing, and clutter issues using **Refactoring UI** heuristics.
5. **VALIDATE (qa-validator):** A 5-gate protocol checking: Tests → A11y → i18n → Perf → Domain.

---

## 🛠️ Integration: Antigravity & Claude Code

### Google Antigravity 2.0
Antigravity uses these as **Mission Control Skills**.
- **Installation:** Symlink this repo into your Antigravity skills directory.
- **Usage:** Antigravity will automatically detect keywords (e.g., "polish this UI") and activate the `impeccable polish` command.
- **Browser Autonomy:** Use the `live` command to launch Antigravity's browser-autonomy layer for visual verification.

### Claude Code & MCP
Claude Code consumes these via the **Model Context Protocol (MCP)**.
- **Specialist Spawning:** Claude Code can spawn sub-agents for specific files using the routing logic in `.agents/ORCHESTRATOR.md`.
- **Persistent Context:** The `load-context.mjs` script feeds `PRODUCT.md` and `DESIGN.md` directly into Claude's Reasoning Loop.

---

## 🎭 Specialist Agent Anatomy

When these skills are deployed, they power specific agent personas:

| Agent | Core Skill | Role |
|-------|------------|------|
| **Design Director** | `impeccable` | Visual identity, "Liquid Glass" implementation, aesthetic quality. |
| **UX Strategist** | `ux-layers` | Product strategy, user workflows, mental models. |
| **UI Refactor** | `refactoring-ui` | Heuristic-driven fixes, visual hierarchy, spacing. |
| **Engineering Lead** | `core-engineering` | Architecture, React 19 patterns, Performance (LCP/INP). |
| **QA Validator** | `5-gate protocol` | Guardrail enforcement, accessibility, translation verification. |

---

## 🚦 Deterministic Quality vs. AI Slop

The `impeccable` design language is the core of this project. It is specifically built to "Match-and-Refuse" common AI patterns:
- ❌ **No side-stripe borders:** A common "lazy" AI accent.
- ❌ **No gradient text:** Decorative fluff without meaning.
- ❌ **No identical card grids:** The "standard" AI layout.
- ❌ **No purple-to-blue gradients:** The "2024 AI aesthetic" defaults.

By enforcing **OKLCH color matrices** and **exponential easing**, the output feels "Design-First," not "Prompt-First."

---

## 🚀 Getting Started with Agentic Coding

To use these skills in a new project:
1. **Scaffold:** Run `impeccable teach` to define your product's soul in `PRODUCT.md`.
2. **Inject:** Deploy the `.agents/` layer to your project root.
3. **Command:** Use slash commands (e.g., `/craft`, `/polish`, `/harden`) to trigger the specialists.

---

> *"The best code is not written; it is orchestrated by experts following proven laws."*
