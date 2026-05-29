# 🗺️ System Architecture

This document visualizes the hierarchical, state-aware, and self-healing nature of the AI Skills Workspace.

---

## 1. The 5-Phase Workflow
The Supervisor manages the linear progression from product strategy to validated implementation.

```mermaid
graph TD
    User([User Request]) --> Router{Supervisor / Router}
    Router --> ORIENT[1. UX Strategist]
    ORIENT --> DESIGN[2. Design Director]
    DESIGN -->|HITL Pause| Approval{User Approval}
    Approval -->|Yes| BUILD[3. Engineering Lead]
    Approval -->|No| DESIGN
    BUILD --> REFINE[4. UI Refactor]
    REFINE --> VALIDATE[5. QA Validator]
    VALIDATE -->|PASS| RETRO[Retrospective Agent]
    RETRO --> Ship([SHIPPED])
```

---

## 2. The Self-Healing Reflection Loop
If a validation gate or MCP tool fails, the system automatically attempts a surgical fix.

```mermaid
graph LR
    QA[QA Validator] -->|Audit Fail| Ticket[fix-ticket.json]
    Ticket --> Router{Router}
    Router -->|Retry 1-3| Agent[Originating Agent]
    Agent -->|Surgical Fix| QA
    Router -->|Retry > 3| HITL[Human Breakpoint]
```

---

## 3. Observability Waterfall
Every turn is traced via OpenTelemetry (OTel) using GenAI semantic conventions.

```mermaid
sequenceDiagram
    participant U as User
    participant R as Router
    participant A as Agent
    participant MCP as MCP Server
    participant O as OTel/Jaeger

    U->>R: Request
    R->>O: Start Trace (Session ID)
    R->>A: Delegate
    A->>O: Start Span (Agent ID)
    A->>MCP: Call Tool
    MCP->>O: Tool Span
    MCP-->>A: Result
    A-->>R: Artifact
    R->>O: End Session Trace
```
