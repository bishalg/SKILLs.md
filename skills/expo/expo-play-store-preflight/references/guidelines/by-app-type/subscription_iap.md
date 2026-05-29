---
name: subscription_iap
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# Subscription / IAP Apps Guidelines

Guidelines for apps that include subscriptions, in-app purchases, or paid
features.

## Required Checklist

### Subscription Compliance

- [ ] Clear subscription pricing displayed before paywall
- [ ] Subscription terms clearly stated
- [ ] Easy cancellation process available in-app
- [ ] Free trial clearly disclosed with automatic billing
- [ ] Subscription manages meet Google Play policies

### In-App Purchases

- [ ] All products match description exactly
- [ ] Virtual currency rates clearly displayed
- [ ] No misleading real-money gambling
- [ ] Loot boxes/probability disclosed (if applicable)

### Payment Disclosures

- [ ] "Subscribe to unlock" flow is clear
- [ ] Price shown in local currency
- [ ] Billing occurs through Google Play Billing
- [ ] No alternative payment methods promoted

### Store Listing

- [ ] Subscription terms in app description
- [ ] Pricing clearly shown in screenshots (if required)
- [ ] "Contains in-app purchases" tag

## Google Play Billing Requirements

### Implementation

```javascript
// Using expo-in-app-purchases or react-native-iap
import * as Purchases from 'react-native-iap';

const products = await Purchases.getProducts({
  skus: ['subscription_monthly', 'subscription_yearly'],
});
```

### Subscription Products Must Include

- Clear name ("Premium Monthly")
- Price with currency
- Billing period (weekly/monthly/yearly)
- Trial period info (if applicable)

## Subscription Policy Compliance

### Pricing Disclosure (Required)

- Display price before subscription screen
- Show "per month" or "per year" clearly
- Show first billing date for trials
- Total annual cost for monthly subscriptions

### Cancellation Flow (Required)

- One-tap cancellation in-app
- Must work without contacting support
- Clear confirmation of cancellation

### Refund Policy

- Follow Google Play refund window (48 hours for trials)
- Display refund policy clearly

### Key Rules

- [Subscription Policy](../rules/subscriptions/subscription_policy.md)
- [Data Safety - Payments](../rules/privacy/data_safety.md) (select "Payment
  info" in data safety)

## Common Rejection Reasons

1. **Unclear Pricing** - "Free to download" but paywall immediately
2. **No Cancellation** - Must cancel in-app, not just on website
3. **Misleading Subscriptions** - "One week free" buried in terms
4. **Missing Disclosure** - Not mentioning auto-renewal

## Testing

### Test Purchases

- Use license testing with `testId` in Play Console
- Test subscription purchase flow
- Test cancellation flow
- Verify receipt validation

### Pre-submission Checklist

- [ ] Test purchase on physical device
- [ ] Verify subscription activates immediately
- [ ] Verify cancellation works
- [ ] Check "Manage subscription" link opens Play Store

## Related Rules

- [subscription_policy.md](../rules/subscriptions/subscription_policy.md)
- [ads_policy.md](../rules/metadata/ads_policy.md)
- [data_safety.md](../rules/privacy/data_safety.md)
