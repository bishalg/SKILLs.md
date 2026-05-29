---
name: react-19-optimistic-ui
description: Implementation patterns for React 19 useOptimistic hook for seamless interactive UI.
---

# SKILL: React 19 Optimistic UI Implementation

## CONTEXT
When building interactive UI elements (likes, upvotes, toggles, cart additions) in React 19, the agent must prioritize perceived performance. The user should never wait for network latency to see the result of their interaction. We achieve this using the React 19 `useOptimistic` hook.

## RULES & ARCHITECTURE 

### 1. The Two-State Philosophy
Every optimistic component must explicitly manage two states:
- **Actual State (Committed):** The true source of truth, typically managed via `useState`, a database query, or server state.
- **Optimistic State (Temporary):** The immediate, unverified UI state shown to the user, managed via `useOptimistic`.

### 2. Syntax & Implementation Pattern
When generating optimistic updates, the agent MUST adhere to this exact flow:

```tsx
import { startTransition, useOptimistic, useState } from "react";

export function OptimisticComponent({ initialData }) {
  // 1. Define Actual State
  const [data, setData] = useState(initialData);

  // 2. Define Optimistic State and Updater
  const [optimisticData, addOptimisticData] = useOptimistic(
    data,
    (currentState, optimisticValue) => {
      // Must be a pure, lean function
      return currentState + optimisticValue; 
    }
  );

  const handleAction = async () => {
    // 3. Apply immediate optimistic change BEFORE async operations
    addOptimisticData(1);

    try {
      // 4. Perform background server mutation
      await performServerMutation();
      
      // 5. Commit the actual state on success
      setData((prev) => prev + 1);
    } catch (error) {
      // 6. Mandatory Rollback: Revert to actual state on failure
      console.error("Mutation failed, rolling back:", error);
      setData((prev) => prev); // Triggers re-render to sync optimistic state back to reality
      // Optional: Trigger toast notification here
    }
  };

  return (
    // 7. MUST wrap the handler invocation in startTransition
    <button onClick={() => startTransition(() => handleAction())}>
      {optimisticData}
    </button>
  );
}
```

### 3. Critical Constraints (ANTI-PATTERNS TO AVOID)
- **NEVER omit `startTransition`:** Invoking optimistic handlers directly outside of a transition or React Action will throw the warning: *"An optimistic state update occurred outside a transition or action."* Always wrap client-side invocations in `startTransition`.
- **NEVER omit the rollback:** If the `catch` block fails to reset or re-sync the actual state, the UI will permanently desync from the database. Rollbacks are mandatory.
- **NEVER put heavy logic in the updater:** The `(currentState, optimisticValue) => newState` function must remain entirely pure, synchronous, and lean. Do not perform complex data formatting here.
- **Cross-Platform Consistency:** If implementing this within an NX monorepo or sharing code between Next.js web and React Native/Expo mobile environments, ensure the server mutation abstractions (API calls vs Server Actions) are correctly isolated, but the core `useOptimistic` hook logic remains strictly shared.

## AGENT INSTRUCTIONS
When prompted to "make a feature feel instant", "add an optimistic toggle", or "improve perceived load time" on an interactive element:
1. Automatically scaffold the `useOptimistic` hook alongside the source-of-truth state.
2. Wire up the immediate visual update.
3. Stub out the `try/catch` block with explicit rollback logic.
4. Wrap the trigger in `startTransition`.
