# 🤝 Handoff Artifact Protocol (HAP)

To prevent context bleeding and ensure that sub-agents receive only the necessary information, all inter-agent communication must follow this schema.

## 📦 General Artifact Wrapper (Markdown)

Every handoff must be wrapped in a triple-backtick markdown block with a `handoff` identifier.

```markdown
### 🏷️ [AGENT_NAME] → [TARGET_AGENT_NAME]
- **Timestamp:** [ISO-8601]
- **Current Phase:** [ORIENT|DESIGN|BUILD|REFINE|VALIDATE]
- **Task Summary:** [Brief description of what was accomplished]

#### 🧩 Contextual Data (JSON)
{
  "project_id": "...",
  "modified_files": ["..."],
  "technical_constraints": ["..."],
  "external_dependencies": ["..."]
}

#### 📝 Directives for Next Agent
1. [Actionable step 1]
2. [Actionable step 2]

#### 🛑 Blockers & Risks
- [Risk 1]
```

## 🎨 Design → Engineering Handoff
Specific schema for when the **Design Director** passes a UI scaffold to the **Engineering Lead**.

```markdown
### 🎨 Design Handoff
- **Theme:** Liquid Glass (Primary: OKLCH 55% 0.12 250)
- **Component Props:**
  - `variant`: 'glass' | 'solid'
  - `blurIntensity`: number (default: 12)
- **Engineering Task:** Implement the `useGlassAnimation` hook and fetch real data for the `PriceFeed` component.
```

## 🏗️ Engineering → Refactor Handoff
Specific schema for when the **Engineering Lead** passes a functional component to the **UI Refactor**.

```markdown
### 🏗️ Engineering Handoff
- **Functional State:** Component is fully wired to the backend API.
- **Refactor Focus:** Fix the flat visual hierarchy in the data table and improve mobile padding on the button group.
```

## 🛠️ Refactor → QA Handoff
Specific schema for when the **UI Refactor** passes the polished code to the **QA Validator**.

```markdown
### 🛠️ Refactor Handoff
- **Changes:** Applied modular typography scale and removed side-stripe borders.
- **QA Focus:** Verify contrast ratios on the glass cards and run accessibility audit.
```
