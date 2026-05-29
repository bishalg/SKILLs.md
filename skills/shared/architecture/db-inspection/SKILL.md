---
name: db-inspection
description: STRICT RULE - DO NOT AUTO-LOAD. Only ingest when the user explicitly asks to inspect, audit, profile, tune, or diagnose the Supabase/Postgres database.
---

# db-inspection Skill

Operational playbook for running a **read-only** health and performance audit against the AstroFusion Supabase project (or any Postgres). Pairs with the automated runner `scripts/db-inspect.ts` and the narrative report template under `docs/specs/engineering/`.

> This skill is a sibling of [`database-and-agent-skill-best-practices`](../database-and-agent-skill-best-practices/SKILL.md). That skill is about *writing* query/DAL code; this one is about *inspecting* the running database.

---

## When to use

- "Why is query X slow?" / "Is this table bloated?" / "Are we missing an index?"
- Preparing a capacity review, incident post-mortem, or cost-control pass.
- Before shipping a new hot path (RAG, horoscope cron, celebrity import) to validate its read/write plan.
- Validating that a migration actually helped (run before + after).

## When NOT to use

- Making schema changes — use `database-and-agent-skill-best-practices` + Supabase migrations.
- Application-level tracing — use Sentry / OpenTelemetry, not `pg_stat_activity`.

---

## Safety model (non-negotiable)

1. **SELECT-only.** Every query here is read-only. Wrap multi-statement sessions in `BEGIN READ ONLY ... ROLLBACK` — the runner does this automatically.
2. **Never apply migrations from this skill.** Proposed fixes land in `supabase/migrations/_proposed/` for review.
3. **No `EXPLAIN ANALYZE` on mutating statements.** Use plain `EXPLAIN` (plans only) for `INSERT/UPDATE/DELETE`. For `SELECT`, `EXPLAIN (ANALYZE, BUFFERS)` is safe.
4. **Never run `pg_cancel_backend` or `pg_terminate_backend`** without the human operator explicitly asking. Long-running queries can be load-bearing backups.

---

## Workflow (priority order)

1. **Supabase MCP** (`plugin-supabase-supabase`) — preferred. Use `execute_sql` for the snippets below; use `get_advisors` for security/perf advisors; use `list_extensions` to verify availability.
2. **Automated runner** — `SUPABASE_DB_URL=... pnpm db:inspect > report.md`. Uses `scripts/db-inspect.ts`.
3. **Supabase CLI** — `supabase inspect db <subcommand>`. Good offline fallback if you have the project linked (`supabase link`).
4. **`psql` / `postgres` ad-hoc** — only when you need to run something not covered above.

If none of the above are available, stop and surface the access gap. Do not "retry harder".

---

## Preconditions checklist

Run these first; every other section assumes they are green.

```sql
-- Role visibility (need pg_read_all_stats or superuser for full coverage)
SELECT current_user, current_database(), version();

-- Extensions required / nice-to-have
SELECT extname, extversion
FROM pg_extension
WHERE extname IN ('pg_stat_statements', 'vector', 'pg_cron', 'pgaudit', 'pg_trgm', 'uuid-ossp');
```

Gaps to escalate, not paper over:

| Missing | Impact | Action |
| --- | --- | --- |
| `pg_stat_statements` | No query-level telemetry | Enable in Supabase dashboard > Database > Extensions |
| `pg_read_all_stats` grant | Partial visibility into stats views | Ask DB owner to `GRANT pg_read_all_stats TO <role>` |
| `vector` (pgvector) | RAG checks skipped | Enable extension (required for `learning.course_chunks`, `bphs_embeddings`, `memory_facts`) |

---

## Canonical diagnostic queries

### 1. Cache hit ratios (target > 0.99)

