---
name: security-patterns
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
description: Comprehensive Security Architecture & Best Practices for Next.js, React Native, and Supabase
tags: [security, supabase, nextjs, react-native, rls, middleware]
---

# 🔐 Security Architecture & Defense Standards

This skill defines the **mandatory** security protocols for the AstroFusion ecosystem. It combines Defense-in-Depth principles with specific implementation rules for Next.js App Router, React Native, and Supabase.

**Prime Directive**: Security is not a feature; it is the default state. Code generated must be "Secure by Design" and "Fail Closed."

---

## 🏗️ 1. The Database Layer (Supabase Hardening)

Supabase is our backend. Security here is non-negotiable because the client interacts directly with the database.

### 🛡️ Row Level Security (RLS) is Mandatory
**Rule**: **NEVER** create a table without enabling RLS.
**Concept**: The database acts as its own firewall. Even if the API layer is breached, data remains isolated.

**Implementation Pattern**:
```sql
-- 1. Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 2. Create Policy (Least Privilege)
CREATE POLICY "Users can only view their own profile"
ON profiles FOR SELECT
USING (auth.uid() = id); -- specific to Supabase Auth
```

### 🔑 Key Management
- **Anon Key**: Public. Safe for client-side (browser/mobile). Restrict capability via RLS.
- **Service Role Key**: Private. **NEVER** commit this to Git. **NEVER** use this in client-side code. Only use in Next.js Server Actions or API Routes when administrative bypass is strictly necessary.

---

## � 2. Next.js App Router Architecture

### 🛡️ The "Middleware Fortress" (Edge Security)
Use Next.js Middleware (`middleware.ts`) as the first line of defense before a request hits any route handler or page.

**Responsibility**:
1.  **Session Validation**: Refresh and validate Supabase sessions using `@supabase/ssr`.
2.  **Route Protection**: Block unauthorized access to `/dashboard`, `/admin`.
3.  **Security Headers**: Inject CSP, HSTS, X-Content-Type-Options.

**Implementation Pattern (@supabase/ssr)**:
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  // 1. Create Supabase Client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
        },
      },
    }
  )

  // 2. Refresh Session
  const { data: { user } } = await supabase.auth.getUser()

  // 3. Block Protected Routes
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}
```

### 🛡️ Server Actions & Input Hygiene
**Trust Nothing**: Treat all input from Server Actions as hostile.
**Zod Validation**: "Type safety is not Runtime Security." Validate every payload with Zod schemas inside the Server Action **before** mutation.

```typescript
// ✅ CORRECT PATTERN
export async function updateProfile(formData: FormData) {
  const schema = z.object({ username: z.string().min(3) });
  
  // Safe Parse prevents crashes
  const parse = schema.safeParse(Object.fromEntries(formData));

  if (!parse.success) throw new Error("Invalid Input");
  
  // ... proceed to DB operations
}
```

---

## � 3. React Native Specifics (Mobile Hardening)

Mobile environments require different storage and transport security strategies.

### 🔐 Secure Storage
**Anti-Pattern**: **NEVER** store JWTs, Access Tokens, or API Keys in `AsyncStorage` (it is unencrypted plain text).
**Best Practice**: Use `expo-secure-store`.

```typescript
import * as SecureStore from 'expo-secure-store';

// Saving session securely
await SecureStore.setItemAsync('supabase-auth-token', token);
```

### 🔗 Deep Linking & Intent Handling
**Validation**: When the app opens via a Deep Link (e.g., `astrofusion://reset-password?token=xyz`), validate the token parameter **immediately** against Supabase to prevent spoofing.

---

## ⚔️ 4. Defense Capabilities (The Checklist)

### 🤖 Bot & Abuse Protection (The "Sidecar" Pattern)
Centralize logic for rate limiting and bot detection.
- **Context**: Use a centralized utility (e.g., `lib/security.ts`) to check IP reputation and rate limits.
- **Rules**:
    - **Strict**: Login/Signup endpoints (Prevent Credential Stuffing).
    - **Lax**: Marketing pages (Allow SEO Bots).

### 💉 Injection & XSS Prevention
- **React**: Avoid `dangerouslySetInnerHTML`. If necessary, use a sanitizer library like `dompurify`.
- **SQL Injection**: Since we use Supabase (PostgREST) and Drizzle, SQLi is largely mitigated **IF** we avoid raw SQL queries. Always use parameterized queries or the ORM/SDK methods.

### 📄 Headers & CSP
Ensure the application sends robust headers:
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy`: Restrict script sources to `self` and trusted domains (Supabase, Vercel Analytics).

---

## �‍�💻 Implementation Rules for the AI Agent

When generating code for AstroFusion, adhere to these **strict constraints**:

1.  **RLS First**: When creating a SQL migration, the `CREATE POLICY` statements must be included immediately after `CREATE TABLE`.
2.  **Validate Inputs**: Never write a Next.js Server Action or API Route without a Zod schema validation step at the very top.
3.  **No Secrets in Client**: Verify that no environment variables prefixed without `NEXT_PUBLIC_` are being imported into Client Components (`'use client'`).
4.  **Supabase Auth**: Always prioritize `supabase.auth.getUser()` (server-side verification) over `supabase.auth.getSession()` (cache-based) inside Server Components and Middleware to ensure the token is live and not revoked.
5.  **Fail Closed**: If an external service (like a rate limiter) fails, the request should be denied, not allowed.
