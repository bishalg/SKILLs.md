---
name: smoke-testing
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: How to implement and run Smoke Tests to verify production builds
created: 2026-01-30
last_updated: 2026-01-30
---

# Smoke Testing Workflow

Smoke tests are a subset of tests that verify the most critical functions of an application work. In the context of Next.js, this ensures that every page loads correctly (Status 200) and doesn't crash on the client side (No JS errors).

## 1. Why Unit Tests Miss Runtime Errors

Unit tests usually test components in isolation (mocked context). They often don't catch:
- Missing global styles or context providers.
- Environment variable issues.
- Bundler/Build configuration errors (like missing CSS or invalid imports that pass TS check but fail runtime).
- Runtime errors like "window is not defined".

## 2. Setting up a Basic Smoke Test (Playwright)

We recommend using **Playwright** for high-fidelity browser testing.

### Step 1: Install Playwright
```bash
pnpm add -D @playwright/test
pnpm exec playwright install
```

### Step 2: Create a Smoke Test Config `playwright.smoke.config.ts`
Create a simplified config specifically for smoke testing production.

### Step 3: Write the Smoke Test `e2e/smoke.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

// List of critical paths to check
const ROUTES = [
  '/',
  '/tools/ghati-hour-converter',
  '/tools/matchmaking',
  '/kundali',
  '/about',
  // Add all tool routes here
];

for (const route of ROUTES) {
  test(`should load ${route} without crashing`, async ({ page }) => {
    // 1. Navigate to the page
    const response = await page.goto(route);

    // 2. Check HTTP Status
    expect(response?.status()).toBe(200);

    // 3. Check for Console Errors (Optional but recommended)
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error(`Error on ${route}: ${msg.text()}`);
      }
    });

    // 4. Visual Check (wait for critical element)
    await expect(page.locator('body')).toBeVisible();
    
    // 5. Basic interactivity check (optional)
    // await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
}
```

## 3. Running Smoke Tests in CI

Add this step to your deployment pipeline (`.github/workflows/deploy.yml`) **after** deployment to staging/preview but **before** production promotion.

```yaml
- name: Run Smoke Tests
  run: pnpm playwright test -c playwright.smoke.config.ts --base-url=${{ env.DEPLOYMENT_URL }}
```

## 4. Immediate Check (Crawler Script)

If you don't want full Playwright yet, use a simple `curl` loop or a Node script to check status codes:

```bash
#!/bin/bash
URLS=(
  "https://your-site.com/"
  "https://your-site.com/tools/ghati-hour-converter"
)

for url in "${URLS[@]}"; do
  status_code=$(curl --write-out %{http_code} --silent --output /dev/null "$url")
  if [[ "$status_code" -ne 200 ]]; then
    echo "❌ $url failed with status $status_code"
    exit 1
  else
    echo "✅ $url : $status_code"
  fi
done
```
