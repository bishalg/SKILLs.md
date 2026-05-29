---
name: turborepo
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: Turborepo best practices for monorepo management.
globs: "turbo.json,package.json"
---
# Turborepo Best Practices

## When to Apply
Apply these rules when configuring build pipelines, adding new packages, or debugging cache issues in the monorepo.

## 1. Package Tasks vs Root Tasks (CRITICAL)
- **Rule**: DO NOT create Root Tasks. ALWAYS create package tasks.
- **Why**: Root tasks defeat parallelization.
- **Implementation**:
  - Define scripts in each package's `package.json` (e.g., `apps/web/package.json`).
  - Register the task in root `turbo.json`.
  - Root `package.json` should ONLY delegate: `"build": "turbo run build"`.

## 2. Using `turbo run`
- **Rule**: Always use `turbo run <task>` in scripts and CI.
- **Avoid**: `turbo <task>` shorthand is only for manual CLI usage.

## 3. Caching & Outputs
- **Missing Outputs**: If tasks run but outputs aren't restored, check the `outputs` key in `turbo.json`.
- **Environment config**: Ensure environment variables are correctly hashed by adding them to `globalEnv` or `env` in `turbo.json`.
- **Inputs**: Use `inputs` to declare file dependencies. defaulting to `["$TURBO_DEFAULT$", ".env"]` is often good practice.

## 4. Filtering
- **Changed Only**: Use `--affected` to run tasks only on changed packages and their dependents.
- **Specific Package**: Use `--filter=package-name` or `--filter=./path/to/package`.
- **Dependencies**: Use `--filter=package...` to include dependencies.
- **Dependents**: Use `--filter=...package` to include dependents.

## 5. Anti-Patterns
- **Chaining Turbo**: Avoid `turbo run build && turbo run test`. Let Turbo handle the graph.
- **Root .env**: Avoid relying on a root `.env` file for package-specific builds unless explicitly handled.
- **Global Dependencies**: Be specific with `globalDependencies` to avoid cache invalidation on unrelated changes.
