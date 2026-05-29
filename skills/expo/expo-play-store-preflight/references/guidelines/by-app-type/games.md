---
name: games
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# Games Guidelines

Specific requirements for gaming apps submitted to Google Play Store.

## Required Checklist

### Game Categorization

- [ ] Select "Game" as app category
- [ ] Select appropriate game genre
- [ ] Mark as game in app metadata

### Content Rating (Critical for Games)

- [ ] Complete game-specific content rating
- [ ] Disclose violence, gore, sexual content
- [ ] Disclose gambling (even if fictional)
- [ ] Disclose user-generated content

### Game Functionality

- [ ] Clear start/play button
- [ ] Saved progress works correctly
- [ ] No infinite loading screens
- [ ] Gameplay matches store description

### Monetization Disclosure

- [ ] "Contains in-app purchases" in store listing
- [ ] "Contains ads" if applicable (or "No ads" if ad-free)
- [ ] Loot box/probability disclosure (if applicable)
- [ ] Display odds for randomized purchases

## Game-Specific Requirements

### Achievements & Leaderboards (Optional but Recommended)

- Google Play Games Services integration
- Cloud save functionality

### Instant Play

- Consider App Links for instant play
- Optimize for low-bandwidth

### Game Performance

- Minimum 30 FPS target
- Consistent frame rate
- Reasonable download size (<150MB initial)

## Monetization Options

### Ads in Games

- [ ] Ad policy compliance
- [ ] Ad placement doesn't interfere with gameplay
- [ ] Rewarded ads for bonus features
- [ ] No accidental clicks on ads

### In-App Purchases

- Virtual currencies properly labeled
- Consumables vs non-consumables clear
- Subscriptions for game benefits

### For Ads Compliance, See

- [ads_policy.md](../rules/metadata/ads_policy.md)

## Store Listing for Games

### Screenshots

- At least 4 screenshots
- Show actual gameplay (not just menus)
- Show different game modes/levels

### Description

- Clear gameplay description
- Controls explanation
- Single-player/multiplayer mention

### Graphics

- Feature graphic optimized for games
- High-quality app icon
- Video trailer (recommended)

## Common Game Rejections

1. **Content Rating Mismatch** - Violence not disclosed
2. **Gambling Disclosure Missing** - Even fictional gambling
3. **Misleading Screenshots** - Screenshots don't match game
4. **Poor Gameplay** - App is just a menu, no real game
5. **Loot Box Issues** - Odds not disclosed

## Kids Games

If targeting children, also review:

- [kids.md](kids.md)
- "Designed for Families" program requirements

## Related Rules

- [ads_policy.md](../rules/metadata/ads_policy.md)
- [inappropriate_content.md](../rules/metadata/inappropriate_content.md)
- [repetitive_functionality.md](../rules/design/repetitive_functionality.md)
