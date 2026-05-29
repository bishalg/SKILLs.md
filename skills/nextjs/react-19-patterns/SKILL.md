# SKILL: Modern React 19 & Next.js 15 Architecture Patterns

## 🎯 Architectural Philosophy & Core Tenets

This document outlines the standard operating procedures for handling asynchronous operations, state management, and UI rendering within a modern React 19 / Next.js 15 architecture.

**Core Directives:**
1. **Eliminate Manual Loading States:** Do not use `useState(false)` to track async execution. Rely on React's concurrent primitives (`useTransition`, `useActionState`).
2. **URL as the Source of Truth:** Prefer URL search parameters over local component state for filters, sorting, and pagination to ensure shareability and server-side predictability.
3. **Optimistic by Default:** Assume network success for user interactions (likes, toggles) and handle failures via automatic React rollbacks.
4. **Never Block the Static Shell:** Treat Request APIs (cookies, params) as asynchronous deferred values. Use React 19's `use()` hook to unwrap promises exactly where they are needed.

---

## Pattern 1: Actions & Concurrent Execution (`useTransition`)

**The Problem:** Traditional data fetching and state updates rely on scattered boolean flags (`isLoading`). When multiple async events fire, shared state variables get overwritten prematurely.

**The Architecture:** React 19 Actions map directly to transitions. By wrapping async work in `startTransition`, React manages the lifecycle, ensuring the `isPending` state remains synchronized until the entire async workflow is resolved.

### Example
```tsx
'use client';
import { useTransition } from 'react';
import { executeMutation } from '@/app/actions';

export default function AsyncAction() {
  const [isPending, startTransition] = useTransition();

  const handleExecute = () => {
    startTransition(async () => {
      await executeMutation();
    });
  };

  return <button onClick={handleExecute} disabled={isPending}>{isPending ? '...' : 'Execute'}</button>;
}
```

---

## Pattern 2: Fault-Tolerant Optimistic Updates (`useOptimistic`)

**The Problem:** Waiting for server round-trips creates a sluggish user experience.

**The Architecture:** `useOptimistic` bridges the gap. It requires a "ground truth" state and a reducer. The optimistic state is applied instantly. If the transition's promise rejects, React automatically reverts to the ground truth.

### Example
```tsx
const [optimisticState, setOptimisticState] = useOptimistic(
  initialValue,
  (state, newValue) => newValue
);

startTransition(async () => {
  setOptimisticState(!state); 
  await updateDb(!state); 
});
```

---

## Pattern 3: Asynchronous Page APIs & Deferred Resolution (Next.js 15)

**The Problem:** In Next.js 15, `searchParams`, `params`, `cookies()`, and `headers()` are **Promises**. Awaiting them at the top level of a `page.tsx` blocks the entire route from rendering its static shell.

**The Architecture:** Do not `await` these at the root page level. Pass the Promise directly down to the specific Server Component that needs the data. That child component will `await` the promise, allowing Next.js to render the surrounding layout instantly.

### Example
```tsx
// ✅ GOOD: Pass the promise down
export default function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return (
    <main>
      <h1>Search</h1>
      <Suspense fallback={<GridSkeleton />}>
        <DataGrid paramsPromise={searchParams} />
      </Suspense>
    </main>
  );
}

async function DataGrid({ paramsPromise }: { paramsPromise: Promise<{ q?: string }> }) {
  const params = await paramsPromise; 
  const data = await fetchResults(params.q);
  return <ul>...</ul>;
}
```

---

## Pattern 4: Promise-Based Context Providers with `use()`

**The Problem:** Calling dynamic APIs like `cookies()` inside every component forces the entire tree into dynamic rendering.

**The Architecture:** Fetch the dynamic data as a Promise in the Root Layout. Pass that *Promise* into a Client Context Provider. Deep in the tree, use React 19's `use()` hook to unwrap it. This isolates the dynamic rendering boundary.

### Example
```tsx
// Layout
const sessionPromise = getUserSession();
return <AuthProvider sessionPromise={sessionPromise}>{children}</AuthProvider>;

// Consumer Component (Client)
const sessionPromise = use(AuthContext);
const session = use(sessionPromise);
```

---

## Pattern 5: Request-Scoped Deduplication with `React.cache()`

**The Problem:** Moving data fetching deep into components risks redundant database queries for the same data during a single request.

**The Architecture:** Wrap data-fetching utilities in `React.cache()`. This memoizes the result for the lifetime of the server request.

### Example
```tsx
import { cache } from 'react';

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  return db.user.findUnique({ where: { id: session.id } });
});
```
