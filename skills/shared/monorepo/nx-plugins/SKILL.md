---
name: nx-plugins
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
name: nx-plugins
description:
  Find and add Nx plugins. USE WHEN user wants to discover available plugins,
  install a new plugin, or add support for a specific framework or technology to
  the workspace.
---

## Finding and Installing new plugins

- List plugins: `pnpm nx list`
- Install plugins `pnpm nx add <plugin>`. Example: `pnpm nx add @nx/react`.
