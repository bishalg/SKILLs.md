---
name: spec-driven-development
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
name: spec-driven-development
description: Guidelines for Spec-Driven Development (SDD) in monorepo projects to ensure consistency across web, mobile, and AI-generated code.
version: 1.0.0
license: MIT
---

# Spec-Driven Development (SDD) Skill

## Overview
Spec-Driven Development is a workflow where we define clear specifications (Specs) before implementation. This ensures architectural consistency and provides a clear "Source of Truth" for AI agents and developers.

## The SDD Workflow

1.  **Define the Spec**: Create a Markdown file in `docs/specs/` defining the feature, its router paths, state requirements, and component interfaces.
2.  **Define strict Types**: Create shared TypeScript interfaces in `packages/specs` or `packages/types` that represent the data and navigation parameters.
3.  **Schema-First API**: Define Zod schemas for all API routes (`+api.ts`) early in the process.
4.  **Implementation**: Build the feature based strictly on the spec and types. If the spec changes, update the spec file first.

## SDD for AI Agents
- **Context Loading**: AI agents should always look for a `specification.md` before generating code for a feature.
- **Consistency**: By following a spec, agents avoid creating ad-hoc solutions or "architectural drift" between platforms.
- **Verification**: Use the spec as a checklist for verification/testing.

## Best Practices
- **Strict Interfaces**: Avoid `any`. Use discriminated unions for complex state.
- **Single Source of Truth**: Metadata, navigation maps, and data schemas should live in a shared package.
- **Documentation First**: If it's not in the spec, it doesn't exist in the implementation.
