---
name: privacy_policy
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# Privacy Policy Requirements

**Guideline Reference**: Google Play Policy - Privacy, Security, and Deception  
**Severity**: REJECTION  
**Category**: Privacy

## What to Check

Apps collecting personal data must have a privacy policy that clearly discloses
data practices.

## When Required

A privacy policy is REQUIRED if your app:

- Collects personal data
- Has user accounts
- Uses analytics
- Has advertising
- Collects any device identifiers

## How to Detect

### Check if Policy is Needed

```bash
# Check for data collection in code
grep -r "analytics" src/
grep -r "track" src/
grep -r "userId" src/
```

### Policy Requirements

- [ ] Valid, accessible URL
- [ ] Hosted on permanent domain
- [ ] In English (and app's languages)
- [ ] Includes all third-party SDKs used

## Privacy Policy Must Include

### Data Collection

- What data is collected
- How data is collected
- Why data is collected

### Data Usage

- How data is used
- Who data is shared with
- Third-party service disclosure

### User Rights

- How to access/delete data
- How to opt-out
- Contact information

### Third-Party Services

List all SDKs that collect data:

- Analytics (Firebase Analytics, etc.)
- Advertising (AdMob, etc.)
- Crash reporting
- Authentication
- Any other data-collecting SDK

## Common Issues

### 1. Missing Privacy Policy

```html
<!-- Must be hosted, not just a placeholder -->
<!-- BAD: No policy URL in Play Console -->
<!-- GOOD: https://yourdomain.com/privacy -->
```

### 2. Incomplete Policy

- Missing third-party SDK disclosure
- Not mentioning data collection
- No contact information

### 3. Broken Links

- 404 errors on policy URL
- Domain no longer active
- Policy moved without redirect

## Resolution

### Creating a Privacy Policy

1. Use a privacy policy generator or lawyer
2. List all data collected
3. List all third-party SDKs
4. Include contact email
5. Host on permanent URL
6. Add URL to Play Console

### Expo Configuration

```json
// app.json - Add to Play Store listing
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSPrivacyAccessedAPITypes": [],
        "NSPrivacyCollectedDataTypes": []
      }
    }
  }
}
```

### AndroidManifest reference

```xml
<!-- Link to privacy policy in app -->
<meta-data
    android:name="android.webkit.WebView.EnableSafeBrowsing"
    android:value="true" />
```

## Example Rejection

**Issue**: Your app is missing a valid privacy policy.

**Details**: Your app accesses personal data but does not provide a privacy
policy in the Play Store listing and within the app.

**Fix**:

- Create privacy policy at permanent URL
- Add URL to Play Console → App content → App access
- Add URL in-app (settings or about screen)

## Privacy Policy Template

```markdown
# Privacy Policy

## Data Collection

[What data you collect]

## How We Use Data

[How you use the data]

## Third-Party Services

- Firebase Analytics: Analytics
- AdMob: Advertising

## Contact

[email@domain.com]
```

## Related Checks

- [data_safety.md](data_safety.md) - Data safety form
- [malware_reputation.md](../metadata/malware_reputation.md) - Trust
