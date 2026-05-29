---
name: security-concepts
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: High-Level Security Architecture Patterns & Definitions (Conceptual)
tags: [security, architecture, patterns, concepts]
---

# 🛡️ Security Architecture Concepts

This skill defines the **high-level architectural patterns** that guide the AstroFusion security strategy. While `security-patterns` defines *how* to implement rules in Supabase/Next.js, this skill defines *why* and the *abstract structures* we aim to build.

## 🏗️ Core Architectural Primitives

### 1. The "Sidecar" Security Client (Singleton Pattern)
**Concept**: Security logic should be centralized, not scattered across every route handler.
- **Pattern**: Instantiate a single, configured security client (e.g., in `lib/security.ts`).
- **Benefit**: Ensures consistent rules (e.g., "Block all bots") are applied globally while allowing per-route overrides.
- **Implementation Goal**: Even if using multiple providers (Supabase, Arcjet, Custom), wrap them in a unified `SecurityClient` class.

### 2. Context-Aware Analysis
Security decisions should not be binary (Allow/Deny) based solely on URL. They must analyze the **full context**:
- **Headers**: User-Agent, IP, Custom Headers.
- **Body**: Payload content (for email validation or injection attacks).
- **State**: User session, previous behavior (if available).

### 3. Asynchronous Post-Request Analysis
**Performance Critical**: Do not block the user response for heavy analysis (like log aggregation or long-term behavior tracking).
- **Flow**:
  1. **Fast Path**: Immediate checks (IP Blacklist, Basic Rate Limit). -> *Return Response*.
  2. **Slow Path**: (After response) Log request details, update anomaly detection models, aggregate stats.
- **Next.js Implementation**: Use `waitUntil` (Vercel/Cloudflare workers) or fire-and-forget logic for the "Slow Path".

---

## 🛡️ Defense Capabilities & Definitions

### 1. Rate Limiting (Traffic Control)
Prevent abuse by limiting requests over time.
- **Fixed Window**: Good for basic API quotas (e.g., 100 req/hour).
- **Token Bucket**: Better for "bursty" traffic (e.g., allow 10 immediate clicks, then trickle).
- **Context**: Limit by IP (anonymous) OR User ID (authenticated).

### 2. Bot Protection
Distinguish between:
- **Good Bots**: Google, Bing, OpenGraph (Twitter/Facebook previews). -> **ALLOW**
- **Bad Bots**: Scrapers, credential stuffers, automated scripts. -> **BLOCK**
- **Strategy**: Fingerprint TLS handshakes, analyze HTTP headers, check against known botman IP lists.

### 3. Input Validation & WAF (Shield)
- **Email Validation**: Block "Disposable" email providers (e.g., 10minutemail) at the signup/auth level.
- **Payload Inspection**: Check for common attack vectors (SQLi, XSS) in request bodies *before* they reach the database layer.

---

## 💻 Architectural Rules for AI Agents

1.  **Secure by Default**: Every public API route **MUST** include a security check at the very top.
2.  **Fail Closed**: If the security check fails or times out, default to *blocking* the request (unless it's a critical non-mutating read path where availability > consistency).
3.  **Observability**: Log every "Deny" decision with a reason. Use headers (e.g., `X-RateLimit-Remaining`) to inform well-behaved clients.
