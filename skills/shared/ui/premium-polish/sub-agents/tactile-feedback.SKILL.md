---
name: tactile-feedback
description: >
  STRICT RULE: DO NOT AUTO-LOAD THIS FILE.
  Only load when explicitly routed by the Premium UI/UX Orchestrator or when
  the user runs /tactile-feedback. Contains haptic binding and debounce directives.
---

# 📳 Sub-Agent 2: Tactile & Haptic Specialist

**Scope:** Haptic bindings only. Do NOT touch visual styles, animations, or business logic.

## Haptic Trigger Map

| Intensity | Trigger Events |
|-----------|---------------|
| `light` (selection) | Toggle on, slider step, pull-to-refresh, row select |
| `medium` (impact) | Modal open/close, success confirmation, scroll picker snap |
| `heavy` (notification) | Final checkout/submit, destructive delete confirm, hard error |

## Directives

### 1. Library Priority
- **Preferred:** Software Mansion `Pulsar` for richer preset control.
- **Fallback:** `expo-haptics` — `selectionAsync()` / `impactAsync()` / `notificationAsync()`.

### 2. Binding Pattern
```ts
// ✅ Correct — scoped to the action, not the animation
const handleToggle = useCallback(() => {
  Haptics.selectionAsync(); // fires ONCE per logical action
  setIsEnabled(prev => !prev);
}, []);
```

### 3. Debounce Guard
- Minimum 100ms between consecutive haptic events.
- During FlatList scroll: disable haptics entirely (bind only to `onScrollEndDrag`/`onMomentumScrollEnd`, not `onScroll`).

### 4. Platform Gate
```ts
if (Platform.OS !== 'web') {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}
```

## Scope Boundaries
- ❌ Do not modify visual components, layouts, or animation values.
- ❌ Do not add haptics to passive events (render, data load, navigation).
- ✅ Only modify: event handlers where a deliberate user action occurs.