```sql
SELECT
  round((sum(heap_blks_hit)::numeric
         / nullif(sum(heap_blks_hit) + sum(heap_blks_read), 0))::numeric, 4) AS table_hit_ratio,
  round((sum(idx_blks_hit)::numeric
         / nullif(sum(idx_blks_hit) + sum(idx_blks_read), 0))::numeric, 4)  AS index_hit_ratio
FROM pg_statio_user_tables;
```

**Thresholds:** `< 0.99` in steady-state = working set doesn't fit in `shared_buffers`. On Supabase, scale the compute tier before tuning.

### 2. Sequential-scan hotspots (missing-index candidates)

```sql
SELECT schemaname, relname,
       seq_scan, idx_scan, n_live_tup,
       round(seq_scan::numeric / nullif(seq_scan + idx_scan, 0), 3) AS seq_ratio,
       pg_size_pretty(pg_relation_size(relid)) AS heap_size
FROM pg_stat_user_tables
WHERE schemaname IN ('public','learning','horoscope','celebrity','astrology','ai_engineering','chat','api_audit')
  AND n_live_tup > 1000
ORDER BY seq_scan DESC
LIMIT 20;
```

**Thresholds:** `seq_ratio > 0.5` with `n_live_tup > 10_000` → add an index (usually B-tree on the column in `WHERE`/`JOIN`).

### 3. Unused indexes (drop candidates — speed up writes)

```sql
SELECT s.schemaname, s.relname, s.indexrelname AS index,
       s.idx_scan,
       pg_size_pretty(pg_relation_size(s.indexrelid)) AS index_size
FROM pg_stat_user_indexes s
JOIN pg_index i ON i.indexrelid = s.indexrelid
WHERE NOT i.indisunique
  AND NOT i.indisprimary
  AND s.idx_scan = 0
  AND pg_relation_size(s.indexrelid) > 1024 * 1024   -- > 1 MB
ORDER BY pg_relation_size(s.indexrelid) DESC;
```

**Thresholds:** `idx_scan = 0` after > 1 week uptime, > 1 MB, non-unique, non-primary → drop with `DROP INDEX CONCURRENTLY`. Confirm it's not needed by a cron/monthly job before dropping.

### 4. Dead tuples & autovacuum

```sql
SELECT schemaname, relname,
       n_live_tup, n_dead_tup,
       round(n_dead_tup::numeric / nullif(n_live_tup + n_dead_tup, 0), 3) AS dead_ratio,
       last_autovacuum, last_autoanalyze
FROM pg_stat_user_tables
WHERE schemaname IN ('public','learning','horoscope','celebrity','astrology','ai_engineering','chat','api_audit')
  AND (n_dead_tup > 1000 OR last_autovacuum IS NULL)
ORDER BY n_dead_tup DESC;
```

**Thresholds:** `dead_ratio > 0.2` on hot tables → per-table `autovacuum_vacuum_scale_factor = 0.05` or schedule a `VACUUM (ANALYZE)` off-peak. Use Supabase's maintenance window — never during API-peak.

### 5. Long-running queries & blocking chains

```sql
-- Long runners (> 1 minute)
SELECT pid, usename, application_name, state,
       wait_event_type, wait_event,
       now() - query_start AS runtime,
       left(query, 300) AS query
FROM pg_stat_activity
WHERE state <> 'idle'
  AND now() - query_start > interval '1 minute'
ORDER BY query_start ASC;

-- Who is blocking whom?
SELECT blocked.pid       AS blocked_pid,
       blocking.pid      AS blocking_pid,
       blocked.wait_event,
       left(blocked.query, 200)  AS blocked_query,
       left(blocking.query, 200) AS blocking_query
FROM pg_stat_activity blocked
JOIN pg_stat_activity blocking
  ON blocking.pid = ANY(pg_blocking_pids(blocked.pid))
WHERE blocked.pid <> blocking.pid;
```

**Action:** Investigate the `blocking_query` first. Common culprits in AstroFusion are long-running `api_usage_logs` inserts during spikes or migrations that forgot `CONCURRENTLY`.

### 6. Role / connection saturation (matters on PgBouncer)

