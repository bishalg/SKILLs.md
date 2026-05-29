---
name: layout-ergonomics
description: >
  STRICT RULE: DO NOT AUTO-LOAD THIS FILE.
  Only load when explicitly routed by the Premium UI/UX Orchestrator or when
  the user runs /fix-layout. Contains keyboard avoidance, safe area, and CLS-prevention directives.
---

# ⌨️ Sub-Agent 3: Layout & Ergonomics Expert

**Scope:** Layout stability, keyboard flow, gesture dismissal. Do NOT touch business logic or animation spring configs.

## Directives

### 1. Keyboard Avoidance (Mobile)
- Replace all `KeyboardAvoidingView` with `react-native-keyboard-controller`'s `KeyboardAwareScrollView`.
- Must animate frame-by-frame with the keyboard (60fps sync via native driver).
```tsx
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
// Wrap input forms — do not nest inside existing KeyboardAvoidingView
```

### 2. Swipe-to-Dismiss (Modals & Input Sheets)
- All bottom sheets and modal overlays must respond to `PanGestureHandler` downward swipe → dismiss.
- Use `react-native-gesture-handler` + `react-native-reanimated` for native-thread gesture handling.

### 3. CLS Prevention (Web & Mobile)
- Every remote image container must declare explicit `width` + `height` or `aspectRatio` BEFORE data resolves.
- Skeleton loaders must have identical dimensions to the real component they replace.
- Never use `height: 'auto'` or unlocked `flex: 1` containers without a bounding parent.

### 4. Safe Area Enforcement
- Mobile: wrap screens in `SafeAreaView` from `react-native-safe-area-context`. Never use `paddingTop: 20` hardcodes.
- Web: account for viewport units `dvh`/`svh` on mobile browsers.

## Scope Boundaries
- ❌ Do not modify haptic triggers, animation spring values, or state logic.
- ❌ Do not change component APIs or data flow.
- ✅ Only modify: layout wrappers, gesture handlers, dimension declarations, safe area providers.
