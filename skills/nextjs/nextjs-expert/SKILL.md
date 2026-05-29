---
name: nextjs-expert
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
name: nextjs-expert
description: Authoritative guide for Next.js App Router development covering SSR, Server Actions, SEO, and Lighthouse-level performance. Use when authoring App Router routes, metadata, or performance-sensitive UIs.
---

# Next.js Expert

## When to Apply
- Working on App Router folders (pages, layouts, error.tsx, loading.tsx, actions, metadata).
- Designing data fetching, Server Actions, SEO metadata, or performance optimizations.
- Reviewing code for compliance with Next.js best practices around Server Components, `next/image`, routing, and metadata.

## 1. Core Architecture (App Router)
- **Default to Server Components:** keep components implicit Server Components; add `"use client"` only when hooks such as `useState`, `useEffect`, or browser APIs are required.
- **Directory conventions:** each route segment should expose `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `template.tsx`, and parallel routes as needed, following the App Router structure.
- **Data fetching:** load data via `async` functions inside Server Components or `fetch` wrappers; avoid `useEffect` for initial loads. Wrap the UI in `<Suspense>` to stream content and render skeleton states in `loading.tsx`.

## 2. Server Functions (Server Actions)
- Put every mutation (form submission, updates, deletes) inside dedicated `"use server"` files under `app/actions/…`.
- Validate inputs before mutations, ideally with `zod` (or similar) schemas inside the action file so validation runs server-side before business logic.
- Keep Server Actions thin: call repository/utility helpers (never inline heavy logic or direct DB calls in the action file) and throw structured errors that `error.tsx` or components can surface.

## 3. React Best Practices
- Favor composition: pass components/content through `children` or dedicated slots rather than drilling props multiple layers.
- Custom hooks should do one job. Use `useMemo` for expensive derived values and `useCallback` for functions passed down to avoid unnecessary renders.
- Name components in `PascalCase`, utilities and functions in `camelCase`, and keep descriptive names for props and events.

## 4. Rendering & Performance (Lighthouse)
- Always use `next/image` for raster art; declare `width`/`height` or `fill` to stabilize layout and prevent CLS.
- Load fonts via `next/font` (self-hosted) rather than external `<link>` tags.
- Leverage `next/script` with `beforeInteractive`, `afterInteractive`, or `lazyOnload` based on priority to avoid blocking the main thread.
- For heavy client behavior, wrap the component with `next/dynamic` and mark it as `ssr: false` or load lazily so it does not impact LCP.

## 5. SEO & Metadata
- Export static `metadata` objects from `layout.tsx` and `page.tsx` whenever values are known at build time (title, description, open graph).
- For dynamic routes, implement `generateMetadata(params)` to compute metadata per entity (e.g., `/product/[id]`).
- Use semantic HTML (`<header>`, `<main>`, `<article>`, `<section>`, `<footer>`) and ensure the DOM order matches the reading order for accessibility and crawlability.
- Maintain a `sitemap.ts` and `robots.ts` endpoint rooted at `app/` to cover all supported locales/routes.

## 6. UI & Styling
- Prefer utility-first solutions such as Tailwind CSS or CSS Modules instead of inline styles. Keep styles in reusable tokens or component-scoped files.
- Design mobile-first; verify touch targets are ≥ 44px and layouts collapse gracefully on small screens.
- Provide meaningful `aria-*` attributes when interactive elements lack text labels. Ensure every `next/image` includes an `alt`.

## 7. Error Handling
- Supply `error.tsx` boundaries per route segment to catch runtime problems and expose structured error info to downstream components.
- Log errors to monitoring (e.g., Sentry) inside the boundary only in production builds to avoid noise in dev.
- Use `not-found.tsx` or `redirect` helpers when the data layer indicates a missing entity; keep error UI consistent with the brand.

## Supporting Checks
- Confirm Server Actions are imported with absolute paths (respecting `tsconfig` path aliases) and do not pull client-side only modules.
- Re-run `pnpm lint`, `pnpm type-check`, and `pnpm test` (or targeted suite) after touching data, metadata, or actions to guard against regressions.
