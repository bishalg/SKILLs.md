---
name: README
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# Play Store Guidelines Index

## App Type Guidelines

| Guideline                                              | Description                                             | When to Use                                    |
| ------------------------------------------------------ | ------------------------------------------------------- | ---------------------------------------------- |
| [all_apps.md](by-app-type/all_apps.md)                 | Base requirements for all Android apps                  | Always                                         |
| [subscription_iap.md](by-app-type/subscription_iap.md) | Guidelines for apps with subscriptions/in-app purchases | Apps with paid features, subscriptions, or IAP |
| [games.md](by-app-type/games.md)                       | Specific guidelines for gaming apps                     | Games distributed on Play Store                |
| [kids.md](by-app-type/kids.md)                         | Requirements for kids/family apps                       | Apps targeting children under 13               |
| [health_fitness.md](by-app-type/health_fitness.md)     | Health and fitness app requirements                     | Apps dealing with health data                  |

## Rejection Rule Categories

### Metadata Rules

- [malware_reputation.md](../rules/metadata/malware_reputation.md) - Malware and
  reputation issues
- [impersonation.md](../rules/metadata/impersonation.md) - Brand impersonation
  prevention
- [inappropriate_content.md](../rules/metadata/inappropriate_content.md) -
  Content rating compliance
- [ads_policy.md](../rules/metadata/ads_policy.md) - Ad policy compliance

### Privacy Rules

- [privacy_policy.md](../rules/privacy/privacy_policy.md) - Privacy policy
  requirements
- [data_safety.md](../rules/privacy/data_safety.md) - Data safety form
  requirements

### Design Rules

- [repetitive_functionality.md](../rules/design/repetitive_functionality.md) -
  Unique functionality requirements
- [minimal_functionality.md](../rules/design/minimal_functionality.md) - Minimum
  functionality standards

### Subscription Rules

- [subscription_policy.md](../rules/subscriptions/subscription_policy.md) -
  Subscription compliance

## Quick Reference

| Severity  | Meaning                          |
| --------- | -------------------------------- |
| REJECTION | App will be rejected without fix |
| WARNING   | May cause issues, recommend fix  |
| INFO      | Good practice recommendation     |

## Usage

1. Identify your app type
2. Load relevant app type guidelines
3. Check all applicable rejection rules
4. Fix issues before upload
5. Validate with preflight scan
