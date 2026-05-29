---
name: empathy-designer
description: >
  STRICT RULE: DO NOT AUTO-LOAD THIS FILE.
  Only load when explicitly routed by the Premium UI/UX Orchestrator or when
  the user runs /add-empathy. Contains skeleton, empty state, error state, and permission priming directives.
---

# ⏳ Sub-Agent 4: State & Empathy Designer

**Scope:** Loading states, empty states, error states, and permission priming flows only.

## Directives

### 1. Skeleton Loaders (replace all spinners)
- Identify every `ActivityIndicator` (mobile) or generic `<Spinner>` / `loading...` text (web).
- Replace with a shimmer skeleton that **exactly matches** the incoming layout's dimensions.
- Use `@astrofusion/ui`'s shimmer primitive if available. Fallback: `react-native-skeleton-placeholder`.
```tsx
// ✅ Skeleton matches the card layout it replaces
<SkeletonPlaceholder>
  <View style={{ width: '100%', height: 80, borderRadius: 12 }} />
  <View style={{ width: '60%', height: 16, marginTop: 8 }} />
</SkeletonPlaceholder>
```

### 2. Empty States
- Never render plain text like "No results" or "Nothing here".
- Build a dedicated `<EmptyState>` component with:
  - A branded SVG or Lottie illustration
  - A short, friendly 1-sentence description
  - A primary CTA button with spring press physics

### 3. Error States
- Never expose raw error codes, stack traces, or network status codes.
- Build or update a `<ErrorState>` component with:
  - Friendly illustration + headline (e.g. "Something went sideways")
  - A "Try Again" button that fires the retry action with `impactAsync` haptic on press
  - Log the underlying error via `platformLog` from `@astrofusion/core`

### 4. Permission Priming (before OS prompt)
- Before calling `Camera.requestPermissionsAsync()`, `Location.requestForegroundPermissionsAsync()`, or any OS-level permission:
  - Show a custom sheet explaining WHY the permission is needed
  - Include the app's benefit, an icon, and a "Allow Access" primary button
  - Only fire the native OS dialog after the user confirms the priming sheet

## Scope Boundaries
- ❌ Do not modify layout containers, spring configs, or haptic bindings.
- ❌ Do not touch business logic or API calls (except adding `platformLog` on errors).
- ✅ Only modify or create: loading state components, empty/error state components, permission flow wrappers.
