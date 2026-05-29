---
name: vercel-deploy
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: Deployment skills for Vercel.
globs: "package.json,vercel.json"
---
# Vercel Deployment

## When to Apply
Apply this skill when preparing for deployment, configuring build settings, or troubleshooting deployment issues on Vercel.

## Framework Detection
- Vercel auto-detects frameworks based on `package.json` dependencies.
- Supported: Next.js, React, Vue, Svelte, Angular, etc.
- **Files**: Ensure `package.json` accurately reflects the framework used.

## Static Projects
- If no `package.json` exists, Vercel treats it as a static site.
- `index.html` is served at root `/`.
- Other `.html` files are served without the extension (clean URLs).

## Configuration (vercel.json)
- Use `vercel.json` to override default behaviors.
- **Rewrites/Redirects**: Manage routing rules here.
- **Headers**: Set custom HTTP headers.
- **Cron Jobs**: Define scheduled tasks.

## Troubleshooting
- **Build Errors**: Check build logs in Vercel dashboard.
- **Environment Variables**: Ensure all required env vars are set in Project Settings.
- **Node Version**: Verify the Node.js version matches `package.json` engines.
- **Network Egress**: If encountering network errors, check for blocked ports or egress limits.

## Deployment Command (Reference)
- Standard deployment involves packaging the project (excluding `node_modules`, `.git`) and uploading to Vercel.
- The platform builds the project based on the detected framework.
