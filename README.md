# 🧠 AI Skills Workspace: V2 Dynamic Architecture

**A stateful, evaluated, and tool-augmented multi-agent ecosystem for 2026.**

---

## 🤖 Agentic Development Guide
For deep dives into **Antigravity**, **Claude Code**, and **Gemini CLI**, see the [**Agentic Development Guide**](./AGENTIC_DEVELOPMENT.md).

---

## 🏗️ Phase 2: Evals, Tooling, and Token Efficiency

This repository has been upgraded to **V2: Dynamic Infrastructure**. The core architecture now supports automated quality enforcement and stateful session management.

### 1. Dynamic Skill Registry (`/orchestrator/registry.yaml`)
We have moved away from hardcoded routing. The `registry.yaml` is the single source of truth for agent identities, keyword triggers, and context paths. The Router parses this dynamically to build its mission plan.

### 2. Agentic Evaluation Framework (`/evals/`)
Agents are tested like code.
- **VERIFIER Agent:** A dedicated auditor that grades agent artifacts against the `/contracts/` using a quantitative [Grading Rubric](./evals/grading-rubric.md).
- **Golden Datasets:** `/evals/router-eval.yaml` ensures the Router's intent-detection remains high-precision.

### 3. State Management & HITL Breakpoints (`/state/`)
The `ROUTER.md` now implements a **Breakpoint Protocol**. After the **DESIGN** phase, the system MUST pause for Human-in-the-Loop (HITL) approval before proceeding to implementation. This prevents runaway token burn on unapproved directions.

### 4. Safe Tooling & Sandboxing (`/tools/`)
Agents are now "Tool-Augmented."
- **Mandated Verification:** The `qa-validator` MUST run the `validate-oklch.js` and `run-a11y-audit.sh` tools before issuing a verdict.
- **Manifest:** All allowed tools are defined in `/tools/manifest.json`.

---

## 🏗️ Philosophy

- **Context Isolation:** Sub-agents only load what they need.
- **Separation of Concerns:** Persona (`/agents`) vs. Knowledge (`/skills`).
- **Token Efficiency:** [Monorepo Localization Patterns](./topology/MONOREPO_INTEGRATION.md) for large-scale projects.

---

## 📂 Workspace Structure

- `/orchestrator/` - Dynamic Registry & Supervisor logic.
- `/agents/` - Specialist personas with tool mandates.
- `/skills/` - Pure domain knowledge (Design, Engineering, UX).
- `/evals/` - Verification agents and grading rubrics.
- `/tools/` - Sandboxed verification scripts and manifest.
- `/state/` - Session schemas for tracking progress.
- `/contracts/` - Handoff schemas.
- `/topology/` - Monorepo and localization guides.

---

## 🚀 How to Run Evals
1. **Artifact Check:** Pass an agent output to the `VERIFIER` agent.
2. **Router Check:** Run the `router-eval.yaml` test cases through your IDE's evaluation harness.
3. **Tool Check:** Manually verify tools via `node tools/validate-oklch.js .`.

---

## ⚖️ Disclosure & Origins
Original research (**Liquid Glass**, **Agentic Layer**) + Synthesized best practices (**Refactoring UI**, **UX Layers**).
