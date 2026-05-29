---
name: database-and-agent-skill-best-practices
description: STRICT RULE: DO NOT AUTO-LOAD THIS FILE. Only ingest this context into the active token window if the user explicitly @-mentions the skill name or directly requests this specific file path.
---
---
name: database-and-agent-skill-best-practices
description: Expert guidelines for Drizzle ORM, Pagination, and AI Agent Skill implementation in AstroFusion.
---

# database-and-agent-skill-best-practices Skill

This skill provides mandatory guidelines for database architecture and AI agent tool development in the AstroFusion project.

## 1. Database & Drizzle (Performance)
- **Pagination**: Use `cursor`-based pagination only. `OFFSET` is forbidden.
- **Explicit Selection**: Never use `SELECT *`. Explicitly list columns in `.select()`.
- **Drizzle Relational API**: Use `db.query` for complex nested fetches to avoid N+1 issues.
- **Prepared Statements**: Use `.prepare()` for high-frequency queries.
- **Batching**: Use bulk inserts/updates for multiple records.

## 2. Architecture (Modularity)
- **Dependency Injection**: Pass `db` instances to repositories. Do not hardcode connection imports.
- **Data Access Layer (DAL)**: All DB access must be in `src/data/` or `src/dal/`. No direct access in UI components or Server Actions.
- **Caching**: Wrap read-only DAL functions with `cache()` and use `unstable_cache`.

## 3. AI Agent Tool Configuration
- **Type Safety**: Use strict TypeScript interfaces for inputs/outputs.
- **Next Cursor**: Always return `nextCursor` for paginated data.
- **Instructional Messaging**: Include guidance for the agent in the return payload.
- **Resilient Error Handling**: Return a standardized error object instead of throwing fatal exceptions.

### Example Tool Result:
```json
{
  "success": false,
  "errorType": "DatabaseTimeout",
  "actionableAdvice": "Reduce the limit and call the function again with the current cursor."
}
```
