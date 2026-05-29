# 🧠 AI Skills Workspace: V4 Platform & Observability

![Build Passing](https://img.shields.io/badge/Build-Passing-success)
![Evals Score](https://img.shields.io/badge/Evals_Score-100%25-blue)

**An autonomous, self-healing multi-agent ecosystem with native MCP tooling and OpenTelemetry observability.**

---

## 🚀 Phase 4: Platform, DX, and Observability

This repository has been upgraded to **V4: The Distribution & Observability Layer**. We have optimized for scale, community contribution, and deep execution visibility.

### 1. The `skill-hub` CLI (`/packages/cli/`)
Deploy the entire agentic framework to any project in seconds.
```bash
npx skill-hub init
```
- Automatically scaffolds the `.agents/` hierarchy.
- Registers the local MCP server in your IDE config.
- Installs core agents and skills.

### 2. Native Model Context Protocol (MCP)
All tools are now native **MCP Server** capabilities.
- Tools like `validate_oklch` and `run_a11y_audit` are discovered dynamically by clients like **Claude Code** and **Cursor**.
- Zero shell-script dependency; tools are executed in a typed, secure environment.

### 3. Agentic Observability & Telemetry (`/observability/`)
Absolute visibility into your agent waterfall.
- **Trace Everything:** Every turn, tool call, and token is logged via **OpenTelemetry**.
- **Visual Traces:** Spin up a local **Jaeger** instance via Docker to see execution timelines and latency.
- **Token Telemetry:** Monitor Input/Output token consumption per agent to optimize costs.

### 4. Self-Healing & Memory
- **Autonomous Fixes:** System automatically routes `fix-tickets` back to agents for up to 3 retries.
- **Lessons Learned:** Agents read the `/memory/` layer to avoid repeating past architectural mistakes.

---

## 📦 Integration Guide

### Quick Start
1.  **Initialize:** `npx skill-hub init`
2.  **Monitor:** `docker-compose -f .agents/observability/docker-compose.yml up`
3.  **Audit:** Run `node .agents/mcp-server/src/index.ts` to connect your IDE to the tool server.

---

## 📂 Workspace Structure

- `/orchestrator/` - Dynamic Registry & Supervisor logic.
- `/packages/cli/` - DX tool for distribution and init.
- `/mcp-server/` - Native MCP Tool Server.
- `/observability/` - OpenTelemetry integration and Jaeger setup.
- `/agents/` - Specialist personas with OTel instrumentation.
- `/skills/` - Pure domain knowledge (Design, Engineering, UX).
- `/docs/` - [Detailed Architecture Diagrams](./docs/ARCHITECTURE.md).

---

## 🤝 Contributing
Ready to build the future of agentic engineering? Read our [**Contributor's Playbook**](./CONTRIBUTING.md).

---

## ⚖️ Disclosure & Origins
Original research (**Liquid Glass**, **Agentic Layer**) + Synthesized best practices (**Refactoring UI**, **UX Layers**).
