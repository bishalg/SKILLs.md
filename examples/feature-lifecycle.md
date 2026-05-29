# 🌊 Feature Lifecycle: From Request to Ship

This trace demonstrates the hierarchical interaction between the **Router** and **Sub-Agents** during the implementation of a "User Dashboard Widget."

---

## 1. Request Phase
**User:** "I need a dashboard widget that shows real-time satellite orbital data with a high-end glass aesthetic."

**Router:**
- **Intent:** Feature implementation.
- **Phase:** `ORIENT`.
- **Action:** Spawns `ux-strategist`.

---

## 2. Strategy Phase (ux-strategist)
**Artifact Output:**
```markdown
### 🧠 Strategy Artifact: Satellite Tracker Widget
- **User Goals:** SREs need to track orbital decay and proximity alerts.
- **Conceptual Model:** `Satellite` { id, orbit_path, decay_rate, last_ping }.
- **Proposed Flow:** Dashboard → Widget Grid → Satellite Detail Modal.
- **Design Directives:** Priority on legibility of "Proximity Alerts."
```

---

## 3. Design Phase (design-director)
**Router:** Reviews Strategy Artifact. Moves to `DESIGN`. Spawns `design-director`.

**Artifact Output:**
```markdown
### 🎨 Design Artifact: Satellite Tracker Widget
- **Aesthetic Direction:** Dark-tinted "Deep Glass" with glowing orbit traces.
- **Token Map:** Primary: OKLCH 65% 0.15 260. Glass: 10% opacity white, 16px blur.
- **Implementation Status:** Created `components/dashboard/SatelliteWidget.tsx` (Scaffold).
- **Engineering Requirements:** Needs a `satellites` data array and a `ProximityAlert` notification hook.
```

---

## 4. Build Phase (engineering-lead)
**Router:** Reviews Design Artifact. Moves to `BUILD`. Spawns `engineering-lead`.

**Artifact Output:**
```markdown
### 🏗️ Engineering Artifact: Satellite Tracker Widget
- **Architecture:** Used React Server Components with a Client-side wrapper for real-time ping updates.
- **State Strategy:** `useOptimistic` for instant tracking toggles.
- **Files Modified:** `SatelliteWidget.tsx` (Logic), `lib/api/satellite-feed.ts`.
- **Refinement Needs:** The data table headers lack contrast; mobile padding is tight.
```

---

## 5. Refine Phase (ui-refactor)
**Router:** Reviews Engineering Artifact. Moves to `REFINE`. Spawns `ui-refactor`.

**Artifact Output:**
```markdown
### 🔧 Refactor Artifact: Satellite Tracker Widget
- **Fixes Applied:** Applied 8pt grid consistency. Boosted header weight to 700 for better hierarchy.
- **Visual Changes:** Centered the orbital trace map. Adjusted glass blur to 24px for better depth.
```

---

## 6. Validate Phase (qa-validator)
**Router:** Reviews Refactor Artifact. Moves to `VALIDATE`. Spawns `qa-validator`.

**Artifact Output:**
```markdown
### 🛡️ Validation Artifact: Satellite Tracker Widget
- **Status:** PASS
- **Gate Results:**
  - 🧪 Tests: PASS (12 unit tests)
  - ♿ Accessibility: PASS (Contrast: 7.1:1)
  - 🚀 Performance: LCP: 1.2s
- **Verification Note:** Logic matches strategy; aesthetic matches design director's intent.
```

---

## 7. Completion
**Router:** "The Satellite Tracker Widget is complete and validated. It is ready to ship."
