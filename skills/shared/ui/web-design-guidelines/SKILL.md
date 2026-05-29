---
name: web-design-guidelines
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: Web Interface Guidelines for accessible, performant, and beautiful UIs.
globs: "**/*.{ts,tsx,css,scss}"
---
# Web Interface Guidelines

## When to Apply
Apply these guidelines when designing or implementing UI components, ensuring accessibility, performance, and visual consistency.

## Focus States
- **Visibility**: Ensure focus indicators are clearly visible and have high contrast.
- **Keyboard Navigation**: All interactive elements must be reachable and usable via keyboard.
- **Order**: Focus order should follow the visual layout and logical flow.

## Forms
- **Labels**: All form inputs must have associated labels (visible or aria-label).
- **Validation**: Provide clear, inline error messages.
- **Autofill**: Use correct `autocomplete` attributes.

## Animation
- **Purpose**: Animations should be meaningful and not distracting.
- **Reduced Motion**: Respect `prefers-reduced-motion` media query.
- **Performance**: Animate only `opacity` and `transform` where possible.

## Typography
- **Hierarchy**: Use a clear typographic hierarchy (headings, body, captions).
- **Readability**: Ensure sufficient contrast and line height.
- **Scaling**: Use relative units (rem, em) for font sizes to support scaling.

## Images
- **Alt Text**: All images must have descriptive `alt` text (or empty for decorative).
- **Optimization**: Use optimized formats (WebP, AVIF) and correct sizing.

## Touch & Interaction
- **Target Size**: Interactive elements should have a minimum touch target size of 44x44px.
- **Feedback**: Provide immediate visual feedback for interactions (hover, active, focus).

## Dark Mode & Theming
- **Consistency**: Ensure colors and styles are consistent across themes.
- **System Preference**: Respect user's system theme preference appropriately.

## Locale & i18n
- **Flexible Layouts**: Design for variable text lengths across languages.
- **RTL Support**: Ensure layout supports Right-to-Left languages if applicable.
