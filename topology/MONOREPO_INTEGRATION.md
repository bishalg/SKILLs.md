# 🏗️ Monorepo Integration & Localization

In a large monorepo (NX, Turborepo), loading the entire `SKILLS` workspace into every sub-project's context is inefficient. Use these localization patterns to optimize token usage.

---

## 🛰️ Localized `.cursorrules` (Per-App)

Place a `.cursorrules` file in `apps/mobile/` or `apps/web/` to pin specific sub-agents.

```markdown
# apps/mobile/.cursorrules

// Pin the Engineering Lead with Mobile-specific skills
@SKILLS/agents/engineering-lead.md
@SKILLS/skills/engineering/react-native/ (if exists)

// Mandate local theme checks
@SKILLS/tools/validate-oklch.js
```

---

## 💻 Claude CLI Config (Project-Root)

Configure `CLAUDE.md` to point to the `ROUTER.md` but allow deep-linking to sub-agents.

```markdown
# Agentic Topology
Primary Router: ./orchestrator/ROUTER.md

When working in 'apps/marketing', prioritize:
- Agent: design-director
- Knowledge: skills/design/brand.md
```

---

## 📦 Deployment via Symlinks

Instead of copying the repo, use symlinks to keep skills synced across the monorepo.

```bash
ln -s /path/to/SKILLS/agents/design-director.md ./apps/web/.agents/design-director.md
```

This ensures that any update to the central `SKILLS` repository is immediately available to all sub-projects.
