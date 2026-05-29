---
name: architecture-rules
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: AstroFusion Monorepo Architecture Rules (ESM/CJS, Paths, Module Identity). READ THIS BEFORE CREATING NEW PACKAGES.
created: 2026-02-11
last_updated: 2026-02-11
---

# AstroFusion Monorepo Architecture Rules & Context

> [!IMPORTANT]
> **This is the single source of truth for the Monorepo Architecture.**
> Future Agents: Read this carefully to avoid regression of the "Split Identity" / "Dist Trap" issues.

## 1. The Core Philosophy: "Unbroken Source"

We follow a **Source-First** architecture for internal packages.
- **Problem**: In the past, we mixed `dist/` (compiled) and `src/` (source) paths. This caused "Module Not Found" errors because Next.js `transpilePackages` expects source files, while some tools expected compiled output that didn't exist yet.
- **Solution**: All internal packages must be consumed via `src/index.ts`. We rely on the consuming app (Next.js) to transpile them.

---

## 2. Root Cause Analysis: The "Dist Trap"

### Why we moved away from `dist/` imports
Historically, the `tsconfig.base.json` pointed to `dist/index.d.ts` for many packages. This created a recurring failure loop:
1. Developer adds code to `files/src`.
2. App tries to import it.
3. TSConfig points to `dist/`.
4. `dist/` is stale or missing (because we don't run a global build on every save).
5. **Build Fails**.

**The Reference Rule:**
> **NEVER** point to `dist/` for a package that exists in the workspace, unless it is a legacy/compiled-only artifact (like `@af/sweph`). Always point to `src/index.ts`.

---

## 3. Module Identity: ESM vs. CJS

The monorepo uses a **Hybrid Module Strategy**:

### ✅ Shared Packages MUST be ESM
All packages in `packages/*` that are consumed by standard apps (Web, API, etc.) MUST declare `"type": "module"` in their `package.json`.

**Rationale**: The root `package.json` is `"type": "module"`. If a package lacks this field, it defaults to CJS. This causes "Require of ES Module" errors when strict ESM tools (like Vite/Rollup/Next) try to bundle them together.

```json
// packages/my-new-package/package.json
{
  "name": "@astrofusion/my-new-package",
  "version": "1.0.0",
  "type": "module", // <--- CRITICAL
  "main": "./src/index.ts", // Point to source for transpilePackages
  "exports": {
    ".": "./src/index.ts"
  }
}
```

### ✅ Apps Can Be Independent
Apps in `apps/*` define their own module strategy:
- **Web (Next.js)**: `"type": "module"` (Recommended)
- **API (Hono/Node)**: `"type": "module"` (Recommended)
- **Mobile (Expo)**: `"type": "commonjs"` (Must be CJS for Metro bundler compatibility)

---

## 4. Configuration Rules

### ✅ Use Source Paths in `tsconfig.base.json`
**In `config/tsconfig.base.json`:**
```json
"paths": {
  "@astrofusion/my-package": ["packages/my-package/src/index.ts"]
}
```

**FORBIDDEN:**
```json
// ❌ DO NOT DO THIS definition
"@astrofusion/my-package": ["packages/my-package/dist/index.d.ts"]
```

### ⚠️ Exception: Legacy Packages
A few legacy packages (e.g., `foundation`, `meditation-journey-core`, `@astrofusion/sweph`) do not have source code in the repo or require complex build steps. These are the **ONLY** exceptions allowed to point to `dist/`.

### ✅ Prefer ESM Config Files
- Use `.mjs` or `"type": "module"` compatible `.js` files.
- Avoid `.cjs` unless specifically required by a CJS-only tool (like some Jest presets).

---

## 5. Workflows

### Adding a New Package
1. Create folder in `packages/`.
2. Run `pnpm init`.
3. **Add `"type": "module"`**.
4. Create `src/index.ts`.
5. Add path alias to `config/tsconfig.base.json` pointing to `src/index.ts`.
6. Add package name to `transpilePackages` in `apps/web/next.config.mjs`.

### Validation
Run the architecture validation script to ensure compliance:
```bash
node scripts/validation/validate-monorepo-architecture.js
```

---

## 6. Mobile Architecture (Expo)

> [!NOTE]
> For detailed Mobile workflow, see [expo-development.md](./expo-development.md).

### Distinct Constraints
- **Module Format**: `apps/mobile` MUST be CommonJS (for Metro).
- **Native Modules**: Node.js C++ addons (like `@af/sweph`) **CANNOT** be imported directly. Use the API or pure JS alternatives.
- **Navigation**: Uses `React Navigation` (Stack/Tab) as per `apps/mobile/src/app/App.tsx`.
