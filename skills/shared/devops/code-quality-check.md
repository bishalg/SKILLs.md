---
name: code-quality-check
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: Code quality checks for TypeScript type safety and best practices
created: 2026-01-19
last_updated: 2026-01-19
---

# Type Safety & Code Quality Workflow

This workflow ensures code quality standards are maintained, preventing common issues like excessive `any` usage and dev comments in production code.

## Pre-Commit Checks

// turbo-all

### 1. Run TypeScript Type Check
```bash
pnpm exec tsc --noEmit -p packages/features/tsconfig.json
```

### 2. Run ESLint
The project enforces `@typescript-eslint/no-explicit-any: error` globally.
```bash
pnpm exec eslint packages/features/src --ext .ts,.tsx --max-warnings 0
```

### 3. Check for Dev Comments
Search for TODO, FIXME, @ts-ignore comments that should be resolved:
```bash
grep -rn "@ts-ignore\|// TODO\|// FIXME\|// HACK" packages/features/src --include="*.ts" --include="*.tsx" || echo "No dev comments found"
```

## Type Safety Rules (Enforced via ESLint)

| Rule | Status | Purpose |
|------|--------|---------|
| `no-explicit-any` | ❌ Error | Prevents untyped code |
| `no-non-null-assertion` | ⚠️ Warn | Discourages unsafe `!` usage |
| `no-unnecessary-type-assertion` | ❌ Error | Prevents redundant casts |

## Best Practices for New Code

1. **Define types in `core/types/`**: All shared types should be in centralized location
2. **Use explicit return types**: Add return type annotations for public functions
3. **No `// @ts-ignore`**: If needed, use `// @ts-expect-error` with explanation
4. **Remove dev comments**: Clean up TODO/FIXME before merging

## When Adding New Feature Code

1. Create interfaces in `core/types/index.ts` first
2. Import types from centralized location (`from '../types'`)
3. Add JSDoc for public APIs
4. Run `pnpm lint:fix` before committing
