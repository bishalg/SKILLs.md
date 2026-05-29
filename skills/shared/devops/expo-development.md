---
name: expo-development
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: Expo Mobile App Architecture & Development Workflow. References Expensify/Nx best practices.
created: 2026-02-11
last_updated: 2026-02-11
---

# Expo Mobile App Architecture

> [!NOTE]
> This document follows best practices from [Nx Expo Guide](https://nx.dev/blog/step-by-step-guide-to-creating-an-expo-monorepo-with-nx) and [Expo Monorepo Guide](https://docs.expo.dev/guides/monorepos/).

## 1. Core Architecture

### Module Strategy: CommonJS (CJS)
Unlike the rest of the monorepo (ESM), `apps/mobile` MUST remain **CommonJS** (`"type": "commonjs"` or omitted) because the Metro bundler's config (`metro.config.js`) runs in a Node.js context that historically favors CJS.

### Monorepo Integration
The mobile app consumes shared packages (`@astrofusion/ui`, `@astrofusion/core`) directly from source.

**Key File:** `apps/mobile/metro.config.js`
- **`watchFolders`**: Must include `../../packages` and `../../node_modules`.
- **`nodeModulesPaths`**: Must search workspace root.
- **`resolverMainFields`**: `['react-native', 'main', 'module']`. Since our shared packages point `main` to `src/index.ts`, Metro (via Babel) will compile the TypeScript on the fly.

## 2. Managing Native Modules

### ⚠️ The Node.js Constraint
Some workspace packages (like `@af/sweph`) use **Node.js-specific C++ addons** (`node-gyp`). These **CANNOT** run in React Native.

**Rule:**
- **DO NOT** import `@astrofusion/infrastructure` or `@af/sweph` directly into the mobile app.
- **DO** use the API (`apps/api`) to perform heavy astronomical calculations, and fetch results via HTTP.
- **Exception**: Pure JS packages (`@astrofusion/core`, `@astrofusion/ui`) are safe.

### Development Client (CNG)
We use "Continuous Native Generation" (CNG) via Prebuild.
- **Command**: `npx expo prebuild`
- **Native Directories**: `android/` and `ios/` are git-ignored.
- **Plugins**: Use `app.json` config plugins to modify native code.

## 3. Navigation
We use **React Navigation** (Stack/Tab) as seen in `apps/mobile/src/app/App.tsx`.
- *Note:* While Expo Router is the modern default, our current architecture uses standard React Navigation.

## 4. Workflow

### Running the App
```bash
# Start Metro Bundler
pnpm --filter mobile start

# Run on iOS Simulator
pnpm --filter mobile ios

# Run on Android Emulator
pnpm --filter mobile android
```

### Adding Capabilities
1. Install package: `pnpm add <package>` (in `apps/mobile`).
2. If it has native code: Re-run `npx expo prebuild --clean`.

## 5. Troubleshooting Reference

- **"Module not found"**: Check `watchFolders` in `metro.config.js`.
- **"Unable to resolve module"**: Ensure the package is hoisted or installed in root.
- **"SyntaxError" in workspace package**: Ensure `metro.config.js` is transforming `node_modules` or `packages` (Babel config usually handles this if `watchFolders` are set).
