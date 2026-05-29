---
name: minimal_functionality
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
# Minimal Functionality

**Guideline Reference**: Google Play Policy - Minimum Functionality  
**Severity**: REJECTION  
**Category**: Design

## What to Check

Your app must provide a functional, high-quality experience with meaningful
content.

## How to Detect

### Core Functionality

- [ ] App performs promised function
- [ ] App works without constant errors
- [ ] Content is not placeholder
- [ ] App is more than a login screen

### Quality Check

- [ ] App doesn't crash on launch
- [ ] App doesn't freeze indefinitely
- [ ] App loads in reasonable time
- [ ] App has actual content

## What Fails Minimum Functionality

### 1. Broken Apps

- Constant crashes
- Force closes on launch
- Non-functional features

### 2. Placeholder Content

```javascript
// BAD: Just placeholders
const HomeScreen = () => (
  <View>
    <Text>Coming Soon</Text>
    <Text>Check back later</Text>
  </View>
);
```

### 3. Login-First Apps

```javascript
// BAD: No content before login
const App = () => {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginScreen />; // No content shown!
  }

  return <AppContent />;
};
```

### 4. Web View Only

- Just a web page wrapped in app
- No native functionality
- No offline capability

## Quality Requirements

### Must Have

- Functional core feature
- Reasonable load time (< 3 seconds)
- Error-free basic usage
- Substantial content

### Should Have

- Loading states
- Error handling
- Offline mode (if applicable)
- Feedback to user actions

## Resolution

### Fix Steps

1. **Remove Login Walls**

```javascript
// GOOD: Show some content without login
const App = () => {
  const [user, setUser] = useState(null);

  return (
    <View>
      <Header />
      <PublicContent />
      {user && <PrivateContent />}
    </View>
  );
};
```

2. **Add Real Content**

```javascript
// GOOD: Real features
const HomeScreen = () => (
  <ScrollView>
    <FeaturedSection />
    <Categories />
    <PopularItems />
    <Footer />
  </ScrollView>
);
```

3. **Test Thoroughly**

- Test on physical device
- Test with slow network
- Test with airplane mode
- Test edge cases

## Common Rejections

### "App is just a website"

- Add native features
- Show app-specific content
- Implement offline mode

### "App doesn't work"

- Fix all crashes
- Add error handling
- Test thoroughly

### "No useful content"

- Add real content
- Remove placeholder text
- Show meaningful UI

## Example Rejection

**Issue**: Your app does not have minimum functionality.

**Details**: The app is a basic web wrapper with minimal native functionality.
The app does not meet the standard of quality expected of a published app.

**Fix**:

- Add substantial native features
- Show content without login
- Fix any crashes
- Add meaningful functionality

## Minimum Content Standards

### For Content Apps

- At least 5 screens of content
- Functional navigation
- Search/browse capability
- No placeholder text

### For Utility Apps

- All features work
- Settings configurable
- Useful to target users

### For Games

- Playable gameplay
- At least 3 levels/modes
- Save/load progress
- Not just a menu

## Related Checks

- [repetitive_functionality.md](repetitive_functionality.md) - Unique value
- [all_apps.md](../../guidelines/by-app-type/all_apps.md) - Basic requirements
