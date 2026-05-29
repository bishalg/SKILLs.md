---
name: health_fitness
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# Health & Fitness Apps Guidelines

Requirements for apps dealing with health, fitness, medical, or wellness
content.

## Required Checklist

### Health Claims

- [ ] No false or misleading health claims
- [ ] No claims of diagnosing medical conditions
- [ ] No claims to cure diseases
- [ ] Disclaimer that app is not a medical device
- [ ] Consult healthcare professional disclaimer

### Data Collection (Critical)

- [ ] Minimal data collection principle
- [ ] Clear explanation of health data usage
- [ ] User consent for health data
- [ ] No sharing health data with advertisers
- [ ] Secure storage of health data

### Permissions

- [ ] Fitness permissions (ACTIVITY_RECOGNITION) with justification
- [ ] No unnecessary health data access
- [ ] Health data stays on device (if possible)

### Content Safety

- [ ] No eating disorder encouragement
- [ ] No self-harm content
- [ ] No dangerous fitness challenges
- [ ] Safe workout progressions

## Google Play Health Category

### Additional Requirements

- [ ] Complete "Health & Fitness" disclosure
- [ ] Declare if app collects health data
- [ ] Declare if app connects to medical devices

### Health Data Types (If Applicable)

- Body measurements
- Menstrual cycle data
- Workout data
- Heart rate data
- Sleep data

## Privacy & Security (Strict)

### Data Safety Form

- [ ] Health data marked as "Sensitive data"
- [ ] Data encryption disclosed
- [ ] Data deletion policy clear
- [ ] Third-party sharing disclosed

### Security Best Practices

- [ ] Data encrypted at rest
- [ ] Secure authentication options
- [ ] No health data in logs
- [ ] HIPAA compliance consideration (if US)

## Store Listing

### Description

- [ ] Clear about what app does
- [ ] Disclaimer in description
- [ ] Medical professional disclosure
- [ ] Not "miracle cure" language

### Screenshots

- [ ] Show actual app interface
- [ ] No misleading before/after (unless real)
- [ ] Fitness results disclaimers

## Common Health App Rejections

1. **Misleading Health Claims** - "Cure" or "treat" without evidence
2. **Incomplete Data Safety** - Not marking health data
3. **Eating Disorder Content** - Dangerous fitness/diet content
4. **No Medical Disclaimer** - Missing "not medical advice"
5. **Excessive Permissions** - More data than needed

## Examples of Disallowed Content

- Apps claiming to treat conditions without evidence
- Apps promoting dangerous weight loss
- Apps with eating disorder encouragement
- Apps claiming to replace medical devices
- Apps with misleading "clinical" or "doctor" branding

## Best Practices

### Disclaimers

```
"This app is for informational purposes only and is not a substitute for professional medical advice. Always consult a physician before starting any exercise program."
```

### Privacy Policy Must Include

- What health data is collected
- How data is used
- Who data is shared with
- Data retention policy
- How to delete data

## Related Rules

- [privacy_policy.md](../rules/privacy/privacy_policy.md)
- [data_safety.md](../rules/privacy/data_safety.md)
- [inappropriate_content.md](../rules/metadata/inappropriate_content.md)
