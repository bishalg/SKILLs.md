# 🤝 Contributor's Playbook

Welcome to the AI Skill Hub! We are building the world's most deterministic, high-fidelity agentic ecosystem. To maintain our "No AI Slop" guarantee, all contributions must adhere to these strict standards.

---

## 🎭 1. Adding a New Agent
Every agent persona must live in `/agents/*.md` and follow the 4-heading standard.

### Heading Template:
```markdown
# 🎭 Sub-Agent: [Agent Name]

## 1. Role
Define the identity, domain, and specific expertise. (e.g., "You are the Liquid Glass architect...")

## 2. Context Loading
List mandatory paths from `/skills/` and `/contracts/`.

## 3. Constraints
What the agent is allowed/forbidden to modify. (e.g., "Logic Ban", "Strict OKLCH only").

## 4. Handoff Protocol
Define the structured Markdown/JSON artifact format for the next agent.
```

**Next Step:** Add your agent to the `/orchestrator/registry.yaml` with its `trigger_keywords` and `required_context`.

---

## 🛠️ 2. Adding an MCP Tool
We use the **Model Context Protocol** for all external interactions.

1.  **Develop:** Create a new tool function in `/mcp-server/src/tools/`.
2.  **Instrument:** Wrap your tool with the `instrumentTool` utility from `telemetry.ts` for observability.
3.  **Register:** Add the tool definition to `ListToolsRequestSchema` in `mcp-server/src/index.ts`.
4.  **Eval:** Add a test case to `/evals/` to verify the tool's behavior.

---

## 🚦 3. The "No AI Slop" Guarantee
We enforce high design and engineering standards through automated quality gates.
- **PR Requirement 1:** Must pass the `.github/workflows/agentic-evals.yml`.
- **PR Requirement 2:** Must include an updated "Golden Dataset" test case if adding a new agent.
- **Strict Prohibition:** Any agent logic that encourages side-stripe borders, HEX colors, or generic card grids will be rejected.

---

## 📈 4. Telemetry & Observability
All agent turns are traced via OpenTelemetry. Ensure your sub-agent provides high-signal outputs to maintain a low token-to-meaning ratio.
