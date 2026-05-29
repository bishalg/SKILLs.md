---
name: expo-app-store-compliance
description: >
  Comprehensive guide for Expo/React Native app submission compliance.
  Covers Apple App Store Review Guidelines and Google Play Developer Program Policies.
  Includes checklists for metadata, privacy, technical requirements, and common rejection reasons.
---

# 📱 Expo App Store Compliance Skills

> **Document Date:** December 22, 2025  
> **Last Policy Updates:** 
> - 🍎 Apple App Store Review Guidelines: [February 6, 2026](https://developer.apple.com/news/?id=d75yllv4) [[11]]
> - 🤖 Google Play Developer Program Policy: [April 15, 2026](https://support.google.com/googleplay/android-developer/answer/16944162) [[29]]
>
> **Primary Sources:**
> - [Apple App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
> - [Google Play Developer Program Policy](https://support.google.com/googleplay/android-developer/answer/16944162)
> - [Expo App Store Best Practices](https://docs.expo.dev/distribution/app-stores/) [[20]]

---

## 🔍 Quick Validation Checklist

### ✅ Pre-Submission Fundamentals (Both Stores)
```yaml
# Run this checklist before every submission
app_compliance:
  - [ ] App builds without crashes on physical devices (not just simulators)
  - [ ] All required permissions have user-facing justification strings
  - [ ] Privacy policy URL is live, public, and non-geofenced
  - [ ] Demo account/login credentials provided for App Review
  - [ ] Backend services are live and accessible during review period
  - [ ] No placeholder text, empty screens, or "coming soon" features
  - [ ] App icon meets platform specs (no transparency on Android, proper sizes)
  - [ ] Splash screen configured (no white flash on launch)
  - [ ] Deep links/universal links tested and functional
```

---

## 🍎 Apple App Store Requirements

### 📋 Metadata & Store Listing
```yaml
apple_metadata:
  bundle_id: "Must match exactly in app.json, Xcode, and App Store Connect"
  versioning:
    - CFBundleShortVersionString: "User-facing version (e.g., 1.2.0)"
    - CFBundleVersion: "Build number (increment with each upload)"
  screenshots:
    - Required sizes: 6.5" (iPhone XS Max), 5.5" (iPhone 8 Plus), 12.9" (iPad Pro)
    - Must show actual app UI (no mockups with device frames)
    - Localized for each supported language
  description:
    - First 3 lines are critical (shown in search results)
    - Avoid keyword stuffing or competitor names
    - Clearly state core functionality and value proposition
```

### 🔐 Privacy & Data Collection (App Tracking Transparency)
```yaml
apple_privacy:
  # Required for iOS 14.5+
  att_prompt:
    - [ ] NSUserTrackingUsageDescription key present in Info.plist
    - [ ] Clear, specific explanation of why tracking is needed
    - [ ] Prompt only shown when contextually relevant (not at first launch)
  
  # App Privacy Nutrition Label (App Store Connect)
  data_collection_declaration:
    - [ ] Audit all SDKs (expo-analytics, expo-ads, third-party libs)
    - [ ] Declare: Data linked to user / Data used to track / Data not collected
    - [ ] Common Expo modules requiring declaration:
        • expo-updates → Crash Data
        • expo-location → Precise Location (if used)
        • expo-camera → Photos/Media, Camera Access
        • expo-contacts → Contacts (requires justification)
```

### ⚙️ Technical Requirements
```yaml
apple_technical:
  minimum_os: "iOS 15.0+ recommended (check Expo SDK compatibility)"
  architecture: "Must support arm64; no 32-bit binaries"
  ipv6: "App must function on IPv6-only networks (Apple requirement)"
  background_modes:
    - [ ] Only request background modes actually used
    - [ ] Provide justification in App Review Notes if using:
        • audio, location, fetch, remote-notification, background-processing
  entitlements:
    - [ ] Push Notifications: Configure APNs certificates in Expo/EAS
    - [ ] Sign in with Apple: Required if using other social logins (Guideline 4.8)
    - [ ] In-App Purchase: Use StoreKit; no external payment links for digital goods
```

### 🚫 Common Rejection Reasons (Apple)
```yaml
apple_rejections:
  guideline_2_1_completeness:
    - "App crashes on launch or during review testing"
    - "Login flow broken or demo credentials invalid"
    - "Features marked 'coming soon' or disabled"
  
  guideline_4_2_minimum_functionality:
    - "App is just a webview wrapper of a website"
    - "No unique mobile-specific functionality"
    - "Content is thin or not regularly updated"
  
  guideline_3.1.1_payments:
    - "Selling digital content without using In-App Purchase"
    - "Linking to external payment pages for digital goods"
    - "Confusing pricing or hidden subscription terms"
  
  guideline_5.1.1_data_collection:
    - "Collecting data without privacy policy link"
    - "Requesting permissions without NS*UsageDescription"
    - "Tracking users without ATT prompt (iOS 14.5+)"
```

---

## 🤖 Google Play Store Requirements

### 📋 Store Listing & Metadata
```yaml
google_metadata:
  package_name: "Must match exactly in app.json, playstore, and signing config"
  versioning:
    - versionCode: "Integer, must increment with each upload (required)"
    - versionName: "User-facing string (e.g., '1.2.0')"
  content_rating:
    - [ ] Complete IARC questionnaire in Play Console
    - [ ] Rating must match actual app content (no under-rating)
  screenshots:
    - Required: Phone (720x1280 min), 7" tablet, 10" tablet
    - Optional but recommended: Wear OS, Android TV, Chrome OS
    - Must be in English or localized for target regions
  feature_graphic: "1024x500px PNG/JPG for store header"
```

### 🔐 Data Safety Section (Mandatory)
```yaml
google_data_safety:
  # Required in Play Console > App Content > Data safety
  declaration_requirements:
    - [ ] Disclose ALL data collected (including via SDKs)
    - [ ] Specify: Data type, Purpose, Whether encrypted in transit/at rest
    - [ ] Declare if data is shared with third parties
    - [ ] Link to privacy policy (must be same URL as in app)
  
  expo_modules_common_declarations:
    expo-analytics-amplitude: "App activity, App info/performance, Device IDs"
    expo-location: "Precise location, Approximate location"
    expo-camera: "Photos/videos, Camera access"
    expo-contacts: "Contacts"
    expo-notifications: "App interactions, Device IDs"
  
  # Critical: Do NOT declare "Data not collected" if using any analytics/ads SDKs
```

### 🔑 Permissions Policy (Updated April 2026)
```yaml
google_permissions_2026:
  # New/Updated policies effective April 15, 2026 [[29]]
  
  contacts_permission:
    - "Apps without broad contacts access MUST use Android Contact Picker"
    - "Justify READ_CONTACTS permission in Play Console declaration"
    - "Expo alternative: expo-contacts with limited scope + user education"
  
  location_permission:
    - "Use 'location button' as minimum scope for precise location"
    - "Foreground service for location: Only allowed for navigation, fitness tracking"
    - "Geofencing: Use Geofence API (foreground services no longer approved)"
  
  photo_video_permission:
    - "Clarified: Only request access to media your app actually uses"
    - "Use Android Photo Picker for selective media access"
  
  sensitive_permissions_audit:
    - [ ] Remove unused permissions from app.json/android/permissions
    - [ ] For each permission: Is it core functionality? Can it be optional?
    - [ ] Provide in-app explanation BEFORE system permission dialog
```

### ⚙️ Technical Requirements
```yaml
google_technical:
  target_api_level: "Must target Android 15 (API 35) for new apps/updates [[28]]"
  64_bit: "Required: arm64-v8a native libraries"
  app_signing:
    - "Use Google Play App Signing (recommended) or upload your own key"
    - "Never lose your upload key; recovery is complex"
  background_execution:
    - [ ] Avoid foreground services unless justified (navigation, media playback)
    - [ ] Use WorkManager for deferrable background tasks
    - [ ] Declare all foreground service types in AndroidManifest
  health_connect:
    - "If accessing health data: Declare in Play Console + follow granular permissions"
    - "Prohibited: Using health data for employment/insurance decisions"
```

### 🚫 Common Rejection Reasons (Google Play)
```yaml
google_rejections:
  policy_violation_content:
    - "User-generated content without moderation/reporting tools"
    - "Dating/UGC apps without child safety safeguards (if minors can access)"
    - "Financial apps without proper licensing disclosures (region-specific)"
  
  policy_violation_functionality:
    - "App crashes, ANRs, or fails to install on test devices"
    - "Core features require login but no demo account provided"
    - "App is a webview with minimal native functionality"
  
  policy_violation_monetization:
    - "Misleading ads (disguised as app content, fake close buttons)"
    - "Subscription terms not clearly disclosed before purchase"
    - "Using Google Play Billing for physical goods/services"
  
  policy_violation_permissions:
    - "Requesting sensitive permissions without clear in-app justification"
    - "Using prohibited permissions for loan/financial apps (contacts, photos)"
    - "Collecting AAID/IMEI from child-directed apps"
```

---

## 🧩 Expo-Specific Implementation Checks

### 📦 EAS Build & Submit Configuration
```yaml
expo_eas_config:
  app_json_validation:
    - [ ] ios.bundleIdentifier and android.package are valid and match stores
    - [ ] ios.infoPlist.NS*UsageDescription keys populated for all permissions
    - [ ] android.permissions array only includes necessary permissions
    - [ ] updates.enabled: false for store builds (unless using EAS Update properly)
  
  eas_build_profile:
    production:
      distribution: "store"
      ios:
        enterpriseProvisioning: "universal" # or "adhoc" for TestFlight
        buildConfiguration: "Release"
      android:
        buildType: "app-bundle" # Required for Play Store
        gradleCommand: ":app:bundleRelease"
  
  eas_submit_prerequisites:
    apple:
      - [ ] App Store Connect app record created
      - [ ] Agreements, Tax, and Banking set up in App Store Connect
      - [ ] Provisioning profiles managed via EAS or manually
    google:
      - [ ] Google Service Account with Play Developer API access
      - [ ] App created in Play Console (draft state OK)
      - [ ] First upload done manually (Play Console API limitation)
```

### 🔌 SDK & Library Compliance Audit
```yaml
expo_sdk_audit:
  # Before submission, audit all dependencies:
  third_party_sdks:
    - [ ] Check each SDK's privacy policy and data collection practices
    - [ ] Verify SDK is compatible with latest Expo SDK version
    - [ ] Confirm SDK doesn't request unnecessary permissions
    - [ ] Update to latest SDK versions (security/compliance fixes)
  
  expo_modules_compliance:
    expo-location:
      - "Add NSLocationWhenInUseUsageDescription (iOS)"
      - "Request foreground permission first; background only if essential"
      - "Explain location use case before system prompt"
    
    expo-notifications:
      - "Configure APNs (iOS) and FCM (Android) credentials in EAS"
      - "Handle notification permissions gracefully (user can deny)"
    
    expo-in-app-purchases:
      - "Only use for digital goods (guideline 3.1.1)"
      - "Implement receipt validation server-side"
      - "Clearly display subscription terms, renewal, cancellation"
    
    expo-ads-admob:
      - "Declare ad data collection in both stores' privacy sections"
      - "Implement user consent flow for personalized ads (GDPR/CCPA)"
      - "Test ad loading doesn't block app startup"
```

### 🌐 Internationalization & Regional Compliance
```yaml
expo_i18n_compliance:
  app_store_regions:
    - [ ] Privacy policy covers all regions where app is distributed
    - [ ] Age rating questionnaire completed for each store region
    - [ ] Content warnings for region-specific sensitivities (e.g., gambling, dating)
  
  regional_restrictions:
    google_play:
      - "Financial apps: Declare target countries + provide licenses [[29]]"
      - "Health apps: Complete Health apps declaration form"
      - "Child-directed apps: Use Families Self-Certified Ads SDKs only"
    apple_app_store:
      - "Export compliance: Declare encryption usage (most apps: 'Yes, exempt')"
      - "China: ICP license required for apps with user accounts/content"
      - "EU: DMA compliance for alternative payment methods (if applicable)"
```

---

## 🤖 AI IDE Validation Prompts

Use these prompts to have your AI IDE check compliance:

```markdown
### Prompt: Pre-Submission Audit
"Review my Expo app configuration (app.json, package.json, eas.json) against Apple App Store Guideline 2.1 (App Completeness) and Google Play Policy on Functionality. Flag any:
- Missing demo account/login flow for review
- Placeholder content or disabled features
- Permissions requested without usage descriptions
- Background modes declared but not implemented
Provide specific file/line references and fix suggestions."

### Prompt: Privacy Compliance Check
"Audit my app's data collection practices against Apple's App Privacy requirements and Google Play's Data Safety section. 
1. List all Expo modules and third-party SDKs that collect user data
2. Map each to required declarations in App Store Connect and Play Console
3. Identify any missing NS*UsageDescription keys (iOS) or permission justifications (Android)
4. Suggest privacy policy clauses needed for disclosed data practices"

### Prompt: Permission Justification Generator
"For each permission in my app.json android.permissions array, generate:
- A user-facing explanation string (for in-app pre-permission dialog)
- The required platform usage description (iOS Info.plist / Android manifest)
- A justification statement for App Review/Play Console declaration
Focus on: location, camera, contacts, notifications, background location"
```

---

## 🔄 Maintenance & Updates

```yaml
compliance_maintenance:
  monthly:
    - "Review Apple/Google policy announcement pages for updates"
    - "Audit third-party SDK versions for security/compliance patches"
    - "Test app on latest iOS/Android beta versions (if targeting new OS)"
  
  pre_release:
    - "Run full compliance checklist above"
    - "Update Data Safety / App Privacy declarations if features changed"
    - "Verify demo account credentials are active for review team"
  
  post_rejection:
    - "Document exact rejection reason + guideline reference"
    - "Implement fix + add regression test to prevent recurrence"
    - "Update this skills.md with new lesson learned"
```

---

> ℹ️ **Disclaimer**: App store policies change frequently. Always verify requirements against official sources before submission. This guide is a living document—update it as policies evolve.  
> 🔗 **Policy Update Feeds**:  
> - [Apple Developer News](https://developer.apple.com/news/)  
> - [Google Play Policy Blog](https://android-developers.googleblog.com/)  
> - [Expo Changelog](https://github.com/expo/expo/blob/main/changelogs/CHANGELOG.md)
