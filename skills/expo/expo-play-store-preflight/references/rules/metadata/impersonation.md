---
name: impersonation
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# Impersonation Issues

**Guideline Reference**: Google Play Policy - Intellectual Property  
**Severity**: REJECTION  
**Category**: Metadata

## What to Check

Your app must not impersonate other brands, companies, products, or infringe on
intellectual property.

## How to Detect

### Visual Check

- [ ] App icon is original (not copycat)
- [ ] App name doesn't copy famous brands
- [ ] No fake login screens for known services
- [ ] Screenshots don't use trademarked images

### Name Check

```bash
# Check your package name and app name don't conflict
# Search Google Play for similar names
# Check for trademark conflicts
```

### Store Listing

- [ ] Developer name is accurate
- [ ] Contact email is valid and matches developer
- [ ] No false claims of affiliation

## Common Issues

### 1. Brand Impersonation

- App using "Instagram-like" interface
- Fake login for "Facebook"
- App named "WhatsApp Plus" (not official)

### 2. Icon Similarity

- Too similar to famous app icons
- Using famous brand logos
- Modified famous app icons

### 3. False Claims

- "Official" app when not affiliated
- Claiming to be from a company you're not
- Fake reviews or ratings manipulation

## Resolution

### Guidelines for Original Content

1. Use original icons and screenshots
2. Choose unique, distinctive name
3. Be truthful about affiliations
4. Don't copy UI patterns from specific apps

### Naming Best Practices

```
Good: "TaskMaster - Daily Planner"
Bad:  "Google Tasks Free"
Bad:  "WhatsApp 2"
Bad:  "Instagram Downloader"
```

## Example Rejection

**Issue**: Your app infringes on the intellectual property rights of another
company.

**Details**: The app name/icon/screenshots are too similar to [Brand Name].

**Fix**:

- Remove all references to trademarked names
- Use original icon design
- Don't claim affiliation you don't have
- Rewrite description without brand mentions

## Pre-flight Checklist

- [ ] Original app icon (no famous brand lookalikes)
- [ ] Unique app name (search for conflicts)
- [ ] No trademarked terms in title
- [ ] Screenshots don't show other apps
- [ ] Developer profile is accurate

## Related Checks

- [malware_reputation.md](malware_reputation.md) - Trust signals
- [inappropriate_content.md](inappropriate_content.md) - Content integrity
