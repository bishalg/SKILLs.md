# 🧠 AI Skills Workspace: Multi-Agent Edition

**A hierarchical, multi-agent architecture for autonomous software engineering.**

This repository implements the **Router/Sub-agent** pattern, designed to optimize the context window and reasoning depth of modern AI agents. By separating **Persona** (who the agent is) from **Knowledge** (what the agent knows), we achieve deterministic, high-fidelity code generation with minimal token waste.

---

## 🏗️ Philosophy

### 1. Context Isolation
Agents are only as good as their context. In this architecture, a sub-agent only loads the specific "Skills" (knowledge files) it needs for its current task. This prevents "Reasoning Drift" and keeps the agent focused on its domain.

### 2. Separation of Concerns
- **Orchestrator (`/orchestrator`):** The non-coding "Brain." Manages the workflow and delegates.
- **Agents (`/agents`):** Personas with strict identities, constraints, and handoff protocols.
- **Skills (`/skills`):** Pure domain knowledge, design laws, and engineering standards.
- **Contracts (`/contracts`):** Formal schemas for inter-agent communication.

### 3. The 5-Phase Workflow
Every feature request moves through a controlled pipeline:
`ORIENT` → `DESIGN` → `BUILD` → `REFINE` → `VALIDATE`.

---

## 🚀 Integration Guide

### 🛰️ For AI IDEs (Cursor, Antigravity)
To use this system, point your IDE to the `ROUTER.md` as the primary rule file.

1. **Global Rules:** Add the path to `orchestrator/ROUTER.md` to your `.cursorrules` or project-wide instructions.
2. **Task Activation:** When you issue a request, the Router will automatically identify the phase and instruct you (or another agent) to load the corresponding `/agents/` persona.

### 💻 For Terminal AI (Claude Code)
Integrate this into your `CLAUDE.md` to drive autonomous execution.

```markdown
# Agentic Workflow
1. Start with `orchestrator/ROUTER.md` to plan the task.
2. Load the assigned persona from `agents/`.
3. Load the required knowledge from `skills/`.
4. Produce the handoff artifact defined in `contracts/`.
```

### 🛠️ Manual Deployment
If you are building an agentic loop manually:
- **Phase 1:** Spawn a supervisor using `ROUTER.md`.
- **Phase 2:** Supervisor calls `design-director.md` + `skills/design/*` to build the UI.
- **Phase 3:** Supervisor calls `engineering-lead.md` + `skills/engineering/*` to implement logic.

---

## 📂 Workspace Structure

- `/orchestrator/` - Supervisor logic and routing table.
- `/agents/` - Specialist personas (Design, UX, Engineering, QA).
- `/skills/` - Domain knowledge and design laws.
- `/contracts/` - Handoff schemas and artifact protocols.
- `/examples/` - Workflow traces and mock interactions.

---

## ⚖️ Disclosure & Origins
This project curates original architectural research (The Agentic Layer, Liquid Glass) alongside synthesized best practices (Refactoring UI, UX Layers). See the [Manifesto](./AGENTIC_DEVELOPMENT.md) for the full 2026 vision.
