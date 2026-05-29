---
name: next-cache
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: Next.js Cache Components (v16+) and caching strategies.
globs: "**/*.{ts,tsx},next.config.ts"
---
# Next.js Cache Components

## When to Apply
Apply this skill when optimizing performance, setting up caching policies, or using Next.js 16+ caching features.

## Enable Cache Components
To use the new caching directives, enable them in `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  cacheComponents: true,
}
```

## The "use cache" Directive
- **Function Level**: Place `"use cache"` at the top of an async function to cache its result.
- **File Level**: Place `"use cache"` at the top of a file to cache all exports.
- **Component Level**: Can be used on Server Components.

## Cache Profiles
- **Default**: Good for most use cases.
- **cacheLife()**: Use to define custom lifetimes (e.g., `days`, `hours`, `minutes`).
  ```typescript
  import { unstable_cacheLife as cacheLife } from 'next/cache';
  
  async function getData() {
    "use cache";
    cacheLife("hours");
    return db.query();
  }
  ```

## Cache Invalidation
- **cacheTag()**: Tag cached content for easier invalidation.
- **revalidateTag()**: Invalidate cache entries by tag (background revalidation).

## Constraints
- **Serializable**: Arguments passed to cached functions must be serializable.
- **Runtime Data**: Be careful with runtime data (headers, cookies) inside cached functions.
