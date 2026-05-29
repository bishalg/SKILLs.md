---
name: frontend-excellence
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# SKILL: Frontend Design Excellence

Expert guidelines for modern, standard, and high-end design in the AstroFusion project. Use this skill when initiating any frontend task, landing page creation, or UI component design to ensure a premium look and feel.

## Overview
This skill implements a "Brand First" and "Clutter Free" approach to frontend development. Every interface should feel responsive, alive, and premium.

## Core Rules

### 1. The Power of The First Viewport
- **One Composition**: The first viewport (above the fold) must be a single cohesive composition.
- **Hero Image**: MUST be full-bleed edge-to-edge. No sidebar heros or inset cards in the hero.
- **Hero Budget**: 1 Brand Name + 1 Headline + 1 Sentence + 1 CTA + 1 Dominant Image. No stats, no lists, no clutter.
- **Brand Signal**: The brand name must be a primary visual signal. If removing it makes the page look generic, it failed the "Brand Test".

### 2. Design Aesthetics
- **Liquid Glass**: Use transparency, blurs, and sophisticated gradients.
- **Typography**: Reject "Inter/Roboto" defaults. Use expressive fonts defined in `packages/design-language-core`.
- **Card Usage**: Default is NO CARDS. Only use cards for interactive containers. If it works without the border/shadow, remove it.

### 3. Implementation Workflow (AI Focus)
- **Checklist**: Always run the "Checklist for Review" from `/docs/specs/frontend-design-excellence.md` before finalizing.
- **React Patterns**: Use `startTransition` and `useDeferredValue` for heavy UI updates. Use `useEffectEvent` for stable event handlers.
- **Motion**: Every page needs 2-3 subtle, high-quality motions.

## When to Trigger
- "Design a landing page"
- "Create a new course UI"
- "Update the dashboard layout"
- "Refactor the frontend for better aesthetics"

## Reference
See `docs/specs/frontend-design-excellence.md` for the full specification.
