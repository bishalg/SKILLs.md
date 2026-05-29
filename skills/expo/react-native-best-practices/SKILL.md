---
name: react-native-best-practices
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: Vercel React Native Best Practices for mobile development.
globs: "**/*.{ts,tsx,js,jsx}"
---
# Vercel React Native Skills

## When to Apply
Apply these rules when working on React Native code (mobile apps) to ensure high performance and native-like feel.

## 1. List Performance (CRITICAL)
- **list-performance-virtualize**: Use `FlashList` (by Shopify) instead of `FlatList` for large lists for better performance.
- **list-performance-item-memo**: Wrap list item components in `React.memo` to prevent unnecessary re-renders.
- **list-performance-callbacks**: Use `useCallback` for event handlers passed to list items to maintain referential equality.
- **list-performance-inline-objects**: Avoid inline style objects or inline functions in `renderItem`; define them outside or memoize them.
- **list-performance-images**: Optimize images in lists; use cached images and proper sizing.
- **list-performance-item-types**: Use `getItemType` (in FlashList/RecyclerListView) to recycle components efficiently for heterogeneous lists.

## 2. Animation (HIGH)
- **animation-gpu-properties**: Animate only GPU-accelerated properties: `transform` and `opacity`. Avoid animating layout properties like `width`, `height`, `top`, `left`.
- **animation-derived-value**: Use `useDerivedValue` from Reanimated for computed animation values to run on the UI thread.
- **animation-gesture-detector-press**: Use `Gesture.Tap` from `react-native-gesture-handler` instead of `Pressable` or `TouchableOpacity` when integrating with other gestures for better conflict resolution.

## 3. Navigation (HIGH)
- **navigation-native-navigators**: Use `@react-navigation/native-stack` instead of the JS-based stack navigator for native performance and feel.

## 4. UI Patterns (HIGH)
- **ui-expo-image**: Use `expo-image` for advanced image features (caching, blurhash, performance) over the standard `<Image>`.
- **ui-pressable**: Prefer `Pressable` over `TouchableOpacity` or `TouchableHighlight` for more reliable touch handling and future-proofing, unless using Gesture Handler.
- **ui-safe-area-scroll**: Ensure `ScrollView` and `FlatList` correctly handle safe area insets (use `contentContainerStyle`).
- **ui-menus**: Use native context menus (e.g., `zeego` or native-specific libraries) rather than JS-implemented dropdowns for a native feel.
- **ui-native-modals**: Use native modal primitives (e.g., `react-native-screens` or `<Modal>`) when possible for proper z-indexing and accessibility.
- **ui-styling**: Use `StyleSheet.create` or `NativeWind` (Tailwind) for styling. Avoid inline styles for complex components.

## 5. State Management (MEDIUM)
- **react-state-minimize**: Keep state as local as possible. Avoid global state for ephemeral UI state.
- **react-compiler-destructure-functions**: Destructure props in component arguments to be friendly to React Compiler (if using).

## 6. Rendering (MEDIUM)
- **rendering-text-in-text-component**: Always wrap raw text in a `<Text>` component. React Native does not support text nodes directly inside `View`.
- **rendering-no-falsy-and**: Avoid `condition && <Component />` if `condition` can be a number (0) or empty string. Use `!!condition &&` or ternary.

## 7. Monorepo (MEDIUM)
- **monorepo-native-deps-in-app**: Keep native dependencies (that require linking) in the app's `package.json`, not in shared packages, unless using a robust autolinking setup.
- **monorepo-single-dependency-versions**: Enforce single versions of React, React Native, and other core libraries across the monorepo to avoid "multiple instances of React" errors.
