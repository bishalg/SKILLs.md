# 📊 Agentic Grading Rubric

This rubric defines how to score sub-agent performance and artifact quality.

## 1. Structural Adherence (0-3 Points)
- **3 pts:** Artifact matches `/contracts/handoff-schema.md` perfectly (exact headings, JSON structure).
- **1 pt:** Artifact is missing one or two optional fields but is readable.
- **0 pts:** Critical headings or JSON data are missing.

## 2. Knowledge Strictness (0-4 Points)
- **4 pts:** Agent correctly applied `/skills/` knowledge (e.g., used OKLCH, followed 8pt grid, used `useOptimistic`).
- **2 pts:** Agent followed general best practices but missed specific repo-mandated laws.
- **0 pts:** Agent used "AI Slop" patterns (e.g., side-stripe borders, HEX colors).

## 3. Context Efficiency (0-3 Points)
- **3 pts:** High signal-to-noise ratio. Only task-relevant info is passed.
- **1 pt:** Verbose but accurate.
- **0 pts:** Hallucinated context or unnecessary repetition of the entire chat history.

---

### Pass/Fail Threshold
- **PASS:** Total Score ≥ 8/10
- **FAIL:** Total Score < 8/10 (Requires remediation)
