# 🏗️ Monorepo Integration & MCP Registration

In a large monorepo (NX, Turborepo), loading the entire `SKILLS` workspace into every sub-project's context is inefficient. Use these localization patterns to optimize token usage.

---

## 🛰️ Model Context Protocol (MCP) Registration

To use the automated verification tools, you must register the local MCP server in your IDE or CLI.

### For Cursor
Add this to `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "skill-hub-tools": {
      "command": "bun",
      "args": ["run", ".agents/mcp-server/src/index.ts"],
      "autoStart": true
    }
  }
}
```

### For Claude Code
Add this to `.claude.json` or run:
```bash
claude mcp add skill-hub-tools bun run .agents/mcp-server/src/index.ts
```

---

## 🛰️ Localized `.cursorrules` (Per-App)

Place a `.cursorrules` file in `apps/mobile/` or `apps/web/` to pin specific sub-agents.

```markdown
# apps/mobile/.cursorrules

// Pin the Engineering Lead with Mobile-specific skills
@SKILLS/agents/engineering-lead.md

// Mandate local theme checks via MCP
// The agent will automatically discover 'validate_oklch' via the MCP Server.
```

---

## 📦 Deployment via `skill-hub` CLI

Instead of manual symlinks, use the CLI to initialize a sub-project:
```bash
npx skill-hub init
```
This will automatically scaffold the `.agents` directory and wire the MCP server.
