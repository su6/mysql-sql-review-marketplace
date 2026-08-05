# MySQL SQL Review installer

Install the public MySQL SQL Review Codex plugin with one command:

```bash
npx @su6/mysql-sql-review@latest install
```

The installer uses an existing `codex` command when available. Otherwise it temporarily runs the official `@openai/codex` CLI through `npx`; no global Codex CLI installation or Git installation is required.

After the command finishes, start a new Codex desktop chat and ask it to review a MySQL statement.

## Requirements

- Node.js 18 or newer
- Internet access to npm and GitHub
- A signed-in Codex desktop app on the same computer

## License

[MIT](LICENSE)
