---
name: solito-cross-platform
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
name: solito-cross-platform
description: Build universal applications using Solito 5, combining Expo (React Native) and Next.js with shared navigation and component libraries.
version: 1.0.0
license: MIT
---

# Solito Cross-Platform Development Skill

## Overview
A specialized skill for building universal applications using Solito, combining Expo (React Native) and Next.js with shared navigation and component libraries.

## Core Navigation Principles
- **Shared by Default**: Aim for 80%+ code reuse in `packages/app`.
- **Navigation-First Design**: Use `solito/link` and `solito/router` instead of platform-specific libraries.
- **Feature-Oriented Architecture**: Group code by domain (e.g., `features/user`, `features/feed`) rather than platform.

## Key Integration Patterns
1. **Universal Linking**: Use `<Link href="/user/123">` which maps to `apps/next/app/user/[id]/page.tsx` on web and `apps/expo/app/user/[id].tsx` on native.
2. **Programmatic Navigation**: Use the `useRouter` hook from `solito/router` for cross-platform `push`, `replace`, and `back` actions.
3. **Shared Styling**: Leverage **NativeWind** (Tailwind for React Native) to ensure consistent UI across web and mobile.
4. **Platform-Specific Code**: Use `.web.tsx` and `.native.tsx` extensions for components that require platform-unique implementations.

## Best Practices
- **Avoid Platform-Specific Links**: Never use `next/link` or `expo-router` links directly in shared components; always use `solito/link`.
- **Centralize State**: Use **Zustand** or **tRPC** in `packages/app` to share business logic.
- **Param Handling**: Prefer URL search parameters over navigation state to ensure web persistence (refresh-safety).
- **Design Structure Early**: Define your route map (e.g., `/user/:id`, `/settings`) before starting implementation to ensure consistency across routers.

## Solito 5 Integration
- **Unified Router Layer**: Solito 5 creates a thin abstraction over `Next.js App Router` and `Expo Router`.
- **Expo Router V5 Support**: Addresses how to use file-system routing in the latest Expo SDKs while maintaining compatibility with Next.js Server Components.
- **Optimized Performance**: Includes patterns for **Prefetching** (using `solito/link` with `onHoverIn` for web and `onPressIn` for native).
- **Deep Link Standardization**: Standardizes how deep links are handled via `app.json` schemes.
