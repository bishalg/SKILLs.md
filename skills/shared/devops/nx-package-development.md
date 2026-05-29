---
name: nx-package-development
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: How to create and fix NX packages that build correctly in the monorepo
created: 2025-12-17
last_updated: 2026-01-07
---

# NX Package Development Guidelines

This workflow documents how packages should be built in the AstroFusion NX monorepo to avoid build issues.

## Problem Context

The monorepo uses:
- **tsconfig.base.json** with `moduleResolution: "bundler"` and `noEmit: true` for Next.js apps
- **NX** for task orchestration and caching
- **Individual packages** that need to emit compiled JavaScript

The base tsconfig settings conflict with package compilation. Each package must override these settings.

---

## Package Structure Template

```
packages/{package-name}/
├── src/
│   ├── index.ts          # Re-exports from lib/
│   └── lib/
│       └── {package-name}.ts
├── dist/                  # Compiled output (git-ignored)
├── package.json
├── project.json           # NX configuration
├── tsconfig.json          # Base package tsconfig
└── tsconfig.lib.json      # Library build config
```

---

## Required Files

### 1. `package.json`

```json
{
  "name": "@astrofusion/{package-name}",
  "version": "0.0.1",
  "private": true,
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "module": "dist/index.js",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "../../node_modules/.bin/tsc -p tsconfig.lib.json"
  },
  "dependencies": {
    "tslib": "^2.3.0"
  }
}
```

**Key points:**
- `main` points to `dist/index.js` (NOT `src/`)
- Build script uses `-p tsconfig.lib.json` (NOT `-b`)

### 2. `tsconfig.lib.json`

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "noEmit": false,
    "moduleResolution": "node",
    "module": "commonjs",
    "types": ["node"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["**/*.test.ts", "**/*.spec.ts"]
}
```

**Critical overrides:**
- `noEmit: false` - overrides base config's `noEmit: true`
- `moduleResolution: "node"` - overrides `"bundler"` which prevents output
- `module: "commonjs"` - ensures compatible output

### 3. `project.json`

```json
{
  "name": "{package-name}",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/{package-name}/src",
  "projectType": "library",
  "tags": [],
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "outputs": ["{projectRoot}/dist"],
      "options": {
        "commands": ["pnpm build"],
        "cwd": "packages/{package-name}"
      }
    }
  }
}
```

**Key points:**
- Use `nx:run-commands` executor (NOT `@nx/js:tsc`)
- The `@nx/js:tsc` executor outputs to `dist/packages/` which conflicts with local `dist/`
- `outputs` should be `{projectRoot}/dist` for proper caching

### 4. Update `tsconfig.base.json`

Add path mapping to the root tsconfig.base.json:

```json
"paths": {
  "@astrofusion/{package-name}": ["packages/{package-name}/dist/index.d.ts"]
}
```

**Important:** Point to `dist/index.d.ts`, NOT `src/index.ts`

---

## Creating a New Package

1. Create the package directory structure:
   ```bash
   mkdir -p packages/{name}/src/lib
   ```

2. Create `src/index.ts`:
   ```typescript
   export * from './lib/{name}';
   ```

3. Create `src/lib/{name}.ts` with your code

4. Copy template files from a working package:
   ```bash
   cp packages/core-kundali/package.json packages/{name}/
   cp packages/core-kundali/tsconfig.json packages/{name}/
   cp packages/core-kundali/tsconfig.lib.json packages/{name}/
   cp packages/core-kundali/project.json packages/{name}/
   ```

5. Update all files with your package name

6. Add path mapping to `tsconfig.base.json`

7. Add dependency to consuming app's `package.json`:
   ```json
   "@astrofusion/{name}": "workspace:*"
   ```

8. Run `pnpm install`

9. Build the package:
   ```bash
   cd packages/{name} && pnpm build
   ```

---

## Fixing a Broken Package

If a package fails to build:

1. Check if `dist/index.js` exists after running `pnpm build`
2. If not, verify `tsconfig.lib.json` has:
   - `noEmit: false`
   - `moduleResolution: "node"`
   - `module: "commonjs"`
3. Verify `project.json` uses `nx:run-commands` instead of `@nx/js:tsc`
4. Verify `tsconfig.base.json` has path pointing to `dist/index.d.ts`

---

## Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| Module not found | `dist/index.js` missing | Rebuild package with correct tsconfig |
| `rootDir` error | Cross-package source compilation | Use `dist/` paths in tsconfig.base.json |
| No output after build | Inherited `noEmit: true` | Add `noEmit: false` to tsconfig.lib.json |
| Duplicate exports | Named exports + re-exports | Remove duplicate export statements |
