# 🚀 GTM Launch Kit: SKILLs.md

Use these assets to launch **SKILLs.md** on social platforms and technical forums.

---

## 1. Show HN (Hacker News)
**Title:** Show HN: SKILLs.md – A self-healing, multi-agent architecture for AI IDEs with native MCP
**Text:**
> Hi HN, I’m open-sourcing SKILLs.md, a decentralized agentic framework designed to solve the biggest bottlenecks in AI-assisted coding: Context Window Bloat, "AI Slop", and fragile prompt chains.
>
> Instead of feeding an LLM a massive, monolithic system prompt, this architecture uses a **Router/Sub-Agent pattern** with strict context isolation:
> 
> **1. Decoupled Knowledge vs. Persona:** Pure domain knowledge (e.g., Liquid Glass aesthetics, OKLCH matrices, UX strategy) lives in `/skills/`, while behavioral personas live in `/agents/`. The Router only loads the exact skills needed per turn, saving massive amounts of tokens.
> **2. Native MCP Tooling:** Agents don't just "guess" if code is good. They use a local Model Context Protocol (MCP) server to run empirical validations (e.g., `validate_oklch`, `run_a11y_audit`) before handing off work.
> **3. Self-Healing Reflection Loops:** If the QA Validator catches an error, it doesn't just fail. It generates a structured `fix-ticket.json` and the Router automatically re-routes it back to the offending agent for up to 3 autonomous retries before asking for human intervention.
> **4. GenAI Observability:** Fully instrumented with OpenTelemetry. You can spin up a local Jaeger instance via Docker to visually trace agent thought-processes, tool latencies, and token consumption.
>
> It includes a 22-command deterministic design language (`impeccable`), a UI fix engine, and a 5-phase SDLC workflow (ORIENT → DESIGN → BUILD → REFINE → VALIDATE). 
>
> Repo: https://github.com/bishalg/SKILLs.md

---

## 2. X (Twitter) Thread
**Tweet 1:**
Most AI coding setups are just a massive system prompt that burns tokens, loses context, and generates "AI slop." 
So I built an Agentic OS for Cursor & Claude Code that manages its own context, uses native MCP tools, and *fixes its own mistakes*.
Open-sourcing SKILLs.md today 🧵👇

**Tweet 2:**
The Architecture: Router / Sub-Agent
Instead of one god-agent, a central `ROUTER.md` analyzes intent and delegates to highly constrained specialists (Design Director, Engineering Lead, QA Validator). 
Rule: Exactly ONE specialist per turn. Context bloat is dead.

**Tweet 3 (Self-Healing):**
The Killer Feature: Self-Healing Loops 🔄
If QA fails, it generates a `fix-ticket.json`. 
The Router intercepts it and auto-routes it back to the Engineering Lead with the exact error context. Up to 3 auto-retries before it bothers the human.

**Tweet 4 (Observability):**
Enterprise Observability 🔭
Debugging agents via `console.log` is over. 
SKILLs.md is instrumented with OpenTelemetry. Spin up Jaeger via Docker and watch your agents' thought waterfalls in real-time.

---

## 3. Reddit (r/ChatGPTCoding, r/LocalLLaMA)
**Title:** I got tired of AI context-bloat and "AI Slop", so I built a self-healing Multi-Agent OS (Open Source)
**Body:**
> Hey everyone, 
> I've been experimenting with agentic workflows in Cursor and Claude Code, and I kept running into the same issues: context windows filling up with irrelevant code, agents forgetting constraints, and generating generic "AI slop" UI.
> 
> To fix this, I built **SKILLs.md**, a decentralized multi-agent architecture that treats AI coding like a real engineering org.
> 
> **Core Concepts:**
> * **The 5-Phase Workflow:** ORIENT → DESIGN → BUILD → REFINE → VALIDATE.
> * **Strict Handoff Contracts:** Agents don't just chat; they output structured JSON/Markdown artifacts.
> * **Self-Healing Loops:** QA failures trigger automated `fix-tickets` and routing retries.
> * **Agentic Memory:** A `retrospective` agent learns from past mistakes.
> * **OTel Tracing:** View agent traces in Jaeger.
> 
> Repo: https://github.com/bishalg/SKILLs.md
