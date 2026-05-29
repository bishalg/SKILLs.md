---
name: data_safety
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# Data Safety Form

**Guideline Reference**: Google Play Policy - Data Safety  
**Severity**: REJECTION  
**Category**: Privacy

## What to Check

The Data Safety form in Play Console must accurately represent your app's data
practices.

## When Required

Data Safety form is REQUIRED for ALL apps since July 2022 - no exceptions.

## How to Complete

### Step 1: Data Collection

Answer honestly for each data type:

- [ ] Location (precise/approximate)
- [ ] Personal info (name, email, phone)
- [ ] Financial info (payment info)
- [ ] Health and fitness
- [ ] Messages (emails, SMS)
- [ ] Photos and videos
- [ ] Audio files
- [ ] Files and docs
- [ ] Calendar
- [ ] Contacts
- [ ] App activity (page views, taps)
- [ ] App interactions
- [ ] Installed apps
- [ ] Device IDs

### Step 2: Data Sharing

- [ ] Third-party SDKs (list all)
- [ ] Analytics tools
- [ ] Advertising partners
- [ ] Payment processors

### Step 3: Security Practices

- [ ] Data encryption in transit (HTTPS)
- [ ] Data encryption at rest
- [ ] Security certification disclosure

## Common Issues

### 1. Incomplete Form

- Not marking collected data types
- Missing third-party SDKs
- Not disclosing ad SDK data collection

### 2. Mismatched Disclosure

- Form says no location, but SDK collects it
- Form says no analytics, but Firebase is used

### 3. Sensitive Data Errors

- Not marking health data as sensitive
- Not marking financial data correctly

## Required Disclosures by SDK

### Firebase/Google Analytics

- App activity
- Device IDs
- Diagnostics (if crash reporting)

### AdMob

- Device IDs
- Location (approximate)
- App activity

### Expo/React Native SDKs

- Check each SDK's privacy policy
- Common: device ID, analytics

## Resolution

### How to Fix

1. **Audit Your App**

```bash
# List all npm packages that might collect data
npm list --depth=0 | grep -E "analytics|ads|track"
```

2. **Review Each SDK**

- Check SDK documentation
- Note what data it collects
- Note how it shares data

3. **Complete Form Accurately**

- Be honest about all data collected
- Include all third-party SDKs
- Mark sensitive data appropriately

### Security Section

```json
{
  "encryption_in_transit": true,
  "encryption_at_rest": true,
  "security_certification": "SOC2" // if applicable
}
```

## Example Rejection

**Issue**: The Data Safety section is incomplete.

**Details**: Your app's Data Safety form does not accurately reflect the app's
data collection and sharing practices. Found: SDK that collects [data type] not
listed.

**Fix**:

- Review all installed SDKs
- Mark all collected data types
- Include all third-party services
- Be honest about data practices

## Data Safety Checklist

- [ ] Completed "Data Safety" form in Play Console
- [ ] All data types marked
- [ ] Third-party SDKs listed
- [ ] Purpose for each data type
- [ ] User can delete data (or explain how)
- [ ] Encryption in transit (HTTPS)
- [ ] Children data handled (if applicable)

## Related Checks

- [privacy_policy.md](privacy_policy.md) - Full privacy policy
- [kids.md](../../guidelines/by-app-type/kids.md) - Kids data restrictions
