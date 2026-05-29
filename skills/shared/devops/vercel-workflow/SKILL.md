---
name: vercel-workflow
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: Vercel Workflow best practices for durable execution.
globs: "**/*.{ts,tsx}"
---
# Vercel Workflow

## When to Apply
Apply this skill when building long-running tasks, background jobs, or durable workflows that need to survive server restarts.

## Directives
- **"use workflow"**: Place at the top of an `async` function to mark it as a durable workflow.
- **"use step"**: Place at the top of an `async` function to mark it as a retriable step.

## Best Practices
- **Idempotency**: Ensure steps are idempotent. If a step runs twice, the result should be safe.
- **Serialization**: All arguments and return values between steps must be serializable (JSON).
- **Sleep**: Use `import { sleep } from "workflow"` instead of `setTimeout` for durable delays.
- **Validation**: Validate inputs at the start of the workflow.

## Imports
```typescript
import { 
  sleep, 
  step, // functional wrapper alternative
} from "workflow";
```

## Error Handling
- **Retries**: Steps are automatically retried on failure. configure retry policies if needed.
- **FatalError**: Throw `FatalError` to stop retries and fail the workflow immediately.
