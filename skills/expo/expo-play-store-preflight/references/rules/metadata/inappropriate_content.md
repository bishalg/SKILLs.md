---
name: inappropriate_content
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# Inappropriate Content

**Guideline Reference**: Google Play Policy - Inappropriate Content  
**Severity**: REJECTION  
**Category**: Metadata

## What to Check

Your app must match its content rating and not contain prohibited content.

## How to Detect

### Content Rating Accuracy

- [ ] Content rating questionnaire completed honestly
- [ ] No content above selected rating
- [ ] All content types disclosed (violence, etc.)

### Prohibited Content Check

- [ ] No violence or gore (unless rated for it)
- [ ] No sexual content or nudity
- [ ] No hate speech or harassment
- [ ] No dangerous content (instructions for crimes)
- [ ] No regulated goods (drugs, weapons)

### User-Generated Content (UGC)

- [ ] Moderation policy in place
- [ ] Content reporting mechanism
- [ ] No UGC without moderation

## Content Rating Matrix

| Content Type | Everyone | Low Maturity | Medium Maturity | High Maturity |
| ------------ | -------- | ------------ | --------------- | ------------- |
| Violence     | Cartoon  | Minimal      | Graphic         | Intense       |
| Sex          | None     | Flirtation   | Sensual         | Explicit      |
| Drugs        | None     | References   | Use             | Sale          |
| Gambling     | None     | Social       | With prizes     | Real money    |

## Common Issues

### 1. Rating Mismatch

- App rated "Everyone" but contains violence
- Not disclosing cartoon violence
- Missing drug references

### 2. Missing Disclosures

- Not mentioning in-app purchases
- Not mentioning ads
- Not mentioning user-generated content

### 3. Problematic UGC

- No moderation of chat/comments
- No way to report content
- Allowing prohibited content

## Resolution

### Fix Steps

1. Review all content in app
2. Complete content rating honestly
3. Add required disclosures
4. Implement moderation for UGC

### Disclosure Requirements

```
In app description, include:
- "Contains in-app purchases"
- "Contains ads" (if applicable)
- "May include user-generated content" (if applicable)
```

## Example Rejection

**Issue**: Your app has been flagged for inappropriate content.

**Details**: The content rating does not accurately reflect the app's content.
Violence/gore/drugs/content was not disclosed in the content rating
questionnaire.

**Fix**:

- Re-rate app in Play Console
- Adjust app content to match rating
- Add required disclosures to store listing

## Categories of Prohibited Content

1. **Violence**: Graphic violence, violence towards animals
2. **Sexual Content**: Nudity, sexual acts, sexual content
3. **Harassment**: Bullying, hate speech, harassment
4. **Dangerous Content**: Instructions for crimes, self-harm
5. **Regulated Goods**: Drugs, weapons, tobacco, alcohol
6. **Gambling**: Real-money gambling (with exceptions)

## Related Checks

- [repetitive_functionality.md](../design/repetitive_functionality.md) - App
  quality
- [kids.md](../../guidelines/by-app-type/kids.md) - Kids-specific content rules
