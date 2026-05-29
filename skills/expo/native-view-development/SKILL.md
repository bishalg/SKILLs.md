---
name: native-view-development
description: Build native UI components for iOS and Android using Swift and Kotlin with Expo Modules API.
version: 1.0.0
license: MIT
---

## What are Native UI Components?

Native UI components are React components backed by real native views (e.g., `UIView` on iOS, `View` on Android or `Composable` with Jetpack Compose). They are used when you need:

- **Performance** — Complex animations or high-frequency updates that bridge traffic would bottleneck.
- **Native APIs** — Using platform-specific components like `UIVisualEffectView` or `MapKit`.
- **Existing Libraries** — Wrapping mature native UI libraries (e.g., Google Maps, Lottie).

## When to Use Native UI Components

- Use for **high-performance** specialized views.
- Use when **React Native's primitive components** aren't enough.
- Use when you need **platform-specific features** unavailable in cross-platform abstractions.

## Native UI Patterns

### 1. View Definition (Module)

The view's lifecycle and props are defined in the module's `View` function:

```kotlin
// Android: MyViewModule.kt
override fun definition() = ModuleDefinition {
  Name("MyView")

  View(MyView::class) {
    Prop("name") { view: MyView, prop: String ->
      view.name = prop
    }

    OnViewDidUpdateProps { view ->
      view.updateContent()
    }
  }
}
```

```swift
// iOS: MyViewModule.swift
public class MyViewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("MyView")

    View(MyView.self) {
      Prop("name") { (view: MyView, prop: String) in
        view.name = prop
      }

      OnViewDidUpdateProps { view in
        view.updateContent()
      }
    }
  }
}
```

### 2. Implementation (Native View)

The native view is a standard platform class (`UIView` or `View`):

```kotlin
// Android: MyView.kt
class MyView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  var name: String = ""

  fun updateContent() {
    // Apply prop changes to the native view
  }
}
```

```swift
// iOS: MyView.swift
class MyView: ExpoView {
  var name: String = ""

  func updateContent() {
    // Apply prop changes to the native view
  }
}
```

### 3. Usage in React

The native view is exported using `requireNativeViewManager`:

```tsx
import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

const NativeView = requireNativeViewManager('MyView');

export default function MyView(props: { name: string }) {
  return <NativeView {...props} />;
}
```

## Best Practices

- **Keep props simple**: Prefer serializable data over complex objects.
- **Use asynchronous events**: Instead of complex return values from views, emit events to the React side.
- **Minimize the bridge traffic**: Update props only when necessary.
- **Lifecycle management**: Use `OnViewDestory` to clean up resources like timers or network requests.
