---
name: subscription_policy
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# Subscription Policy Compliance

**Guideline Reference**: Google Play Policy - Subscriptions and Refunds  
**Severity**: REJECTION  
**Category**: Subscriptions

## What to Check

Apps with subscriptions must comply with Play Store subscription policies.

## Required Disclosures

### Pre-Purchase Disclosure

- [ ] Clear price before subscription
- [ ] Price in local currency
- [ ] Billing period (weekly/monthly/yearly)
- [ ] Trial period terms (if any)
- [ ] Auto-renewal disclosure

### In-App Disclosure

```
Subscription: $X.99/week (or month/year)
- Cancel anytime
- Auto-renews unless cancelled
- Trial period: X days free
```

## Key Requirements

### 1. Clear Pricing (Required)

- Display price prominently
- Show billing cycle
- Show total annual cost
- First billing date for trials

### 2. Easy Cancellation (Required)

- Must cancel in-app
- No more than 3 taps to cancel
- Cancel button easily accessible
- Confirmation of cancellation

### 3. Trial Disclosure (Required)

- Clear trial length
- Auto-billing after trial
- How to cancel during trial

### 4. Subscription Management

- "Manage subscription" link
- Works without support contact
- Shows next billing date
- Shows subscription status

## Common Issues

### 1. Hidden Pricing

```javascript
// BAD: No price shown before paywall
const SubscribeButton = () => (
  <Button onPress={buySubscription}>Subscribe Now</Button>
);

// GOOD: Show price first
const SubscribeButton = () => (
  <View>
    <Text>Premium - $4.99/month</Text>
    <Button onPress={buySubscription}>Subscribe Now</Button>
  </View>
);
```

### 2. Hard to Cancel

- Must email to cancel
- Must call to cancel
- Hidden cancel option
- No in-app cancellation

### 3. Misleading Trials

- "Start free trial" without saying auto-bill
- Hidden automatic renewal
- Unclear trial length

### 4. Wrong Price Display

- Price not in local currency
- Not showing billing period
- Hiding total cost

## Resolution

### Implementation Best Practices

```javascript
// Show subscription info before purchase
const SubscriptionCard = ({ product }) => (
  <View>
    <Text style={{ fontSize: 24 }}>{product.localizedPrice}</Text>
    <Text>{product.description}</Text> {/* "Billed weekly/monthly" */}
    <Text>Cancel anytime</Text>
    {product.freeTrialPeriodAndroid && (
      <Text>Free for {product.freeTrialPeriodAndroid}</Text>
    )}
  </View>
);

// Easy cancellation link
<Button
  onPress={() => {
    // Open Play Store subscription management
    linkToSubscriptionManagement();
  }}
>
  Manage Subscription
</Button>;
```

### Required Subscription Terms (Add to Description)

```
Subscriptions:
- [Plan name]: [Price]/[period]
- Cancel anytime in Play Store
- Auto-renews unless cancelled
- [Trial info if applicable]
```

## Pre-Flight Checklist

- [ ] Price shown before paywall
- [ ] Billing period clearly stated
- [ ] Trial terms clearly disclosed
- [ ] Auto-renewal mentioned
- [ ] In-app cancellation works
- [ ] "Manage subscription" works
- [ ] Cancellation confirmation shown

## Testing

### Must Test

- [ ] Purchase flow from start to finish
- [ ] Cancellation flow in-app
- [ ] Subscription status shows correctly
- [ ] Trial conversion works
- [ ] Test on physical device

### Test Subscriptions

- Use test IDs in Play Console
- Test with "license test" account
- Verify receipt handling

## Example Rejection

**Issue**: Your subscription does not comply with Play Store policies.

**Details**: The app does not clearly disclose subscription terms before
purchase. Users cannot easily cancel the subscription in the app.

**Fix**:

- Display subscription price before paywall
- Add in-app cancellation
- Disclose auto-renewal clearly
- Ensure "Manage subscription" link works

## Related Checks

- [ads_policy.md](../metadata/ads_policy.md) - Subscription + ads
- [data_safety.md](../privacy/data_safety.md) - Payment data
- [subscription_iap.md](../../guidelines/by-app-type/subscription_iap.md) - Full
  guidelines
