# MySQL SQL Review Rules

## Priority

1. Explicit user requirements and the target repository's documented conventions.
2. The verified query and data-access facts supplied for this task.
3. These generic rules.

State conflicts and apply the higher-priority source.

## DDL baseline

### P0 — must fix

- Invalid, ambiguous, or inconsistent identifier naming; reserved keywords; or a name that the target convention prohibits.
- Missing explicit storage engine or character set when the target convention requires them; missing table/column documentation where required.
- No primary key, or a primary key that cannot provide stable row identity.
- Foreign keys, `enum`, `set`, or `BLOB` when the target environment prohibits them.
- A demonstrably duplicate/redundant index or an index whose key length exceeds the deployment limit.
- Required audit or lifecycle fields missing according to the supplied project convention.

### P1 — strongly recommend fixing

- Nullable columns or defaults without a clear business meaning.
- `FLOAT`/`DOUBLE` for exact money; unsuitable types for status or category fields.
- Overly large variable-length columns, `TEXT` without a justified access pattern, or unseparated cold large fields.
- More indexes, index columns, or write amplification than the workload justifies.
- A business uniqueness rule that is not expressed as a unique constraint.

## Index decisions

- List actual equality filters, range filters, sorting, pagination, and joins before recommending indexes.
- Respect the leftmost-prefix rule. Usually place equality filters before range or sort columns; choose order from query shape and selectivity, not a mechanical rule.
- Do not duplicate an index already covered by the leftmost prefix of another index unless sorting, coverage, or write-cost evidence requires it.
- A range condition usually prevents useful filtering/sorting by later columns; verify with the actual query plan.
- Assess prefix-index selectivity and its inability to enforce full uniqueness or provide all coverage.

## DML and transactions

### P0 — must fix

- `SELECT *` or `INSERT` without an explicit column list.
- `UPDATE`/`DELETE` without a bounded `WHERE` and a credible index path.
- Functions/expressions on indexed predicate columns or implicit type conversion that defeats indexes.
- Production-only query hints, cross-database joins, business join updates, or `UPDATE`/`DELETE ... LIMIT` where replication safety is required.
- `INSERT ... ON DUPLICATE KEY UPDATE` in a confirmed high-concurrency path without a deliberate contention design.

### P1 — strongly recommend fixing

- Unbounded `%keyword%` searches, avoidable large `OR` groups, or deep offset pagination without a seek strategy.
- More than three joined tables, missing driven-table join indexes, excessive `IN` lists, or write batches that are too large for the workload.
- Long transactions, more than a few SQL statements in one transaction, or RPC/file/network work inside a transaction.
- Large range updates not chunked by a stable indexed key.

## Validation

- Use `EXPLAIN` on representative data for each important read/write query.
- Verify index sizes, index count, and the lock/rollback plan before production rollout.
- State affected-row bounds and transaction boundaries for write operations.
