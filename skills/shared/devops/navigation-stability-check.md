---
name: navigation-stability-check
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: How to prevent infinite navigation and render loops
created: 2026-01-23
last_updated: 2026-01-23
---

# Navigation Stability & Loop Prevention

Infinite loops (redirect or render-based) are critical issues that cause CPU spikes, browser hangs, and poor user experience. Follow these rules to prevent them.

## 1. URL Synchronization Rules

When using `useBirthParamsSync` or manual `router.replace/push`:

- **Standardized Formats**: Always use the standardized formats defined in `src/utils/urlParams/urlParams.ts`.
  - **Time**: Always use `:` separator (e.g., `12:30:00`). Never use `_` in the URL unless explicitly required by a legacy system.
  - **Coordinates**: Use `lat` and `lon` (canonical names). Avoid `latitude`, `longitude`, or `lng` in URLs.
  - **Timezone**: Use `timeZone` (standard name) instead of `tz`.

- **Client-Server Agreement**: Ensure the server-side normalization (in `ServerParamsAdapter`) matches the client-side hook logic. If they disagree, they will repeatedly "correct" each other, creating an infinite loop.

- **Loop Detection**: Use the built-in guard in `useBirthParamsSync`. If you implement a custom sync hook, it **MUST** include a rate-limiting mechanism (e.g., maximum 5 updates per 2 seconds).

## 2. Preventing Circular Component Dependencies

- **Vertical Architecture**: Props should flow down, Events should bubble up.
- **Component Separation**: Never have two components importing each other.
- **Client vs Server**: Logic that triggers navigation (Client) should be separated from logic that renders heavy results (Server/Client Pure).

## 3. Verification Checklist

1. [ ] Check the "Network" tab in DevTools for a rapid succession of identical requests.
2. [ ] Verify that the URL is stable after the first load.
3. [ ] Run `grep -r "router.replace" .` to find all points of URL modification and ensure they use `urlParams` constants.
4. [ ] Check `logs/circular-deps.log` for any new warnings.

## 4. Emergency Kill-Switch

If you detect a loop in production, immediately check the `useBirthParamsSync` logs in the browser console. It will log `🛑 [useBirthParamsSync] Infinite navigation loop detected!` if it triggers the safeguard.
