---
name: review-mysql-ddl
description: Review or draft MySQL DDL and DML. Use for CREATE TABLE, index design, SQL review, MySQL schema design, or DML risk review; report P0/P1/P2 findings, query-to-index evidence, and minimal remediation.
---

# MySQL SQL Review

## Overview

Review MySQL DDL/DML against the user's explicit requirements and the generic rules in this skill. Do not invent business fields, query patterns, defaults, or indexes.

## Workflow

1. Classify the request: schema design, existing-SQL review, index design, or DML review.
2. Treat explicit user requirements and repository-local conventions as higher priority than these generic rules.
3. Extract facts: table purpose, expected volume, read/write ratio, uniqueness, lifecycle, actual `WHERE`, `ORDER BY`, pagination, and join conditions.
4. Mark materially missing information as **Needs confirmation**; do not fabricate an answer.
5. Review against [mysql-review-rules.md](references/mysql-review-rules.md), with a query-pattern-to-index mapping.
6. State the conclusion first. Give a complete revised SQL statement only when the user requests one.
7. If asked to modify files, follow that project's change-control process.

## Output

Start with one of: **Pass**, **Conditional pass**, or **Reject**. Then list findings by severity:

| Level | Meaning | Action |
| --- | --- | --- |
| P0 | Correctness, integrity, production full-scan, locking, replication, or structural baseline risk | Must fix |
| P1 | Significant performance or maintainability risk at scale | Strongly recommend fixing |
| P2 | Non-blocking convention or clarity issue | Recommend fixing |

For every finding, describe its location, the rule, the actual risk, and the smallest fix. Include an index mapping:

| Query pattern | Filters / sorting | Index conclusion | Rationale | Needs confirmation |
| --- | --- | --- | --- | --- |

## Scope boundaries

- Apply project-specific rules supplied by the user before the generic rules here.
- Do not assert an index design without real filtering, ordering, pagination, or join facts.
- Do not propose unrelated refactors when correcting a proven issue.
- Use [review-output-template.md](references/review-output-template.md) when a structured review is requested.
