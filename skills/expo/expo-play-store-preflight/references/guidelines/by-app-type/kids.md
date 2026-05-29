---
name: kids
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# Kids / Family Apps Guidelines

Requirements for apps targeting children under 13 (or "Made for Kids" program).

## Critical: Designed for Families Program

Apps targeting children MUST enroll in Google's "Designed for Families" program.

### Enrollment Requirements

- [ ] Complete Designed for Families application
- [ ] Comply with Families Program Policies
- [ ] App meets all age-appropriate design requirements

## Required Checklist

### Age Verification

- [ ] App clearly designed for children under 13
- [ ] Target age group selected (5-7, 8-10, 11-12)
- [ ] No mixed audience targeting

### Content Requirements (Strict)

- [ ] No violence or frightening content
- [ ] No user-generated content
- [ ] No social features
- [ ] No external links (except privacy policy)
- [ ] No personal information collection
- [ ] No advertising to children

### Ads Policy (Strict)

- [ ] NO ADS in apps for ages 5 and under
- [ ] Strictly curated ads only for ages 6-12
- [ ] No interstitial ads during gameplay
- [ ] No ads during loading screens
- [ ] No in-app purchase promotions

### Privacy (Strict)

- [ ] NO collection of personal data
- [ ] NO device identifiers
- [ ] NO analytics
- [ ] NO third-party SDKs that collect data
- [ ] Privacy policy prominently displayed
- [ ] Parental consent mechanism (for older kids)

### Functionality

- [ ] Simple, intuitive navigation
- [ ] Large touch targets for small fingers
- [ ] No distracting elements
- [ ] Clear feedback for actions
- [ ] Parental controls (if app has settings)

## Technical Requirements

### No Prohibited Features

- [ ] No account creation required
- [ ] No sharing to social media
- [ ] No location services
- [ ] No camera/microphone access
- [ ] No contacts access

### SDK Restrictions

- [ ] No advertising SDKs (for ages 5 and under)
- [ ] No analytics SDKs
- [ ] No crash reporting (if requires personal data)
- [ ] Only kid-safe SDKs permitted

### AndroidManifest

```xml
<uses-sdk
    android:minSdkVersion="21"
    android:targetSdkVersion="34" />
<!-- No special permissions needed for basic kids app -->
```

## Store Listing

### Content Rating

- [ ] Complete "Designed for Families" questionnaire
- [ ] Select appropriate age bands
- [ ] All content accurately disclosed

### Listing Requirements

- [ ] Clear, family-friendly description
- [ ] Screenshots showing actual content
- [ ] Privacy policy URL (required)
- [ ] Contact email for parental inquiries

## Common Kids App Rejections

1. **No Families Program Enrollment** - Must enroll before publishing
2. **Ads in Young Kids Apps** - No ads allowed for ages 5 and under
3. **Data Collection** - Cannot collect any personal data
4. **External Links** - Cannot link to external sites (except privacy)
5. **User-Generated Content** - Not permitted in kids apps

## Pre-Flight Checklist

- [ ] Enrolled in Designed for Families program
- [ ] No prohibited SDKs or features
- [ ] Privacy policy is prominent
- [ ] No advertising (for youngest age group)
- [ ] All content rating questions answered
- [ ] App passes Family Guidelines Checklist

## Related Rules

- [privacy_policy.md](../rules/privacy/privacy_policy.md)
- [data_safety.md](../rules/privacy/data_safety.md)
- [ads_policy.md](../rules/metadata/ads_policy.md)
- [inappropriate_content.md](../rules/metadata/inappropriate_content.md)
