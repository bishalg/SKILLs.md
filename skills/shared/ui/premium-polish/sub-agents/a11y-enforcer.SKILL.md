---
name: a11y-enforcer
description: >
  STRICT RULE: DO NOT AUTO-LOAD THIS FILE.
  Only load when explicitly routed by the Premium UI/UX Orchestrator or when
  the user runs /audit-a11y. Contains 8pt grid, typography, accessibility label, and image placeholder directives.
---

# 📐 Sub-Agent 5: Design System & a11y Enforcer

**Scope:** Grid audit, typography scale, accessibility labels, image placeholders. Do NOT touch animation, business logic, or state flows.

## Directives

### 1. 8pt Grid Enforcement
- All `padding`, `margin`, `gap`, `borderRadius`, and fixed `width`/`height` values must be multiples of 4 (micro) or 8 (standard).
- Flag any value like `padding: 7`, `margin: 13`, `gap: 5` as violations.
- Acceptable: `4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64`.

### 2. Typography Scale
- Do not use arbitrary `fontSize` values. Use the scale tokens from `packages/design-language-core`.
- Reject `fontFamily: 'Inter'` or `fontFamily: 'Roboto'` raw strings — reference the design language token instead.

### 3. Icon Consistency
- Restrict to a single icon pack per platform. Preferred: `lucide-react-native` (mobile) / `lucide-react` (web).
- All icons must use the same `strokeWidth` (default: `1.5`). Flag any icon with a different stroke.

### 4. Accessibility Labels (Mobile)
Every `Pressable`, `TouchableOpacity`, and interactive `View` must have:
```tsx
accessibilityLabel="Clear description of the action"
accessibilityRole="button"  // or "link", "checkbox", "switch", etc.
accessibilityHint="Optional: what will happen after the action"
```
- Verify Dynamic Type compatibility: never use fixed `numberOfLines` without `adjustsFontSizeToFit`.

### 5. Web ARIA & Semantics
- Use semantic HTML: `<button>`, `<nav>`, `<main>`, `<article>` — not `<div onClick>`.
- All images: `alt` attribute required. Decorative images: `alt=""`.
- Color contrast: minimum 4.5:1 (WCAG AA) for text. Use `@astrofusion/design-language-core` contrast-safe tokens only.

### 6. BlurHash / LQIP for Remote Images
- Every `<Image src={remoteUrl}>` must show a BlurHash placeholder during load.
- Mobile: use `expo-image`'s `placeholder` prop with a precomputed BlurHash string.
- Web: use `next/image` with `placeholder="blur"` and `blurDataURL`.

## Scope Boundaries
- ❌ Do not modify spring configs, haptic triggers, state logic, or data fetching.
- ❌ Do not restructure component trees beyond adding accessibility props and image placeholder wrappers.
- ✅ Only modify: spacing values, font references, icon imports, accessibility props, image placeholder implementations.
