---
name: standard-page-architecture
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# Standard Page Architecture

This document defines the "Golden Standard" for creating new pages in AstroFusion. All pages should follow this pattern to ensure consistency, high performance, and robust SEO.

## Core Principles
1.  **Dumb Views**: `Page` components should handle data fetching and pass it to specialized view components.
2.  **Server Components**: Use React Server Components (RSC) by default.
3.  **Dedicated Metadata**: Use a separate `metadata.ts` or a clearly defined `generateMetadata` function.
4.  **Shared SEO Logic**: Always use `@astrofusion/seo` for metadata generation.

## File Structure
A standard feature page should be organized as follows:
```text
app/feature-name/
├── page.tsx          # Server Component: Data fetching & Layout assembly
├── metadata.ts      # SEO Metadata generation logic
├── components/      # Feature-specific UI components
└── logic/           # Business logic, math, and data transformations
```

## Implementation Guide

### 1. Dedicated Metadata (`metadata.ts`)
Encapsulate SEO logic to keep `page.tsx` clean. This allows complex metadata generation (localized strings, dynamic OG images) without cluttering the main component.

```typescript
import { Metadata } from 'next';
import { generateSEOMetadata } from '@astrofusion/seo';

export async function generateMetadata({ params, searchParams }): Promise<Metadata> {
  // 1. Fetch data needed for SEO (e.g., from a Server Action)
  // 2. Generate localized strings
  // 3. Return generateSEOMetadata(...)
}
```

### 2. Optimized Page Component (`page.tsx`)
The page component is a Server Component that orchestrates data.

```typescript
import { generateMetadata as sharedMetadata } from './metadata';
import FeatureView from './components/FeatureView';
import { getFeatureData } from './actions';

export const generateMetadata = sharedMetadata;

export default async function Page({ searchParams }) {
  const data = await getFeatureData(searchParams);
  
  return <FeatureView data={data} />;
}
```

### 3. Localization Strategy
All user-facing strings in metadata must be localized. Use the `normalizeLanguageCode` utility and cookies to determine the language server-side.

### 4. Data Sharing with `React.cache`
If both `generateMetadata` and the `Page` component need the same data, wrap your data fetching function in `React.cache`. This ensures only ONE database/API call is made per request.

> [!TIP]
> Use `@astrofusion/seo`'s `generateSEOMetadata` to automatically handle language alternates, canonical URLs, and social preview tags.
