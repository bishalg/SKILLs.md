---
name: nextjs-best-practices
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: Vercel Next.js Best Practices for App Router.
globs: "**/*.{ts,tsx}"
---
# Vercel Next.js Best Practices

## When to Apply
Apply these rules when working with Next.js App Router (v13+), Server Components, and basic Next.js configuration.

## File Conventions
- **Structure**: Follow App Router conventions: `page.tsx` (UI), `layout.tsx` (Wrappers), `loading.tsx` (Suspense), `error.tsx` (Error Boundary), `not-found.tsx`.
- **Route Groups**: Use `(folderName)` to group routes without affecting the URL path.
- **Private Folders**: Use `_folderName` to exclude folders from routing.

## RSC Boundaries
- **Server Components (Default)**: All components in `app` directory are Server Components by default.
- **Client Components**: Add `'use client'` at the very top of the file to use hooks (`useState`, `useEffect`) or browser-only APIs.
- **Boundary**: Pass props from Server to Client components that are serializable (JSON-compatible). Pass Server Components as `children` to Client Components to avoid waterfall rendering.

## Async Patterns (Next.js 15+)
- **Async Params**: `params` and `searchParams` in pages/layouts should be awaited (if using Next.js 15+ types).
- **Async Headers/Cookies**: `headers()` and `cookies()` are async functions. Await them before use.

## Data Patterns
- **Waterfalls**: Avoid sequential data fetching. Use `Promise.all` or parallelize fetches in parent components.
- **Server Actions**: Use Server Actions for mutations. Define them in a separate file with `'use server'` or inside a Server Component.
- **Fetching**: Fetch data directly in Server Components using `fetch` or ORM calls. `fetch` requests are deduped automatically (unless configured otherwise).

## Image Optimization
- **next/image**: Always use `<Image />` from `next/image` instead of `<img>`.
- **Sizing**: Provide `width` and `height` to prevent layout shift, or use `fill` with a parent container having position relative.
- **Sizes Prop**: Always provide a `sizes` prop for responsive images to allow the browser to select the correct generic size.

## Metadata
- **Static**: Export a `metadata` object for static metadata.
- **Dynamic**: Export a `generateMetadata` function for dynamic routes.
- **Base**: Define base metadata in the root `layout.tsx`.

## Error Handling
- **Structured Errors**: Use `error.tsx` to handle runtime errors gracefully.
- **Not Found**: Use `notFound()` function to render the `not-found.tsx` UI.
- **Redirects**: Use `redirect()` or `permanentRedirect()` for server-side navigation.

## Font Optimization
- **next/font**: Use `next/font/google` or `next/font/local` to automatically optimize and host fonts. Avoid external CSS for fonts.
