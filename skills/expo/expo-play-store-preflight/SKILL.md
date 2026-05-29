---
name: expo-play-store-preflight
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# Skill: expo-play-store-preflight

## Description

Scan Android app for common Play Store rejection patterns before submission.
Identifies issues that commonly lead to app rejections and provides actionable
fixes.

## Prerequisites

- Android SDK configured (`android-sdk` or Android Studio)
- Access to Google Play Console (for production submissions)
- App built as Android APK/AAB (via `eas build -p android`)
- Node.js 18+ for running validation scripts

## Step 1: Identify App Type

Determine your app category to load the relevant checklist:

| App Type         | Primary Guidelines    | Additional Rules         |
| ---------------- | --------------------- | ------------------------ |
| General App      | `all_apps.md`         | metadata, privacy rules  |
| Subscription/IAP | `subscription_iap.md` | subscription_policy.md   |
| Games            | `games.md`            | ads_policy.md            |
| Kids/Family      | `kids.md`             | strict privacy + content |
| Health/Fitness   | `health_fitness.md`   | data_safety.md           |

## Step 2: Check Android Manifest and Build Configuration

### Required Checks

- [ ] **Package Name**: Must be unique, reverse-domain format (e.g.,
      `com.company.app`)
- [ ] **Version Code/Name**: Increment versionCode for updates
- [ ] **Target SDK**: Must target Android 14 (API 34) or higher
- [ ] **Permissions**: No dangerous permissions without justification
- [ ] **App Bundles**: Use AAB over APK for Play Store

### Manifest Validation Command

```bash
# Extract and validate AndroidManifest.xml
cd android && ./gradlew dependencies --configuration releaseRuntimeClasspath | grep "android:"
```

## Step 3: Run Rejection Rule Checks

### Metadata Rules

- [ ] **malware_reputation.md**: No suspicious code, legitimate permissions only
- [ ] **impersonation.md**: Unique branding, no copycat icons/names
- [ ] **inappropriate_content.md**: Content ratings match actual content
- [ ] **ads_policy.md**: Ads comply with Play Store ad policies

### Privacy Rules

- [ ] **privacy_policy.md**: Valid URL with privacy policy
- [ ] **data_safety.md**: Complete data safety form in Play Console

### Design Rules

- [ ] **repetitive_functionality.md**: Not a duplicate of existing apps
- [ ] **minimal_functionality.md**: Provides substantial functionality

### Subscription Rules (if applicable)

- [ ] **subscription_policy.md**: Clear pricing, easy cancellation

## Step 4: Report Findings

Run the preflight scan to generate a structured report:

```bash
# Run preflight checks (implement based on your CI/CD)
npx expo-play-store-preflight --type=subscription
```

### Report Format

```json
{
  "app": "com.example.myapp",
  "type": "subscription",
  "checks": [
    {
      "rule": "data_safety",
      "status": "FAIL",
      "severity": "REJECTION",
      "issue": "Data safety form incomplete",
      "fix": "Complete all sections in Play Console > App content > Data safety"
    }
  ],
  "summary": {
    "rejections": 2,
    "warnings": 3,
    "passed": 15
  }
}
```

## Step 5: Autofix + Validate

### Common Fixes

| Issue                  | Fix                                                                 |
| ---------------------- | ------------------------------------------------------------------- |
| Missing privacy policy | Add privacy policy URL in `app.json` → `android.config.permissions` |
| Incomplete data safety | Fill form in Play Console                                           |
| Wrong content rating   | Adjust in Play Console → App content → Content rating               |
| Permission issues      | Review `android/app/src/main/AndroidManifest.xml`                   |

### Validation

After fixes, rebuild and verify:

```bash
eas build -p android --profile=preview
# Verify with bundletool
bundletool validate --bundle=app.aab
```

## Gotchas

1. **Target SDK 34 Required**: Play Store requires new apps to target API 34+
   (Android 14)
2. **AAB Preferred**: Use Android App Bundle over APK for smaller downloads
3. **Data Safety is Critical**: Incomplete data safety forms are a top rejection
   reason
4. **Subscription Requires Disclosure**: Must clearly disclose pricing before
   paywall
5. **Kids Apps Have Extra Requirements**: Must complete "Designed for Families"
   program if targeting children
6. **ads.txt Required**: If displaying ads, need authorized digital sellers file
7. **Test Subscription Flows**: Play Store tests subscription compliance with
   test purchases

## File Structure

```
expo-play-store-preflight/
├── SKILL.md
└── references/
    ├── guidelines/
    │   ├── README.md
    │   └── by-app-type/
    │       ├── all_apps.md
    │       ├── subscription_iap.md
    │       ├── games.md
    │       ├── kids.md
    │       └── health_fitness.md
    └── rules/
        ├── metadata/
        │   ├── malware_reputation.md
        │   ├── impersonation.md
        │   ├── inappropriate_content.md
        │   └── ads_policy.md
        ├── privacy/
        │   ├── privacy_policy.md
        │   └── data_safety.md
        ├── design/
        │   ├── repetitive_functionality.md
        │   └── minimal_functionality.md
        └── subscriptions/
            └── subscription_policy.md
```
