# MySQL SQL Review Output Template

## Conclusion

`Pass` / `Conditional pass` / `Reject`

One sentence explaining why.

## Findings

| Level | Location | Issue and rule | Risk | Minimal remediation |
| --- | --- | --- | --- | --- |
| P0/P1/P2 | Table, column, index, or SQL fragment | Specific rule | Verifiable impact | Smallest change |

If there are no findings, explicitly state that no violations were found against the known requirements.

## Query-to-index mapping

| Query pattern | WHERE / ORDER BY / pagination | Index conclusion | Rationale | Needs confirmation |
| --- | --- | --- | --- | --- |

Do not give a definite index design when the relevant query facts are unknown.

## Revised SQL

Only provide this section when the user requests a revised statement.

```sql
-- Minimal changes for proven issues only
```

## Pre-release validation

- [ ] Verify important SQL with `EXPLAIN` on representative data.
- [ ] Verify index size/count and write cost.
- [ ] Confirm locking, rollback, and expected affected-row bounds.
