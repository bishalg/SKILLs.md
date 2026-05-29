---
name: accessibility-seo-check
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: How to ensure high Accessibility (a11y) and SEO scores
created: 2026-01-19
last_updated: 2026-01-19
---

# Accessibility & SEO Workflow

To ensure high rankings and inclusivity, we enforce accessibility standards at three levels: **Linting**, **Automated Testing**, and **Monitoring**.

## 1. Development (Linting)

We use `eslint-plugin-jsx-a11y` to catch issues while coding.

// turbo-all

### Run A11y Lint Check
```bash
pnpm exec eslint apps/web/src --ext .tsx --rule 'jsx-a11y/*:error'
```

## 2. Automated Testing (Axe Core)

We use `@axe-core/playwright` to automatically audit pages during E2E tests.

### How to add an Axe test to a page:

Create a test file `e2e/a11y/tools-a11y.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Tools Accessibility', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/tools/horoscope');
    
    // Wait for content to load
    await page.waitForSelector('main');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
```

## 3. Lighthouse CI (Performance & SEO)

Run Lighthouse locally to verify scores before deployment.

### Run Lighthouse
```bash
pnpm exec lighthouse http://localhost:3000/tools/horoscope --view --only-categories=accessibility,best-practices,seo
```

## Checklist for Public Pages
- [ ] **Semantic HTML**: Use `<main>`, `<nav>`, `<article>`, `<header>`, `<footer>`.
- [ ] **Headings**: Ensure logical `h1` -> `h2` -> `h3` hierarchy. No skipped levels.
- [ ] **Alt Text**: All images must have meaningful `alt` text. Decorative images use `alt=""`.
- [ ] **Color Contrast**: Text must meet WCAG AA contrast ratio (4.5:1).
- [ ] **ARIA Labels**: Interactive elements without text (icons) need `aria-label`.
- [ ] **Keyboard Nav**: All interactive elements must be focusable and usable with Tab/Enter.
