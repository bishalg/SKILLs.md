---
name: repetitive_functionality
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# Repetitive Functionality

**Guideline Reference**: Google Play Policy - Repetitive Content  
**Severity**: REJECTION  
**Category**: Design

## What to Check

Your app must provide unique functionality and not be a duplicate of existing
apps.

## How to Detect

### Self-Assessment

- [ ] Does app exist in similar form on Play Store?
- [ ] Is this just a wrapper around web content?
- [ ] Is this a template-based app?
- [ ] Does it add unique value?

### Differentiation Check

- [ ] Unique features beyond basic functionality
- [ ] Original design/UI
- [ ] Additional capabilities
- [ ] Better user experience

## What Qualifies as Repetitive

### Examples of Problematic Apps

- Simple web browser (unless with unique features)
- Generic calculator
- Flashlight app (unless with unique features)
- RSS reader without unique curation
- Generic launcher
- wallpaper app with stock images

### Not Repetitive

- Apps with unique features
- Apps with unique content
- Apps with better UX
- Apps targeting specific niche
- Apps with original design

## Common Issues

### 1. Template Apps

```javascript
// BAD: Just a wrapper
const App = () => <WebView source={{ uri: 'https://existing-website.com' }} />;
```

### 2. No Unique Value

- All features exist in many other apps
- No differentiation from similar apps
- No reason to choose this app

### 3. Simple Web Wrapper

- No native features
- Just showing website
- No offline functionality

## Resolution

### Making Your App Unique

1. **Add Native Features**

```javascript
// GOOD: Native features beyond web
import * as Camera from 'expo-camera';
import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';
```

2. **Unique Content**

- Original content curation
- User-generated content
- Personalized experience

3. \*\*Better UX

- Faster performance
- Offline capability
- Better design

### Minimum for Approval

- Substantial native functionality
- Not just a web view
- Useful beyond existing apps

## Example Rejection

**Issue**: Your app is a duplicate of an existing app.

**Details**: Your app does not provide a substantial experience compared to
existing apps with the same functionality.

**Fix**:

- Add unique features
- Improve user experience
- Target a specific niche
- Create original content
- Remove if truly redundant

## Guidelines by App Type

### Web Browser

- Must have: bookmarks, tabs, history
- Should have: ad blocker, download manager, sync

### Calculator

- Must have: scientific functions
- Should have: history, conversion, customization

### Flashlight

- Must have: strobe, SOS, brightness
- Should have: widget, notification light

### Wallpaper

- Must have: original images
- Should have: categories, favorites, daily change

## Related Checks

- [minimal_functionality.md](minimal_functionality.md) - Minimum features
- [all_apps.md](../../guidelines/by-app-type/all_apps.md) - Basic requirements
