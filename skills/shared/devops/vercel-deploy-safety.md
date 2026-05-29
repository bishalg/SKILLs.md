---
name: vercel-deploy-safety
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# Vercel Deployment Safety Workflow

This workflow ensures that AstroFusion web applications are deployed safely to Vercel without runtime crashes (500 errors).

## 🛡️ Mandatory Pre-Deploy Checks

Before pushing to `main` or `dev`, run the automated config validator:

```bash
cd apps/web && pnpm build
```
*(The build script now automatically runs `scripts/verify-vercel-config.mjs`)*

### Manual Config Audit
If you modify `next.config.mjs` or `vercel.json`, verify:
1. **Architecture Consistency**: If `vercel.json` has an architecture override (e.g., `arm64`), ensure `outputFileTracingExcludes` does NOT remove the corresponding linux binary.
2. **Native Module Tracing**: Ensure `@af/sweph` prebuilds and `node-gyp-build` are explicitly included in `outputFileTracingIncludes`.
3. **No Standalone Excludes**: Do NOT exclude `**/.next/standalone/**/*` in `outputFileTracingExcludes` as it breaks Next.js's internal tracing logic.

## 🚀 Deployment Hierarchy

1. **Local Build**: Run `pnpm build` locally to ensure no compilation errors.
2. **Vercel Preview**: Always verify changes on a Vercel Preview deployment before merging to the production branch.
3. **Smoke Test**: Visit critical routes (Home, Kundali, Tools) to ensure the 500 error isn't occurring.

## 🛠️ Troubleshooting 500 Errors

If the app returns 500 after a successful build:
1. **Check Vercel Runtime Logs**: Look for "Module not found" or "Cannot find module '.../swisseph.node'".
2. **Verify Architecture**: Check if Vercel is building for x64 (default) or ARM64, and verify the corresponding binary is included in the `.next/standalone` output.
3. **Increase Memory**: If the error is "OOM" or "Process exited with signal 9", check `webpack.config.mjs` parallelism settings.