```sql
SELECT usename AS role,
       count(*) FILTER (WHERE state = 'active')            AS active,
       count(*) FILTER (WHERE state = 'idle')              AS idle,
       count(*) FILTER (WHERE state = 'idle in transaction') AS idle_in_tx,
       count(*)                                             AS total
FROM pg_stat_activity
GROUP BY usename
ORDER BY total DESC;
```

**Red flag:** `idle_in_tx > 0` on any role means a client is holding a transaction open — check the relevant Server Action / Edge Function for missing `await` or `try/finally`.

### 7. Top queries (pg_stat_statements)

```sql
-- Slowest mean
SELECT round(mean_exec_time::numeric, 2)  AS mean_ms,
       round(total_exec_time::numeric, 2) AS total_ms,
       calls, rows,
       round((100.0 * shared_blks_hit
              / nullif(shared_blks_hit + shared_blks_read, 0))::numeric, 2) AS hit_pct,
       left(regexp_replace(query, '\s+', ' ', 'g'), 300) AS query
FROM pg_stat_statements
WHERE calls > 10
ORDER BY mean_exec_time DESC
LIMIT 20;

-- Biggest total time (where tuning has the biggest ROI)
SELECT round(total_exec_time::numeric, 2) AS total_ms,
       round(mean_exec_time::numeric, 2)  AS mean_ms,
       calls,
       left(regexp_replace(query, '\s+', ' ', 'g'), 300) AS query
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;

-- AstroFusion-scoped
SELECT round(mean_exec_time::numeric, 2) AS mean_ms,
       calls,
       left(regexp_replace(query, '\s+', ' ', 'g'), 400) AS query
FROM pg_stat_statements
WHERE query ILIKE ANY (ARRAY[
  '%ephemeris%', '%horoscope%', '%celebrities%', '%birth_chart%',
  '%planetary%', '%course_chunks%', '%bphs_embeddings%',
  '%memory_facts%', '%api_usage_logs%'
])
ORDER BY mean_exec_time DESC
LIMIT 20;
```

### 8. pgvector coverage

```sql
-- Every vector column
SELECT n.nspname AS schema, c.relname AS table, a.attname AS column,
       format_type(a.atttypid, a.atttypmod) AS vector_type
FROM pg_attribute a
JOIN pg_class c     ON c.oid = a.attrelid
JOIN pg_namespace n ON n.oid = c.relnamespace
JOIN pg_type t      ON t.oid = a.atttypid
WHERE t.typname = 'vector' AND a.attnum > 0 AND NOT a.attisdropped
ORDER BY 1, 2;

-- ANN indexes (HNSW / IVFFlat)
SELECT n.nspname AS schema, c.relname AS table, i.relname AS index,
       am.amname AS method, pg_get_indexdef(ix.indexrelid) AS definition
FROM pg_index ix
JOIN pg_class c     ON c.oid = ix.indrelid
JOIN pg_class i     ON i.oid = ix.indexrelid
JOIN pg_namespace n ON n.oid = c.relnamespace
JOIN pg_am am       ON am.oid = i.relam
WHERE am.amname IN ('hnsw', 'ivfflat')
ORDER BY 1, 2;
```

Any table in the first query but missing from the second is doing **O(n)** similarity scans. See [11-pgvector-rag-best-practices.md](../../../docs/specs/engineering/11-pgvector-rag-best-practices.md).

### 9. Bloat (approximate)

Full bloat estimation SQL is long; the simplest live check is the `dead_ratio` query above. For a formal audit, use:

