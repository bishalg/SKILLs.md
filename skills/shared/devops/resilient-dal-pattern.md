---
name: resilient-dal-pattern
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: Best practices for resilient data layer (DAL) architecture in Next.js - preventing crashes when Supabase, SWEPH, or APIs fail
created: 2026-01-07
last_updated: 2026-01-07
---

# Resilient Data Access Layer (DAL) Pattern

This workflow documents the best practices for building fault-tolerant data layers in Next.js applications.

## Core Principle

> **Views must ALWAYS render** regardless of data layer availability. Data failures should result in fallback UI (loaders, error states, placeholders), never crashes.

## Rules

### 1. Never Throw at Module Evaluation Time

**Bad - crashes the entire import chain:**
```typescript
// db/index.ts - BAD
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL required'); // ❌ Crashes at import
}
```

**Good - use mock/fallback and warn:**
```typescript
// db/index.ts - GOOD
if (!process.env.DATABASE_URL) {
  console.warn('⚠️ DATABASE_URL not configured - using mock');
  db = mockDb; // ✅ Returns working (empty) mock
}
```

### 2. Data Layer Functions Return Null/Empty on Failure

**Bad - throws and requires try/catch everywhere:**
```typescript
export function getSupabaseAdmin(): SupabaseClient {
  if (!credentials) throw new Error('Missing credentials'); // ❌
  return client;
}
```

**Good - returns null, caller handles gracefully:**
```typescript
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!credentials) {
    console.warn('[supabase] Credentials not configured');
    return null; // ✅
  }
  return client;
}
```

### 3. DAL Layer Handles Null Clients

```typescript
// dal.ts - GOOD
export async function fetchUserProfiles(): Promise<Profile[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.warn('[DAL] Supabase not available');
    return []; // ✅ Empty array, not crash
  }
  // ... normal query
}
```

### 4. Server Actions Wrap DAL Calls

```typescript
// actions.ts
'use server';

export async function getProfiles(): Promise<ProfilesResult> {
  try {
    return await dal.fetchUserProfiles();
  } catch (error) {
    console.error('[Action] Error:', error);
    return { error: 'Failed to load profiles', data: [] };
  }
}
```

### 5. Pages Render with Error States

```tsx
// page.tsx
export default async function ProfilePage() {
  const result = await getProfiles();
  
  return (
    <PageLayout>
      {result.error ? (
        <ErrorBanner message={result.error} />
      ) : result.data.length === 0 ? (
        <EmptyState message="No profiles found" />
      ) : (
        <ProfileList profiles={result.data} />
      )}
    </PageLayout>
  );
}
```

## SWEPH / Native Library Handling

For native libraries like SWEPH that may crash:

```typescript
// sweph-loader.ts
let swephModule: SwephModule | null = null;
let loadError: string | null = null;

export async function loadSweph(): Promise<SwephModule | null> {
  if (swephModule) return swephModule;
  if (loadError) return null; // Don't retry after failure
  
  try {
    swephModule = await import('@af/sweph');
    return swephModule;
  } catch (error) {
    loadError = error.message;
    console.error('[SWEPH] Failed to load:', error);
    return null;
  }
}

// Usage in calculation service
export async function calculatePlanets(params: Params) {
  const sweph = await loadSweph();
  if (!sweph) {
    return { error: 'Calculation service unavailable', planets: [] };
  }
  // ... normal calculation
}
```

## Checklist for New Data Layer Code

- [ ] Module-level code never throws
- [ ] Client getters return `null` if unconfigured
- [ ] DAL functions check for null clients
- [ ] Server actions wrap DAL in try/catch
- [ ] Pages handle error/empty states in UI
- [ ] Warnings logged (once) for debugging
