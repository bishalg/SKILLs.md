---
name: all_apps
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# All Apps Guidelines

Base requirements that apply to all Android apps submitted to Google Play Store.

## Required Checklist

### Build Configuration

- [ ] Target Android 14 (API 34) or higher
- [ ] Use Android App Bundle (AAB) instead of APK
- [ ] Unique package name in reverse-domain format
- [ ] Version code incremented for each update
- [ ] App icon meets Play Store specifications (512x512 PNG)

### Content Rating

- [ ] Complete content rating questionnaire
- [ ] Content matches rating (no higher-rated content)
- [ ] Store listing matches app functionality

### Store Listing

- [ ] App title under 50 characters
- [ ] Short description under 80 characters
- [ ] Full description under 4000 characters
- [ ] At least 2 screenshots (phone and/or tablet)
- [ ] Feature graphic (1024x500)
- [ ] Privacy policy URL provided

### Permissions

- [ ] Only request necessary permissions
- [ ] Dangerous permissions have clear justification
- [ ] No system alerts/overlays without justification
- [ ] No accessibility services unless core functionality

### Functionality

- [ ] App launches without crashes
- [ ] Core functionality works offline (if applicable)
- [ ] No placeholder content
- [ ] App Store listing accurately describes features

## Technical Requirements

### AndroidManifest.xml Essentials

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.company.appname"
    android:versionCode="1"
    android:versionName="1.0.0">

    <uses-sdk
        android:minSdkVersion="21"
        android:targetSdkVersion="34" />
</manifest>
```

### Expo Configuration (app.json)

```json
{
  "expo": {
    "android": {
      "package": "com.company.appname",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/icon.png",
        "backgroundColor": "#ffffff"
      }
    }
  }
}
```

## Common Rejection Reasons (All Apps)

1. **Missing or Invalid Privacy Policy** - Most common rejection
2. **Incomplete Data Safety Form** - Required since 2022
3. **App Functionality Issues** - Crashes, slow loading
4. **Misleading Descriptions** - Listing doesn't match app
5. **Inappropriate Content** - Content rating mismatch

## Next Steps

After completing these checks, proceed to:

1. [Privacy Policy](../rules/privacy/privacy_policy.md)
2. [Data Safety](../rules/privacy/data_safety.md)
3. [Malware/Reputation](../rules/metadata/malware_reputation.md)
4. [Minimal Functionality](../rules/design/minimal_functionality.md)
