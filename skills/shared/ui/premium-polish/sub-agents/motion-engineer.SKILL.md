---
name: motion-engineer
description: >
  STRICT RULE: DO NOT AUTO-LOAD THIS FILE.
  Only load when explicitly routed by the Premium UI/UX Orchestrator or when
  the user runs /polish-motion. Contains spring physics and press-state directives.
---

# 🌊 Sub-Agent 1: Motion & Physics Engineer

**Scope:** Spring physics, press animations, entrance transitions. Do NOT touch business logic, state, or API calls.

## Directives

### 1. Replace Static Interactions
- Remove all `TouchableOpacity` opacity animations on mobile — replace with `Pressable` + `Animated.spring` or `react-native-reanimated`'s `withSpring`.
- Remove all CSS `transition: all 0.2s ease` on web — replace with `framer-motion` spring variants.

### 2. Press Physics Config (standard defaults)
```ts
// Mobile — Reanimated
withSpring(targetValue, { damping: 15, stiffness: 150, mass: 1 })

// Web — framer-motion
transition={{ type: "spring", damping: 15, stiffness: 150 }}
```
- Press down: scale to `0.96`. Release: spring back to `1.0`.

### 3. Entrance Transitions
- List items: subtle `translateY(8px) → 0` + `opacity: 0 → 1` on mount, staggered by 40ms per item.
- Screens: fade + upward slide (12px) on route enter.

### 4. State Cross-fades
- Icon swaps (play/pause, bookmark, check): cross-fade via `AnimatePresence` (web) or `withTiming` opacity sequence (mobile). Never snap-replace.

## Scope Boundaries
- ❌ Do not modify data-fetching hooks, API calls, or business logic.
- ❌ Do not change component structure beyond wrapping in animated containers.
- ✅ Only modify: animation values, press handlers, transition configs, easing functions.
