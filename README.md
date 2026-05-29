# 🧠 AI Skills Workspace

**An autonomous, self-healing, and state-aware multi-agent ecosystem for high-fidelity engineering.**

![Build Passing](https://img.shields.io/badge/Build-Passing-success)
![Evals Score](https://img.shields.io/badge/Evals_Score-100%25-blue)

---

## 🚀 Overview

SKILLs.md is a decentralized agentic framework designed to solve the biggest bottlenecks in AI-assisted coding: **Context Window Bloat**, **"AI Slop"**, and **Fragile Prompt Chains**. 

Instead of feeding an LLM a monolithic system prompt, this architecture uses a **Router/Sub-Agent pattern** with strict context isolation, empirical MCP-based verification, and autonomous self-healing loops.

---

## 🏗️ Core Architecture

### 1. Decoupled Knowledge vs. Persona
- **Knowledge (`/skills/`):** Pure domain knowledge (e.g., Liquid Glass aesthetics, OKLCH matrices, UX strategy).
- **Personas (`/agents/`):** Behavioral identities and task constraints. 
The Supervisor only loads the exact skills needed per turn, maximizing token efficiency.

### 2. Native MCP Tooling
Agents use a local **Model Context Protocol (MCP)** server to run empirical validations before handing off work. 
- `validate_oklch`: Prevents HEX/RGB leaks.
- `run_a11y_audit`: Mathematically proves accessibility.

### 3. Self-Healing Reflection Loops
If the QA Validator catches an error, it generates a structured `fix-ticket.json`. The Router automatically re-routes this back to the originating agent for up to 3 autonomous retries before asking for human intervention.

### 4. Enterprise Observability & Telemetry
Fully instrumented with **OpenTelemetry**. Use the included Jaeger/Docker setup to visually trace agent thought-processes, tool latencies, and token consumption.

---

## 📦 Deployment & Integration

### The `skill-hub` CLI
Deploy the framework into any project instantly:
```bash
npx skill-hub init
```
This scaffolds the `.agents/` hierarchy and registers the local MCP server in your IDE (Cursor, Claude Code, etc.).

### Workflow Lifecycle
Every feature request follows a deterministic 5-phase loop:
1. **ORIENT** (UX Strategy)
2. **DESIGN** (Visual Identity) → *HITL Approval Required*
3. **BUILD** (Logic & Logic)
4. **REFINE** (Visual Polish)
5. **VALIDATE** (QA & Audit)

---

## 🛡️ Security & Token Management

- **Sandboxed Execution:** Configure `SKILL_HUB_SANDBOX=true` in your `.env` to run community tools in isolated containers.
- **Context Compaction:** The system automatically summarizes long history chains when token thresholds are breached.
- **Cost Kill-Switches:** Define a session budget (e.g., `MAX_SESSION_COST=2.00`) to force an immediate stop if a self-healing loop exceeds the limit.

---

## 📂 Workspace Structure

- `/orchestrator/` - Dynamic Registry & Supervisor logic.
- `/packages/cli/` - DX tool for distribution and init.
- `/mcp-server/` - Native MCP Tool Server.
- `/observability/` - OpenTelemetry integration and Jaeger setup.
- `/agents/` - Specialist personas.
- `/skills/` - Pure domain knowledge.
- `/memory/` - Retrospective logs and lessons learned.
- `/docs/` - [Detailed Architecture Diagrams](./docs/ARCHITECTURE.md).

---

## 🤝 Contributing
Ready to build the future of agentic engineering? Read our [**Contributor's Playbook**](./CONTRIBUTING.md).

---

## ⚖️ Disclosure & Origins
Original research (**Liquid Glass**, **Agentic Layer**) + Synthesized best practices (**Refactoring UI**, **UX Layers**).
