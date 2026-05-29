# 🧠 AI Skills Workspace: V3 Autonomous Ecosystem

**An autonomous, self-healing, and CI/CD integrated multi-agent ecosystem for 2026.**

---

## 🤖 Agentic Development Guide
For deep dives into **Antigravity**, **Claude Code**, and **Gemini CLI**, see the [**Agentic Development Guide**](./AGENTIC_DEVELOPMENT.md).

---

## 🚀 Phase 3: MCP, Self-Healing, and Agentic CI/CD

This repository is now fully upgraded to **V3**. It moves beyond state tracking into **autonomous correction** and **long-term memory**.

### 1. Model Context Protocol (MCP) Server
We have migrated from raw shell scripts to an industry-standard **MCP Server** (`/mcp-server/`).
- Exposes tools like `validate_oklch` and `run_a11y_audit` natively to MCP clients.
- Built with `@modelcontextprotocol/sdk` and optimized for fast cold-starts via Bun.
- See [Monorepo Integration](./topology/MONOREPO_INTEGRATION.md) for how to register this server in Claude Code or Cursor.

### 2. Self-Healing Reflection Loops
Agents now fix their own mistakes without human intervention.
- **Fix Tickets:** If the `qa-validator` detects a failure, it outputs a standardized `fix-ticket.json` instead of a generic FAIL.
- **Automated Routing:** The `ROUTER.md` intercepts this ticket, sends it back to the offending agent (e.g., `design-director`), and mandates a fix. The system allows 3 automated retries before triggering a human breakpoint.

### 3. Agentic Memory Layer (`/memory/`)
Agents learn from past sessions.
- **Retrospective Agent:** Runs at the end of the `VALIDATE` phase to analyze the session code diffs and `fix-tickets`.
- **Lessons Learned:** It updates `/memory/lessons-learned.md` with "Anti-Patterns Discovered" and "Token Wasters." The Router loads this during the `ORIENT` phase of future tasks.

### 4. CI/CD for Agent Evals (`.github/workflows/`)
We test our agents on every PR.
- **Agentic Eval Action:** `.github/workflows/agentic-evals.yml` runs automatically when `/agents/` or `/skills/` are modified.
- **Automated Scoring:** It runs the Golden Dataset (`/evals/router-eval.yaml`) and posts the score directly as a PR comment.

### 5. Automated Skill Syncing (`/scripts/`)
No more manual copy-pasting. Deploy updates to host projects instantly.
```bash
bash scripts/sync-skills.sh --target ../my-nextjs-app
```

---

## 📂 Workspace Structure

- `/orchestrator/` - Dynamic Registry & Supervisor logic.
- `/agents/` - Specialist personas with tool mandates.
- `/skills/` - Pure domain knowledge (Design, Engineering, UX).
- `/contracts/` - Handoff schemas and `fix-tickets`.
- `/mcp-server/` - Native MCP Tool Server.
- `/memory/` - Retrospective logs and lessons learned.
- `/evals/` - Verification agents and CI datasets.
- `/state/` - Session schemas.
- `/scripts/` - Deployment and sync automation.
- `/topology/` - Monorepo and localization guides.

---

## ⚖️ Disclosure & Origins
Original research (**Liquid Glass**, **Agentic Layer**) + Synthesized best practices (**Refactoring UI**, **UX Layers**).
