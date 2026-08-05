# MySQL SQL Review Marketplace

An installable Codex plugin for reviewing and drafting MySQL DDL, indexes, and DML.

It provides structured P0/P1/P2 findings, query-to-index mapping, and minimal remediation advice. It does not require an MCP server or access to a database.

## Install

```bash
codex plugin marketplace add su6/mysql-sql-review-marketplace --ref main \
  --sparse .agents/plugins \
  --sparse plugins/mysql-sql-review

codex plugin add mysql-sql-review@mysql-sql-review-marketplace
```

Start a new Codex session after installation. Then ask, for example:

```text
Review this MySQL DDL and report P0/P1/P2 issues.
```

## Updating

```bash
codex plugin marketplace upgrade mysql-sql-review-marketplace
```

## License

[MIT](LICENSE)
