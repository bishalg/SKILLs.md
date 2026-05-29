---
name: ads_policy
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# Ad Policy Compliance

**Guideline Reference**: Google Play Policy - Ad Format and Execution  
**Severity**: REJECTION  
**Category**: Metadata

## What to Check

Your app's advertising must comply with Google Play ad policies and not harm
user experience.

## How to Detect

### Ad Placement

- [ ] No ads that cover the entire screen unexpectedly
- [ ] No interstitial ads without user initiation
- [ ] No ads in unexpected places (after every action)
- [ ] No ads in system dialogs

### Ad Content

- [ ] No deceptive ad formats
- [ ] No malware or phishing ads
- [ ] No ads for prohibited content
- [ ] No ads targeting children inappropriately

### User Experience

- [ ] Clear "Ad" labeling
- [ ] Close button clearly visible
- [ ] No accidental clicks
- [ ] Reasonable ad frequency

## Ad Format Requirements

### Allowed

- Banner ads (with clear boundaries)
- Native ads (clearly labeled)
- Rewarded video ads (voluntary)
- Ads in content feeds (clearly marked)

### Prohibited

- Full-screen interstitial without user action
- Ads that simulate system notifications
- Ads that require clicking multiple times to close
- Ads in phone dialer, SMS apps

## Common Issues

### 1. Interstitial Abuse

```javascript
// BAD: Show interstitial after every action
const showInterstitial = () => {
  // This frustrates users
  AdMobInterstitial.showAd();
  navigateToNextScreen();
};

// GOOD: Show only after user-initiated action or level complete
const onLevelComplete = () => {
  if (canShowAd) {
    AdMobInterstitial.showAd();
  }
};
```

### 2. Missing "Ad" Labeling

- Native ads must be clearly labeled
- Cannot disguise ads as content
- Must be obvious this is advertising

### 3. Kids Apps

- No ads for ages 5 and under
- Strictly curated ads for ages 6-12
- No interstitial or video ads during gameplay

## Resolution

### Best Practices

1. Limit ad frequency (max 1 interstitial per 4 actions)
2. Always use close buttons on ads
3. Don't place ads over UI elements
4. Test on real devices
5. Use rewarded ads for better UX

### Ad SDK Configuration

```javascript
// AdMob example - configure ad request properly
const adRequestOptions = {
  requestNonPersonalizedAdsOnly: true, // For kids apps
  keywords: ['gaming', 'entertainment'], // Appropriate keywords
};
```

## Example Rejection

**Issue**: Your app contains prohibited advertising practices.

**Details**: The app displays ads in a way that interferes with app usage or
displays full-screen interstitial ads without user initiation.

**Fix**:

- Remove automatic interstitials
- Add user-initiated ad triggers only
- Ensure close button is always visible
- Limit ad frequency

## ads.txt Requirement

For apps showing ads, you need an ads.txt file:

```
# Your domain.com/ads.txt
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Add in your web server or use Expo Router static export.

## Related Checks

- [privacy_policy.md](../privacy/privacy_policy.md) - Ad data collection
  disclosure
- [data_safety.md](../privacy/data_safety.md) - Ad SDK data sharing
- [kids.md](../../guidelines/by-app-type/kids.md) - Kids ads restrictions