- `supabase inspect db bloat` (CLI), or
- [ioguix/pgsql-bloat-estimation](https://github.com/ioguix/pgsql-bloat-estimation) (read-only view). Copy into `supabase/migrations/_proposed/` if you want the view persisted.

---

## `EXPLAIN` protocol for hot queries

```sql
-- Safe for SELECT only. Rolls back any side-effects.
BEGIN READ ONLY;
EXPLAIN (ANALYZE, BUFFERS, VERBOSE, FORMAT TEXT)
SELECT ...;
ROLLBACK;
```

For a mutating statement, use plain `EXPLAIN` (no `ANALYZE`):

```sql
EXPLAIN (VERBOSE, FORMAT TEXT) INSERT INTO ... SELECT ...;
```

What to look for:

- `Seq Scan` on tables > 10k rows → missing index.
- `Rows Removed by Filter` ≫ `actual rows` → filter should be an index condition or partial index.
- `Buffers: shared read=...` large while `hit=0` → cold cache; re-run to see steady state.
- `Rows=1` estimated but actual `Rows=100000` → stale statistics; run `ANALYZE <table>`.

---

## Supabase CLI fallback cheatsheet

```bash
supabase inspect db cache-hit           # table + index hit ratios
supabase inspect db seq-scans           # sequential-scan leaders
supabase inspect db unused-indexes      # drop candidates
supabase inspect db bloat               # approximate bloat
supabase inspect db blocking            # live lock chains
supabase inspect db long-running-queries
supabase inspect db outliers            # pg_stat_statements top mean/total
supabase inspect db role-connections    # per-role saturation
```

Version pins: `supabase inspect db` is stable on CLI `>= 1.145`. If commands are missing, `supabase --version` and upgrade.

---

## Automated runner

```bash
# Runs every canonical query above and emits a markdown report
SUPABASE_DB_URL='postgres://...' pnpm db:inspect > report.md

# Scope schemas or change TOP_N
pnpm db:inspect --schema learning,horoscope --top 30
```

Source: [`scripts/db-inspect.ts`](../../../scripts/db-inspect.ts). SELECT-only, `BEGIN READ ONLY ... ROLLBACK`, safe for production.

---

## Findings report template

After running the diagnostics, write the report to `docs/specs/engineering/db-inspection-YYYY-MM-DD.md` (one file per audit). Structure:

1. **Summary** — Cache hit ratios, dead-tuple hotspots, blocker chains at time of audit.
2. **Findings** — P0/P1/P2 list. Each item: metric + table + proposed fix + links to migration draft.
3. **Proposed migrations** — Drafts only, in `supabase/migrations/_proposed/`. Never apply from this skill.
4. **Action owners** — Who owns the fix (DB owner / app team / infra).

---

## AstroFusion-specific watch list

The following hot paths are most likely to show up in the top-queries report. Pre-seed the investigation with these:

| Hot path | Files to trace | Common issue |
| --- | --- | --- |
| Horoscope daily cron | [`apps/web/astro-fusion/src/app/api/cron/revalidate-daily/route.ts`](../../../apps/web/astro-fusion/src/app/api/cron/revalidate-daily/route.ts), [`packages/features/src/horoscope/rashifal/cache.ts`](../../../packages/features/src/horoscope/rashifal/cache.ts) | Full-table scan for active predicates (missing `WHERE is_active` partial index) |
| RAG retrieval (BPHS + adaptive learning) | [`packages/ai-core/src/rag/hybrid-retrieval.ts`](../../../packages/ai-core/src/rag/hybrid-retrieval.ts), [`packages/chat-core/src/services/BphsRagService.ts`](../../../packages/chat-core/src/services/BphsRagService.ts) | Wrong `ORDER BY` disables ANN index (see pgvector doc) |
| Celebrity search | [`packages/db/src/schema/celebrity.ts`](../../../packages/db/src/schema/celebrity.ts) | Text search without `pg_trgm` GIN index |
| `api_audit.api_usage_logs` | [`supabase/migrations/20260402200842_create_api_usage_logs.sql`](../../../supabase/migrations/20260402200842_create_api_usage_logs.sql) | Write-heavy, no retention / no composite index on `(key_id, created_at DESC)` |
| Kundali compare | `src/app/[locale]/kundali/compare/...` | N+1 on `profiles` joins; confirm prepared statements |
